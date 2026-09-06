import { prisma } from "./db";

export async function audit(input: {
  userId: string;
  vehicleId?: string;
  action: string;
  metadata?: Record<string, unknown>;
}): Promise<void> {
  await prisma.auditLog.create({
    data: {
      userId: input.userId,
      vehicleId: input.vehicleId,
      action: input.action,
      metadata: JSON.stringify(input.metadata ?? {}),
    },
  });
}
