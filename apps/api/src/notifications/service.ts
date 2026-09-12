import { prisma } from "../db";
import { logger } from "../logger";
import { sendEmail } from "./email.adapter";
import {
  CHANNEL_EMAIL,
  CHANNEL_IN_APP,
  CHANNEL_SMS,
  ISO_DATE_LENGTH,
  REMINDER_STATUS_COMPLETED,
  SKIP_MISSING_TARGET,
  SKIP_PREFERENCE_OFF,
  SMS_TEST_BODY,
  STATUS_SENT,
  STATUS_SKIPPED,
} from "./notifications.const";
import type { ChannelResult, NotifyUser, ReminderDispatchInput } from "./notifications.types";
import { reminderBody, reminderScheduledBody, reminderScheduledSourceKey, reminderSourceKey, smsTestSourceKey } from "./notifications.utils";
import { sendSms } from "./sms.adapter";

async function persist(userId: string, vehicleId: string | null, title: string, body: string, sourceKey: string, result: ChannelResult): Promise<void> {
  const sentAt = result.status === STATUS_SENT ? new Date() : null;
  await prisma.notification.upsert({
    where: { userId_sourceKey_channel: { userId, sourceKey, channel: result.channel } },
    create: {
      userId,
      vehicleId,
      channel: result.channel,
      title,
      body,
      status: result.status,
      scheduledAt: new Date(),
      sentAt,
      sourceKey,
      error: result.error ?? null,
    },
    update: {
      status: result.status,
      sentAt,
      error: result.error ?? null,
    },
  });
}

async function alreadyHandled(userId: string, sourceKey: string, channel: string): Promise<boolean> {
  const existing = await prisma.notification.findUnique({
    where: { userId_sourceKey_channel: { userId, sourceKey, channel } },
  });
  return Boolean(existing);
}

async function dispatchReminder(user: NotifyUser, reminder: ReminderDispatchInput): Promise<void> {
  const body = reminderBody(reminder.title, reminder.dueDate);
  const inAppKey = reminderSourceKey(reminder.id, CHANNEL_IN_APP);
  if (!(await alreadyHandled(user.id, inAppKey, CHANNEL_IN_APP))) {
    await persist(user.id, reminder.vehicleId, reminder.title, body, inAppKey, {
      channel: CHANNEL_IN_APP,
      status: STATUS_SENT,
    });
  }

  const emailKey = reminderSourceKey(reminder.id, CHANNEL_EMAIL);
  if (!(await alreadyHandled(user.id, emailKey, CHANNEL_EMAIL))) {
    const emailResult = !user.notifyEmail
      ? { channel: CHANNEL_EMAIL, status: STATUS_SKIPPED, error: SKIP_PREFERENCE_OFF } as const
      : !user.email
        ? { channel: CHANNEL_EMAIL, status: STATUS_SKIPPED, error: SKIP_MISSING_TARGET } as const
        : await sendEmail(user.email, reminder.title, body);
    await persist(user.id, reminder.vehicleId, reminder.title, body, emailKey, emailResult);
  }

  const smsKey = reminderSourceKey(reminder.id, CHANNEL_SMS);
  if (!(await alreadyHandled(user.id, smsKey, CHANNEL_SMS))) {
    const smsResult = !user.notifySms
      ? { channel: CHANNEL_SMS, status: STATUS_SKIPPED, error: SKIP_PREFERENCE_OFF } as const
      : !user.phone
        ? { channel: CHANNEL_SMS, status: STATUS_SKIPPED, error: SKIP_MISSING_TARGET } as const
        : await sendSms(user.phone, body);
    await persist(user.id, reminder.vehicleId, reminder.title, body, smsKey, smsResult);
  }
}

export async function dispatchDueReminders(userId: string, vehicleId: string): Promise<void> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return;
  const today = new Date().toISOString().slice(0, ISO_DATE_LENGTH);
  const reminders = await prisma.reminder.findMany({
    where: {
      vehicleId,
      dueDate: { lte: today },
      status: { not: REMINDER_STATUS_COMPLETED },
    },
  });
  for (const reminder of reminders) {
    await dispatchReminder(user, reminder);
  }
}

export function queueDueReminders(userId: string, vehicleId: string): void {
  void dispatchDueReminders(userId, vehicleId).catch((error) => {
    logger.warn("notification dispatch skipped", error instanceof Error ? error.message : error);
  });
}

async function notifyReminderCreated(userId: string, reminder: ReminderDispatchInput): Promise<void> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return;
  const body = reminderScheduledBody(reminder.title, reminder.dueDate);
  const smsKey = reminderScheduledSourceKey(reminder.id, CHANNEL_SMS);
  if (await alreadyHandled(user.id, smsKey, CHANNEL_SMS)) return;
  const smsResult = !user.notifySms
    ? { channel: CHANNEL_SMS, status: STATUS_SKIPPED, error: SKIP_PREFERENCE_OFF } as const
    : !user.phone
      ? { channel: CHANNEL_SMS, status: STATUS_SKIPPED, error: SKIP_MISSING_TARGET } as const
      : await sendSms(user.phone, body);
  await persist(user.id, reminder.vehicleId, reminder.title, body, smsKey, smsResult);
}

export function queueReminderCreated(userId: string, reminder: ReminderDispatchInput): void {
  void notifyReminderCreated(userId, reminder).catch((error) => {
    logger.warn("reminder created notify skipped", error instanceof Error ? error.message : error);
  });
}

export async function sendTestSms(userId: string): Promise<ChannelResult> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return { channel: CHANNEL_SMS, status: STATUS_SKIPPED, error: SKIP_MISSING_TARGET };
  }
  const sentAt = new Date().toISOString();
  const sourceKey = smsTestSourceKey(sentAt);
  const result: ChannelResult = !user.notifySms
    ? { channel: CHANNEL_SMS, status: STATUS_SKIPPED, error: SKIP_PREFERENCE_OFF }
    : !user.phone
      ? { channel: CHANNEL_SMS, status: STATUS_SKIPPED, error: SKIP_MISSING_TARGET }
      : await sendSms(user.phone, SMS_TEST_BODY);
  await persist(user.id, null, SMS_TEST_BODY, SMS_TEST_BODY, sourceKey, result);
  return result;
}

export async function dispatchHomeDues(userId: string): Promise<void> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return;
  const today = new Date().toISOString().slice(0, ISO_DATE_LENGTH);
  const homes = await prisma.home.findMany({
    where: {
      userId,
      nextDueDate: { not: null, lte: today },
    },
  });
  for (const home of homes) {
    if (!home.nextDueDate) continue;
    await dispatchReminder(user, {
      id: home.id,
      title: home.nextDueTitle || home.city,
      dueDate: home.nextDueDate,
      vehicleId: null,
    });
  }
}

export function queueHomeDues(userId: string): void {
  void dispatchHomeDues(userId).catch((error) => {
    logger.warn("home due dispatch skipped", error instanceof Error ? error.message : error);
  });
}
