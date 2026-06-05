# Aikostnad.se — AI-instruktioner (CLAUDE.md)

Läs detta **innan du ändrar något** i morning-digest-systemet.

---

## morning-digest — känd historik och VARNINGAR

### Vercel Cron är NÖDVÄNDIG och FUNGERAR på Hobby-plan

`vercel.json` innehåller ett `crons`-block:
```json
"crons": [{ "path": "/api/morning-digest", "schedule": "0 6 * * *" }]
```

**TA INTE BORT DET.** Det är primarytriggern för dagliga AI-mejl (06:00 UTC = 08:00 CEST).

**BEVIS att Hobby-plan stödjer det:** Deployment `37b11213` (2026-06-05 08:16 UTC)
accepterades av Vercel utan fel. Vercel Hobby tillåter max 2 cron-jobb á max 1×/dag.
Commit `7a55a40` som påstod "kräver Pro-plan" var **FELAKTIG** — ignorera den.

### Idempotency är atomic — MEN catch-blocket måste vara fail-safe

`claimTodaySlot()` i `api/morning-digest.ts` gör ett atomärt INSERT med
`resolution=ignore-duplicates`. Supabase unique constraint på `slug` garanterar att
exakt EN process kan skicka mejlet per dag. **Ändra inte tillbaka till SELECT→INSERT-mönstret**
— det orsakade race conditions och dubbletter (bevisat juni 2 2026).

**KRITISKT:** catch-blocket i `claimTodaySlot()` ska returnera `false` (fail-safe),
**INTE** `return true` (fail-open). Med fail-open + GitHub Actions dubbla instanser
→ båda requests timeout på Supabase → båda returnerar true → dubbelsändning.
Bevisat 2026-06-05: 2 mejl skickades med 5,8s mellanrum. Fixat med fail-safe + GH concurrency.

### GitHub Actions är backup, inte primärtrigger — och MÅSTE ha concurrency-kontroll

`.github/workflows/morning-digest.yml` kör `0 8 * * *` (08:00 UTC) som backup.
GitHub Actions delayed workflows med 2–7h på inaktiva repos — det är därför de
**inte** kan vara primärtrigger. Vercel Cron kör på exakt schemalagd tid.

**KRITISKT:** Workflowen MÅSTE ha `concurrency: group: morning-digest` — annars kan
GH Actions starta dubbla instanser av samma jobb (bevisat 2026-06-05). Redan fixat.

---

## Arkitektur

- **Primärtrigger**: Vercel Cron 06:00 UTC → `GET /api/morning-digest`
- **Backup**: GitHub Actions 08:00 UTC → `GET /api/morning-digest`
- **Idempotency**: Supabase `daily_articles` unique slug — atomic INSERT claim
- **Email**: Resend API → christoffer.nolet@gmail.com
- **Innehåll**: claude-haiku-4-5 via Anthropic API, fallback till råa RSS-rubriker
