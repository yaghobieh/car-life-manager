export const API_BASE = process.env.EXPO_PUBLIC_API_URL ?? 'http://127.0.0.1:4173';
export const AUTH_LOGIN_PATH = '/api/auth/login';
export const AUTH_REGISTER_PATH = '/api/auth/register';
export const PROPERTY_HOMES_PATH = '/api/property/homes';
export const PROPERTY_ADDRESSES_PATH = '/api/property/addresses';
export const PROPERTY_AREA_PRICES_PATH = '/api/property/area-prices';
export const PROPERTY_SAVED_PATH = '/api/property/saved-addresses';
export const PROPERTY_LAWYERS_PATH = '/api/property/lawyers';
export const PROPERTY_EXPENSES_PATH = '/api/property/expenses';
export const VEHICLES_PATH = '/api/vehicles';
export const ROLE_OWNER = 'owner';

export { EMPTY_STRING } from './constants/generals.const';
export { ZERO, ZERO_RELOAD } from './constants/numbers.const';

export const DEAL_OWNED = 'owned';
export const AUTH_MODE_LOGIN = 'login';
export const AUTH_MODE_REGISTER = 'register';

export {
  COLOR_BAD,
  COLOR_BLUE,
  COLOR_INK,
  COLOR_INK_SOFT,
  COLOR_LINE,
  COLOR_NAVY,
  COLOR_PAPER,
  COLOR_SURFACE,
  COLOR_WHITE,
  PALETTE_DARK,
  PALETTE_LIGHT,
} from './theme/colors.const';
export const THEME_LIGHT = 'light';
export const THEME_DARK = 'dark';
export const PRODUCT_CAR = 'car';
export const PRODUCT_HOME = 'home';
export const SECTION_OVERVIEW = 'overview';
export const SECTION_VEHICLES = 'vehicles';
export const SECTION_TASKS = 'tasks';
export const SECTION_SERVICES = 'services';
export const SECTION_EXPENSES = 'expenses';
export const SECTION_DOCUMENTS = 'documents';
export const SECTION_MAINTENANCE = 'maintenance';
export const SECTION_REMINDERS = 'reminders';
export const SECTION_REPORTS = 'reports';
export const SECTION_SETTINGS = 'settings';
export const SECTION_HOMES = 'homes';
export const SECTION_SEARCH = 'search';
export const SECTION_LOOKUP = 'lookup';
export const SECTION_LAWYERS = 'lawyers';
export const SECTION_SAVED = 'saved';
export const KIND_LIST = 'list';
export const KIND_SEARCH = 'search';
export const KIND_PLATE = 'plate';
export const KIND_NOTE = 'note';
export const KIND_SETTINGS = 'settings';

export const COPY_BRAND = 'Tavo';
export const COPY_LOGIN_TITLE = 'התחברות';
export const COPY_REGISTER_TITLE = 'הרשמה לדירה';
export const COPY_LOGIN_BODY = 'האפליקציה מדברת עם שרת Tavo. אין דירות לדוגמה.';
export const COPY_NAME = 'שם';
export const COPY_USERNAME = 'שם משתמש';
export const COPY_EMAIL = 'אימייל';
export const COPY_IDENTIFIER = 'אימייל או שם משתמש';
export const COPY_PASSWORD = 'סיסמה';
export const COPY_SENDING = 'שולח…';
export const COPY_REGISTER = 'הרשמה';
export const COPY_LOGIN = 'התחברות';
export const COPY_HAVE_ACCOUNT = 'יש לי חשבון';
export const COPY_BACK = 'חזרה לדף הבית';
export const COPY_NEW_ACCOUNT = 'חשבון חדש';
export const COPY_NO_TOKEN = 'השרת לא החזיר מפתח התחברות';
export const COPY_AUTH_FAILED = 'ההתחברות נכשלה';
export const COPY_HOMES_TITLE = 'הדירות שלי';
export const COPY_CITY = 'עיר';
export const COPY_NEED_CITY = 'צריך עיר';
export const COPY_SAVE_HOME = 'שמירת דירה';
export const COPY_REFRESH = 'רענון מהשרת';
export const COPY_EMPTY_HOMES = 'אין עדיין דירות שמורות.';
export const COPY_SIGN_OUT = 'יציאה';
export const COPY_LOAD_FAILED = 'טעינת הדירות נכשלה';
export const COPY_SAVE_FAILED = 'שמירת הדירה נכשלה';
export const COPY_THEME_LIGHT = 'בהיר';
export const COPY_THEME_DARK = 'כהה';
export const COPY_CAR = 'ניהול הרכב';
export const COPY_HOME = 'ניהול הדירה';
export const COPY_HERO = 'רכב ודירה. החיים היומיומיים, במקום אחד.';
export const COPY_HERO_BODY = 'HomeLife שומר את מה שאתם מוסיפים, ואת המקורות הרשמיים שכבר מחוברים. אין מודעות לדוגמה.';
export const COPY_WHY = 'מה אנחנו עושים, ולמה';
export const COPY_WHY_BODY = 'אחרי שקונים רכב או גרים בדירה, הניירת והמועדים מתפזרים. אנחנו מרכזים את התיק שלכם.';
export const COPY_CAR_WHY = 'רישוי, טסט, מסמכים, הוצאות ותזכורות — לפי נתוני משרד התחבורה ומה שאתם שומרים.';
export const COPY_HOME_WHY = 'הדירה שלכם: כתובת, תמונות, מבט 360, הוצאות ותזכורות. רק מה שאתם מוסיפים.';
export const COPY_HAVE_HOME = 'יש לי דירה';
export const COPY_INTEREST = 'אני מתעניין בדירה';
export const COPY_SEARCH = 'חיפוש';
export const COPY_SEARCH_PLACEHOLDER = 'עיר, שכונה או כתובת';
export const COPY_HOW = 'איך זה עובד';
export const COPY_HOW_1 = 'הוסף את הרכב';
export const COPY_HOW_2 = 'גלה מה צריך לעשות';
export const COPY_HOW_3 = 'סמן, שמור וקבל תזכורות';
export const COPY_TRUST = 'אנחנו מציגים רק מידע שאפשר באמת לאמת. חניה וכביש 6 נשארים מנותקים עד API אמיתי.';
export const COPY_PLATE = 'מספר רישוי';
export const COPY_ADD_PLATE = 'הוספת רכב';
export const COPY_NEED_PLATE = 'צריך מספר רישוי';
export const COPY_NEED_VEHICLE = 'הוסיפו רכב כדי לפתוח את הסעיף הזה.';
export const COPY_EMPTY = 'אין כאן רשומות שמורות.';
export const COPY_DOCS_NOTE = 'מסמכי דירה יופיעו כאן כשתעלו PDF או תמונה. אין מסמכים לדוגמה.';
export const COPY_SETTINGS_NOTE = 'אימייל ו-SMS נשלחים רק כשמחובר ספק אמיתי.';
export const COPY_LOAD_FAILED_GENERIC = 'הטעינה מהשרת נכשלה';
export const COPY_OVERVIEW = 'סקירה כללית';
export const COPY_VEHICLES = 'הרכבים שלי';
export const COPY_TASKS = 'משימות';
export const COPY_SERVICES = 'מנויים ושירותים';
export const COPY_EXPENSES = 'הוצאות';
export const COPY_DOCUMENTS = 'מסמכים';
export const COPY_MAINTENANCE = 'תחזוקה';
export const COPY_REMINDERS = 'תזכורות';
export const COPY_REPORTS = 'דוחות';
export const COPY_REPORTS_EMPTY = 'דוחות יופיעו כשיהיו הוצאות, מסמכים או תזכורות אמיתיים.';
export const COPY_SETTINGS = 'הגדרות';
export const COPY_HOMES = 'לוח דירות';
export const COPY_LOOKUP = 'מידע על נכס';
export const COPY_LAWYERS = 'עורכי דין';
export const COPY_SAVED = 'שמורים';

