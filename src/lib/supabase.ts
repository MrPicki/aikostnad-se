// Supabase client — prepared for email lead capture.
// leadCaptureEnabled in siteConfig.ts must be true before activating.
// Table schema: id uuid PK, email text NOT NULL, created_at timestamptz, calc_data jsonb

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ??
  "https://avdmyaufyhfxdlmzfjiu.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF2ZG15YXVmeWhmeGRsbXpmaml1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4MzUyMjAsImV4cCI6MjA5NDQxMTIyMH0.BZZExu_Dlr-n0Ubbp1D92uPJZSBJuLud5SP1AT8d66U";

export interface Lead {
  email: string;
  calc_data?: Record<string, unknown>;
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
      body: JSON.stringify({ email: lead.email, calc_data: lead.calc_data ?? null }),
    });

    if (!res.ok) {
      return { error: "Kunde inte spara e-postadressen" };
    }
    return { error: null };
  } catch {
    return { error: "Nätverksfel – försök igen" };
  }
}
