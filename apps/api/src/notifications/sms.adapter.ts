import { config, isSmsNotifyReady } from "../config";
import { logger } from "../logger";
import { toE164Phone } from "../modules/auth/auth.utils";
import { SKIP_NOT_CONFIGURED, STATUS_FAILED, STATUS_SENT, STATUS_SKIPPED, TWILIO_API_BASE } from "./notifications.const";
import type { ChannelResult } from "./notifications.types";

export async function sendSms(to: string | null, body: string): Promise<ChannelResult> {
  const e164 = toE164Phone(to);
  if (!isSmsNotifyReady() || !e164) {
    return { channel: "sms", status: STATUS_SKIPPED, error: SKIP_NOT_CONFIGURED };
  }
  const url = `${TWILIO_API_BASE}/${config.twilioAccountSid}/Messages.json`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${config.twilioAccountSid}:${config.twilioAuthToken}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      From: config.twilioFromNumber,
      To: e164,
      Body: body,
    }),
  });
  if (!response.ok) {
    logger.warn("sms send failed", response.status);
    return { channel: "sms", status: STATUS_FAILED, error: `http_${response.status}` };
  }
  return { channel: "sms", status: STATUS_SENT };
}
