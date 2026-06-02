# Få vår logga att visas som avsändar-ikon i mejlappar (BIMI)

I inkorgs-listan (t.ex. Apple Mail på iPhone) visas en **avsändar-avatar**
till vänster om varje mejl. Idag visar Apple Mail en generisk byggnads-ikon
för våra utskick eftersom det inte finns någon **verifierad logga** kopplad
till domänen `aikostnad.se`.

Detta styrs **inte** av mejlets HTML — det styrs av **BIMI**
(Brand Indicators for Message Identification): en logga som kopplas till
domänen via en DNS-post, och som de flesta klienter dessutom kräver ett
**certifikat** för att faktiskt visa.

Loggan finns redan färdig i repot:
`public/bimi-logo.svg` → efter deploy live på
**https://aikostnad.se/bimi-logo.svg**
(kvadratisk, i det BIMI-krävda formatet SVG Tiny Portable/Secure).

Det som återstår är två saker som måste göras utanför koden.

---

## Förkrav: DMARC i "enforcement"

BIMI kräver att domänen har DMARC med policy `p=quarantine` eller `p=reject`
(alltså **inte** `p=none`) och `pct=100`. Vi tar redan emot DMARC-rapporter,
så posten finns — men kontrollera att policyn är skarp:

```
_dmarc.aikostnad.se   TXT   "v=DMARC1; p=quarantine; rua=mailto:...; pct=100"
```

Står det `p=none` visas ingen BIMI-logga. Höj till `p=quarantine` först när
SPF + DKIM är gröna för alla utskick (vi skickar via Resend — säkerställ att
Resends DKIM/SPF är verifierade i deras dashboard).

---

## Väg A — Apple Business Connect (gratis, fixar just Apple Mail)

Skärmdumpen är från **Apple Mail**. Apple låter företag registrera sin
logga gratis via **Apple Business Connect**, varpå loggan visas som
avsändar-avatar i Apple Mail (samt i Maps, Wallet m.m.). Inget VMC-certifikat
krävs.

1. Gå till https://businessconnect.apple.com och logga in med ett Apple-ID.
2. Registrera och verifiera företaget / domänen `aikostnad.se`.
3. Under varumärke/logotyp: ladda upp loggan (använd `public/bimi-logo.svg`
   eller en kvadratisk PNG av samma symbol).
4. Koppla avsändaradressen `hej@aikostnad.se` till varumärket.

> Detta är den snabbaste vägen för att fixa exakt det du ser på skärmdumpen.

---

## Väg B — BIMI + certifikat (standarden: Gmail, Yahoo, Apple m.fl.)

För att loggan ska visas brett (inkl. Gmail och Yahoo) används BIMI med ett
**VMC** (Verified Mark Certificate) eller **CMC** (Common Mark Certificate).

1. **Hosta loggan** — klart efter deploy: https://aikostnad.se/bimi-logo.svg
2. **Skaffa certifikat** (det här är betal-steget och den verkliga grinden):
   - **VMC** kräver ett **registrerat varumärke** för "Aikostnad". Kostar
     ca 1 000–1 500 USD/år (DigiCert eller Entrust).
   - **CMC** kräver inget registrerat varumärke men har lägre täckning.
   Certifikatet levereras som en `.pem`-fil som också hostas, t.ex.
   `https://aikostnad.se/bimi-vmc.pem`.
3. **Lägg till BIMI-DNS-posten:**

   ```
   default._bimi.aikostnad.se   TXT   "v=BIMI1; l=https://aikostnad.se/bimi-logo.svg; a=https://aikostnad.se/bimi-vmc.pem"
   ```

   (Utan certifikat: utelämna `a=`. Då kan vissa klienter visa loggan, men
   varken Gmail eller Apple Mail gör det förrän `a=` med giltigt cert finns.)

---

## Verifiera

- Validera loggan: https://bimigroup.org/bimi-generator/ (Inspect/validate)
- Kontrollera DNS + cert: https://bimigroup.org/bimi-inspector/
- Skicka ett testmejl till Gmail/Apple Mail och kontrollera avataren.
  (Klienter cachar — det kan ta tid innan ikonen slår igenom.)

---

## TL;DR

| Steg | Var | Status |
|------|-----|--------|
| Kvadratisk SVG Tiny PS-logga | `public/bimi-logo.svg` | ✅ klart i repot |
| DMARC `p=quarantine`/`reject` | DNS | ⬜ kontrollera/höj |
| Apple Mail-logga (gratis) | Apple Business Connect | ⬜ registrera |
| Bred täckning (Gmail m.fl.) | VMC/CMC-cert + BIMI-DNS | ⬜ betal-steg |

Den generiska ikonen försvinner alltså **inte** enbart av en kodändring —
loggan ligger redo, men avataren tänds först när Apple Business Connect
(väg A) eller BIMI-posten med certifikat (väg B) är på plats.
