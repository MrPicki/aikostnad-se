// Supabase client — prepared for email lead capture.
// leadCaptureEnabled in siteConfig.ts must be true before activating.
// Setup: create table "leads" with columns: id, email, created_at, source

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";

export interface Lead {
  email: string;
  source?: string;
}

export async function submitLead(lead: Lead): Promise<{ error: string | null }> {
  if (!supabaseUrl || !supabaseAnonKey) {
    return { error: "Supabase är inte konfigurerat" };
  }

  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ email: lead.email, source: lead.source ?? "calculator" }),
    });

    if (!res.ok) {
      return { error: "Kunde inte spara e-postadressen" };
    }
    return { error: null };
  } catch {
    return { error: "Nätverksfel – försök igen" };
  }
}
