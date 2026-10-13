export interface AgentQuestionPayload {
  question: string;
  context?: {
    category?: 'car' | 'apt' | 'general';
    city?: string;
    itemTitle?: string;
    price?: number;
  };
}

export interface AgentAnswerResponse {
  answer: string;
  intent: 'car_info' | 'property_info' | 'tabu_verification' | 'search_help' | 'general';
  suggestedAction?: {
    label: string;
    route: string;
  };
  sources: string[];
}

export function answerTavoQuestion(payload: AgentQuestionPayload): AgentAnswerResponse {
  const q = (payload.question || '').toLowerCase().trim();

  // 1. Tabu / Property Registration Questions
  if (/טאבו|נסח|רישום|בעלות|דירה|משכנתא|עו״ד|הסכם/.test(q)) {
    return {
      answer: `בפלטפורמת Tavo (טאבו) כל מודעת נדל״ן עוברת אימות מול מרשם הכתובות הממשלתי (data.gov.il) ורשם המקרקעין. לבדיקת נסח טאבו ישיר עבור הנכס, תוכלו להשתמש בקישורי המפה והניווט או לפנות לעורך הדין המלווה של המערכת.`,
      intent: 'tabu_verification',
      suggestedAction: {
        label: 'מעבר למאגר הדירות המאומתות',
        route: '/apartments',
      },
      sources: ['רשם המקרקעין (טאבו)', 'מאגר הכתובות הממשלתי data.gov.il', 'Tavo NadLife'],
    };
  }

  // 2. Car MOT Licensing / Recalls Questions
  if (/רכב|רישוי|טסט|קילומטראז|טסלה|טויוטה|קיה|יונדאי|ריקול|משרד התחבורה/.test(q)) {
    return {
      answer: `ב-Tavo כל רכב מקושר ישירות למאגר משרד התחבורה ומציג סטטוס רישוי בתוקף, ריקולים פתוחים, היסטוריית בעלויות וסיווג זיהום אוויר. תגית "מאומת" מבטיחה שפרטי השנתון ומספר היד נבדקו רשמית.`,
      intent: 'car_info',
      suggestedAction: {
        label: 'חיפוש רכבים עם בדיקת רישוי',
        route: '/cars',
      },
      sources: ['מאגר כלי רכב משרד התחבורה', 'רשות הבטיחות בדרכים', 'Tavo Car Life'],
    };
  }

  // 3. Search & Location Queries (e.g. Petah Tikva, Tel Aviv)
  if (/פתח תקווה|תל אביב|ירושלים|חיפה|מחיר|כמה עולה|איפה למצוא/.test(q)) {
    return {
      answer: `ניתן להקליד שמות ערים ורחובות בחיפוש ה-AI שלנו בראש העמוד. המערכת תזהה את העיר, תציג רחובות מאומתים ותסנן ישירות את כל הדירות והרכבים הזמינים באזור המבוקש.`,
      intent: 'search_help',
      suggestedAction: {
        label: 'חיפוש חכם ב-Tavo',
        route: '/',
      },
      sources: ['מנוע החיפוש החכם Tavo Smart Search', 'מדד מחירי נדל״ן ורכב'],
    };
  }

  // 4. Default / General Tavo Inquiries
  return {
    answer: `שלום! אני סוכן ה-AI של Tavo (טאבו). הפלטפורמה מאחדת את עולמות הרכב והנדל״ן בישראל, ומאפשרת חיפוש חכם, מבט 360°, אימות נתוני רישוי וטאבו, יצירת קשר מהיר בוואטסאפ ובטלפון ופרסום מודעות פרטיות ומסחריות. במה אוכל לעזור לך היום?`,
    intent: 'general',
    suggestedAction: {
      label: 'גלו את כל מודעות Tavo',
      route: '/',
    },
    sources: ['Tavo Knowledge Base', 'טאבו — רכב ודירה במקום אחד'],
  };
}
