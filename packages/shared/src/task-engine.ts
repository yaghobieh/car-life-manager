import type { ServiceProviderInfo, Task, TaskPriority, Vehicle, VehicleContext } from "./types";

function daysUntil(iso: string | null): number | null {
  if (!iso) return null;
  const target = Date.parse(iso);
  if (Number.isNaN(target)) return null;
  return Math.ceil((target - Date.now()) / 86_400_000);
}

function id(prefix: string, vehicleId: string, key: string): string {
  return `${prefix}_${vehicleId}_${key}`;
}

function now(): string {
  return new Date().toISOString();
}

function task(
  vehicleId: string,
  key: string,
  input: Omit<Task, "id" | "vehicleId" | "createdAt" | "completedAt">,
): Task {
  return {
    id: id("task", vehicleId, key),
    vehicleId,
    createdAt: now(),
    completedAt: input.status === "completed" ? now() : null,
    ...input,
  };
}

function priorityFromDays(days: number | null): TaskPriority {
  if (days === null) return "important";
  if (days < 0) return "overdue";
  if (days <= 45) return "important";
  return "normal";
}

function serviceOf(services: ServiceProviderInfo[], providerId: string): ServiceProviderInfo | undefined {
  return services.find((item) => item.providerId === providerId);
}

export function generateVehicleTasks(context: VehicleContext): Task[] {
  const { vehicle, services, documents } = context;
  const tasks: Task[] = [];
  const licenseDays = daysUntil(vehicle.registrationExpiry);
  const testDays = daysUntil(vehicle.nextTestDate);

  tasks.push(
    task(vehicle.id, "ownership", {
      title: "העברת בעלות",
      description: "ודא שהעברת הבעלות במשרד הרישוי הושלמה.",
      category: "ownership",
      priority: vehicle.ownershipSequence ? "normal" : "important",
      status: vehicle.ownershipSequence ? "completed" : "waiting_for_user",
      dueDate: null,
      provider: "ministry-of-transport",
      source: "task-engine",
      externalUrl: "https://www.gov.il/he/departments/ministry_of_transport_and_road_safety",
    }),
  );

  if (licenseDays === null || licenseDays <= 60) {
    tasks.push(
      task(vehicle.id, "license", {
        title: "חידוש רישיון רכב",
        description: licenseDays === null
          ? "תוקף הרישיון אינו ידוע ממקור רשמי. בדוק ידנית."
          : `תוקף הרישיון בעוד ${licenseDays} ימים.`,
        category: "licensing",
        priority: priorityFromDays(licenseDays),
        status: licenseDays !== null && licenseDays < 0 ? "needs_attention" : "not_started",
        dueDate: vehicle.registrationExpiry,
        provider: "ministry-of-transport",
        source: "task-engine",
        externalUrl: "https://www.gov.il/he/service/renew_vehicle_license",
      }),
    );
  } else {
    tasks.push(
      task(vehicle.id, "license_ok", {
        title: "אגרת רישוי",
        description: "הרישיון בתוקף לפי נתונים רשמיים.",
        category: "licensing",
        priority: "done",
        status: "completed",
        dueDate: vehicle.registrationExpiry,
        provider: "ministry-of-transport",
        source: "task-engine",
        externalUrl: null,
      }),
    );
  }

  if (testDays === null || testDays <= 90) {
    tasks.push(
      task(vehicle.id, "test", {
        title: "טסט שנתי",
        description: testDays === null
          ? "תאריך הטסט הבא אינו זמין. הוסף אותו ידנית או בדוק במשרד התחבורה."
          : `הטסט הבא בעוד ${testDays} ימים.`,
        category: "test",
        priority: priorityFromDays(testDays),
        status: testDays !== null && testDays < 0 ? "needs_attention" : "not_started",
        dueDate: vehicle.nextTestDate,
        provider: "ministry-of-transport",
        source: "task-engine",
        externalUrl: "https://www.gov.il/he/service/vehicle_test",
      }),
    );
  }

  tasks.push(
    task(vehicle.id, "mandatory_insurance", {
      title: "השלמת ביטוח חובה",
      description: "אין חיבור רשמי לחברות ביטוח. הזן את הפוליסה או פתח את אתר המפקח על הביטוח.",
      category: "insurance",
      priority: "overdue",
      status: "waiting_for_provider",
      dueDate: null,
      provider: "insurance",
      source: "task-engine",
      externalUrl: "https://www.gov.il/he/departments/capital_market_authority",
    }),
  );

  for (const providerId of ["pango", "cello", "highway-6"] as const) {
    const connection = serviceOf(services, providerId);
    if (!connection || connection.status === "connected") continue;
    const labels: Record<typeof providerId, { title: string; description: string; url: string | null }> = {
      pango: {
        title: "הוספת הרכב ל-Pango",
        description: "אין חיבור רשמי לחשבון Pango. אפשר לפתוח את האפליקציה ולהוסיף את הרכב שם.",
        url: "https://www.pango.co.il",
      },
      cello: {
        title: "בדיקת חשבון Cello",
        description: "אין אינטגרציה מאומתת ל-Cello. סטטוס החיבור אינו ידוע.",
        url: "https://www.cello.co.il",
      },
      "highway-6": {
        title: "חיבור כביש 6",
        description: "אין API רשמי זמין לבדיקת חיבור. בדוק באתר כביש 6.",
        url: "https://www.kvish6.co.il",
      },
    };
    tasks.push(
      task(vehicle.id, providerId, {
        title: labels[providerId].title,
        description: labels[providerId].description,
        category: "services",
        priority: "important",
        status: "waiting_for_provider",
        dueDate: null,
        provider: providerId,
        source: "task-engine",
        externalUrl: labels[providerId].url,
      }),
    );
  }

  const hasLicenseDoc = documents.some((doc) => doc.type === "vehicle_license");
  if (!hasLicenseDoc) {
    tasks.push(
      task(vehicle.id, "documents", {
        title: "העלאת רישיון רכב",
        description: "שמור את הרישיון בתיק הדיגיטלי של הרכב.",
        category: "documents",
        priority: "normal",
        status: "not_started",
        dueDate: null,
        provider: null,
        source: "task-engine",
        externalUrl: null,
      }),
    );
  }

  tasks.push(
    task(vehicle.id, "tires", {
      title: "בדיקת מצב צמיגים",
      description: "בדיקת בסיס אחרי רכישה — לא מחושב ממקור רשמי.",
      category: "maintenance",
      priority: "normal",
      status: "not_started",
      dueDate: null,
      provider: null,
      source: "task-engine",
      externalUrl: null,
    }),
  );

  return tasks;
}

export function vehicleStatusFromDates(vehicle: Vehicle): {
  license: { kind: "healthy" | "attention" | "action_required" | "unknown" | "expired"; label: string };
  test: { kind: "healthy" | "attention" | "action_required" | "unknown" | "expired"; label: string };
} {
  const licenseDays = daysUntil(vehicle.registrationExpiry);
  const testDays = daysUntil(vehicle.nextTestDate);

  return {
    license: classify(licenseDays, vehicle.registrationExpiry),
    test: classify(testDays, vehicle.nextTestDate),
  };
}

function classify(
  days: number | null,
  date: string | null,
): { kind: "healthy" | "attention" | "action_required" | "unknown" | "expired"; label: string } {
  if (!date || days === null) return { kind: "unknown", label: "לא ידוע" };
  if (days < 0) return { kind: "expired", label: "פג תוקף" };
  if (days <= 30) return { kind: "action_required", label: "נדרשת פעולה" };
  if (days <= 60) return { kind: "attention", label: "לתשומת לב" };
  return { kind: "healthy", label: "בתוקף" };
}
