type LeadPayload = {
  source: "popup" | "final_cta";
  name?: string;
  phone: string;
  age?: string;
  city?: string;
  consent: boolean;
};

const WEBHOOK_URL = import.meta.env.VITE_SHEETS_WEBHOOK_URL as string | undefined;

export async function submitLead(payload: LeadPayload): Promise<{ ok: boolean; skipped?: boolean }> {
  if (!WEBHOOK_URL) {
    console.warn("VITE_SHEETS_WEBHOOK_URL is not set. Lead is not sent.");
    return { ok: true, skipped: true };
  }

  const body = {
    ...payload,
    timestamp: new Date().toISOString(),
    page: window.location.href,
    userAgent: navigator.userAgent,
  };

  const isFormSubmit = WEBHOOK_URL.includes("formsubmit.co");

  const res = isFormSubmit
    ? await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          source: body.source,
          name: body.name || "",
          phone: body.phone,
          age: body.age || "",
          city: body.city || "",
          consent: String(body.consent),
          timestamp: body.timestamp,
          page: body.page,
          userAgent: body.userAgent,
          _subject: "New lead from turkiye.top",
          _captcha: "false",
          _template: "table",
        }),
      })
    : await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

  if (!res.ok) throw new Error(`Lead submit failed: ${res.status}`);
  return { ok: true };
}
