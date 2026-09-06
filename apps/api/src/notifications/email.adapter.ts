import { config, isEmailNotifyReady } from "../config";
import { logger } from "../logger";
import { RESEND_EMAILS_URL, SKIP_NOT_CONFIGURED, STATUS_FAILED, STATUS_SENT, STATUS_SKIPPED } from "./notifications.const";
import type { ChannelResult } from "./notifications.types";

export async function sendEmail(to: string | null, title: string, body: string): Promise<ChannelResult> {
  if (!isEmailNotifyReady() || !to) {
    return { channel: "email", status: STATUS_SKIPPED, error: SKIP_NOT_CONFIGURED };
  }
  const response = await fetch(RESEND_EMAILS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: config.notifyFromEmail,
      to: [to],
      subject: title,
      text: body,
    }),
  });
  if (!response.ok) {
    logger.warn("email send failed", response.status);
    return { channel: "email", status: STATUS_FAILED, error: `http_${response.status}` };
  }
  return { channel: "email", status: STATUS_SENT };
}