export const CAR_SECTIONS = [
  { id: SECTION_OVERVIEW, label: COPY_OVERVIEW, kind: KIND_LIST, listKey: 'tasks', empty: COPY_NEED_VEHICLE },
  { id: SECTION_VEHICLES, label: COPY_VEHICLES, kind: KIND_PLATE, listKey: 'vehicles', empty: COPY_EMPTY },
  { id: SECTION_TASKS, label: COPY_TASKS, kind: KIND_LIST, listKey: 'tasks', empty: COPY_EMPTY },
  { id: SECTION_SERVICES, label: COPY_SERVICES, kind: KIND_LIST, listKey: 'services', empty: COPY_EMPTY },
  { id: SECTION_EXPENSES, label: COPY_EXPENSES, kind: KIND_LIST, listKey: 'expenses', empty: COPY_EMPTY },
  { id: SECTION_DOCUMENTS, label: COPY_DOCUMENTS, kind: KIND_LIST, listKey: 'documents', empty: COPY_EMPTY },
  { id: SECTION_MAINTENANCE, label: COPY_MAINTENANCE, kind: KIND_LIST, listKey: 'maintenance', empty: COPY_EMPTY },
  { id: SECTION_REMINDERS, label: COPY_REMINDERS, kind: KIND_LIST, listKey: 'reminders', empty: COPY_EMPTY },
  { id: SECTION_REPORTS, label: COPY_REPORTS, kind: KIND_LIST, listKey: 'expenses', empty: COPY_REPORTS_EMPTY },
  { id: SECTION_SETTINGS, label: COPY_SETTINGS, kind: KIND_SETTINGS, listKey: '', empty: COPY_SETTINGS_NOTE },
];

export const HOME_SECTIONS = [
  { id: SECTION_OVERVIEW, label: COPY_OVERVIEW, kind: KIND_LIST, listKey: 'homes', empty: COPY_EMPTY_HOMES },
  { id: SECTION_HOMES, label: COPY_HOMES, kind: KIND_LIST, listKey: 'homes', empty: COPY_EMPTY_HOMES },
  { id: SECTION_SEARCH, label: COPY_SEARCH, kind: KIND_SEARCH, listKey: 'addresses', empty: COPY_EMPTY },
  { id: SECTION_LOOKUP, label: COPY_LOOKUP, kind: KIND_SEARCH, listKey: 'prices', empty: COPY_EMPTY },
  { id: SECTION_EXPENSES, label: COPY_EXPENSES, kind: KIND_LIST, listKey: 'expenses', empty: COPY_EMPTY },
  { id: SECTION_LAWYERS, label: COPY_LAWYERS, kind: KIND_LIST, listKey: 'lawyers', empty: COPY_EMPTY },
  { id: SECTION_DOCUMENTS, label: COPY_DOCUMENTS, kind: KIND_NOTE, listKey: '', empty: COPY_DOCS_NOTE },
  { id: SECTION_SAVED, label: COPY_SAVED, kind: KIND_LIST, listKey: 'addresses', empty: COPY_EMPTY },
  { id: SECTION_SETTINGS, label: COPY_SETTINGS, kind: KIND_SETTINGS, listKey: '', empty: COPY_SETTINGS_NOTE },
];
