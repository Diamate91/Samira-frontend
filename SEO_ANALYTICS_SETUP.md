# Wiedźma Samira - Tarot & Spiritual Guidance Website

Profesjonalna strona landing page dla biznesu związanego z czytaniem tarota i rytuałami duchowymi z zaimplementowanym Google Analytics 4, Google Search Console oraz automatyczną odpowiedzią email przez Resend.

## 🔮 Funkcje

### ✅ **Zaimplementowane:**

1. **Google Analytics 4 (GA4)** - Śledzenie ruchu i zachowań użytkowników
2. **Google Search Console (GSC)** - Weryfikacja i optymalizacja SEO
3. **Event Tracking** - Automatyczne śledzenie wszystkich kluczowych interakcji:
   - Kliknięcia w przyciski CTA
   - Otwarcie kart usług
   - Wypełnienie i wysłanie formularza kontaktowego
   - Otwarcie modali
   - Nawigacja
   - Akceptacja/odrzucenie cookies

4. **Resend Email Integration** - Automatyczna odpowiedź po wysłaniu formularza
5. **Toast Notifications** - Wizualne powiadomienia dla użytkownika
6. **SEO Optimization** - Kompletna optymalizacja pod kątem wyszukiwarek
7. **Environment Variables** - Wszystkie klucze w plikach .env
8. **🍪 Cookie Consent Banner (GDPR)** - Profesjonalny popup z akceptacją cookies
   - Pojawia się przy pierwszym wejściu
   - Zapobiega ładowaniu GA4 przed zgodą
   - Mistyczny design pasujący do strony
   - Zapisuje preferencje w localStorage
   - Szczegółowe informacje o cookies
   - Dev tool do resetowania zgody

## 📋 Konfiguracja

### **KROK 1: Skonfiguruj Environment Variables**

1. Skopiuj plik `.env.example` do `.env`:
```bash
cp .env.example .env
```

2. Otwórz plik `.env` i zaktualizuj wartości:

```bash
# Google Analytics 4 Configuration
VITE_GA4_MEASUREMENT_ID=G-TWOJ_ID_TUTAJ  # ← Wklej swój GA4 ID

# Google Search Console Verification
VITE_GSC_VERIFICATION_CODE=twoj_kod_weryfikacyjny  # ← Wklej kod z GSC

# Contact Information
VITE_CONTACT_EMAIL=twoj@email.pl
VITE_BUSINESS_PHONE=+48-123-456-789

# Website URLs (zaktualizuj na swoją domenę)
VITE_SITE_URL=https://twoja-domena.pl
VITE_OG_IMAGE_URL=https://twoja-domena.pl/og-image.jpg
```

### **KROK 2: Google Analytics 4**

**Jak uzyskać Measurement ID:**
1. Zaloguj się do [Google Analytics](https://analytics.google.com/)
2. Utwórz nowe konto lub wybierz istniejące
3. Dodaj nową właściwość (Property) dla swojej strony
4. Wybierz "Web" jako platformę
5. Skopiuj Measurement ID (format: **G-XXXXXXXXXX**)
6. Wklej do `.env` → `VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX`

✅ **Gotowe!** GA4 będzie automatycznie trackować wszystkie eventy.

### **KROK 3: Google Search Console**

**Jak uzyskać kod weryfikacyjny:**
1. Przejdź do [Google Search Console](https://search.google.com/search-console)
2. Dodaj swoją domenę (np. wiedzmasamira.pl)
3. Wybierz metodę weryfikacji: **"HTML tag"**
4. Skopiuj wartość z `content="..."`
5. Wklej do `.env` → `VITE_GSC_VERIFICATION_CODE=twoj_kod`

✅ **Gotowe!** Kod zostanie automatycznie wstawiony do `<head>` strony.

### **KROK 4: Resend Email (Automatyczna Odpowiedź)**

**WAŻNE:** Obecna implementacja to **MOCK** (symulacja). Aby uruchomić prawdziwe wysyłanie emaili:

#### **Backend Setup (Node.js/Express przykład):**

1. Zainstaluj Resend w backendzie:
```bash
npm install resend
```

2. Utwórz plik `.env` w backendzie:
```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
```

3. Utwórz endpoint API `/api/send-email` - **PEŁNY KOD W PLIKU:**
   `/src/app/utils/emailService.ts` (zakomentowany przykład)

4. Zaktualizuj frontend - odkomentuj prawdziwy API call w:
   `/src/app/utils/emailService.ts` linia ~36

**Uzyskanie Resend API Key:**
1. Zarejestruj się na [Resend.com](https://resend.com/)
2. Przejdź do Dashboard → API Keys
3. Utwórz nowy klucz API
4. Dodaj do `.env` backendu: `RESEND_API_KEY=re_xxxxx`

## 📊 Tracked Events (GA4)

Strona automatycznie śledzi następujące wydarzenia:

| Event Name | Opis | Parametry |
|-----------|------|-----------|
| `button_click` | Kliknięcia w przyciski | button_name, location |
| `service_card_click` | Kliknięcia w karty usług | service_name, service_id |
| `form_submit` | Wysłanie formularza | name, email, service |
| `modal_open` | Otwarcie modali | modal_name |
| `cta_click` | Główne CTA | cta_name, cta_location |
| `navigation_click` | Nawigacja | destination, link_text |
| `cookie_consent` | Akceptacja/odrzucenie cookies | action (accept/reject) |

## 🗺️ SEO Files

- `/index.html` - Meta tagi, Schema.org, Open Graph (automatycznie wypełniane z .env)
- `/public/robots.txt` - Instrukcje dla botów
- `/public/sitemap.xml` - Mapa strony

## 📁 Struktura Plików

```
/
├── .env                              # ⚠️ TWOJE KLUCZE (nie commituj!)
├── .env.example                      # Template z instrukcjami
├── .gitignore                        # Ignoruje .env
├── index.html                        # HTML z placeholderami %VITE_*%
├── vite.config.ts                    # Zamienia placeholdery na wartości z .env
├── /src/app/
│   ├── main.tsx                      # Entry point z Toaster
│   ├── App.tsx                       # Główny komponent (używa env)
│   └── /utils/
│       ├── env.ts                    # ✨ Centralized env config
│       ├── analytics.ts              # Funkcje trackingowe GA4
│       └── emailService.ts           # Mock/Real Resend integration
└── /public/
    ├── robots.txt                    # SEO robots
    └── sitemap.xml                   # SEO sitemap
```

## 🚀 Development

```bash
# 1. Zainstaluj dependencies
npm install

# 2. Skonfiguruj .env (zobacz KROK 1 powyżej)
cp .env.example .env
# Edytuj .env i dodaj swoje klucze

# 3. Uruchom dev server
npm run dev

# 4. Build do produkcji
npm run build
```

## 🔍 Jak to działa?

### **Environment Variables Flow:**

1. **Tworzysz `.env`** z kluczami
2. **Vite ładuje** zmienne przy starcie (`vite.config.ts`)
3. **HTML plugin** zamienia `%VITE_*%` na prawdziwe wartośći
4. **Frontend** używa `env.ts` do dostępu do zmiennych

### **Przykład:**

```typescript
// W kodzie:
import env from './utils/env';
console.log(env.ga4MeasurementId);  // G-XXXXXXXXXX

// W HTML (automatycznie):
<meta content="%VITE_GSC_VERIFICATION_CODE%" />
// Staje się →
<meta content="twoj_prawdziwy_kod" />
```

## 📝 Notatki

- **Figma Make nie obsługuje backendu** - Resend wymaga backend API
- Toast notifications działają od razu
- GA4 tracking działa po podaniu Measurement ID w `.env`
- GSC weryfikacja wymaga opublikowania strony

## 🔒 Bezpieczeństwo

⚠️ **NIGDY NIE COMMITUJ .env DO GIT!**

✅ **Bezpiecznie:**
- `.env` → plik lokalny (w `.gitignore`)
- `.env.example` → template bez prawdziwych kluczy (commituj)
- Backend API keys → tylko w backendzie, nigdy w frontend

❌ **Niebezpiecznie:**
- Hardcodowanie API keys w kodzie
- Commitowanie .env do Git/GitHub
- Wystawianie Resend API key w frontend

## 🆘 Troubleshooting

### **GA4 nie śledzi:**
- Sprawdź czy `VITE_GA4_MEASUREMENT_ID` w `.env` jest prawidłowe
- Otwórz DevTools → Console, szukaj błędów
- Sprawdź czy `VITE_ENABLE_GA4=true`

### **GSC nie weryfikuje:**
- Upewnij się, że strona jest opublikowana online
- Kod weryfikacyjny musi być w `<head>` (sprawdź źródło strony)
- Poczekaj kilka minut i spróbuj ponownie

### **Email nie wysyła:**
- Normalne! To mock. Musisz skonfigurować backend (zobacz KROK 4)
- Sprawdź Console → zobaczysz symulowane wywołanie

### **Cookie Consent nie pokazuje się:**
- Oczyść localStorage: DevTools → Application → Local Storage → usuń `cookie-consent`
- Odśwież stronę
- W development użyj przycisku "Reset Cookies (Dev)" w prawym dolnym rogu

### **Cookie Consent pokazuje się za każdym razem:**
- Sprawdź czy localStorage działa w przeglądarce
- Sprawdź czy nie używasz trybu Incognito (localStorage jest czyszczone)

## 🍪 Cookie Consent & GDPR

### **Jak działa Cookie Consent:**

1. **Pierwsze wejście:**
   - Użytkownik widzi popup po 1 sekundzie
   - GA4 **NIE** jest ładowane
   - Tracking events są logowane jako mock

2. **Po akceptacji (Akceptuję):**
   - Zgoda zapisywana w localStorage
   - Strona przeładowuje się
   - GA4 inicjalizuje się automatycznie
   - Wszystkie eventy są trackowane

3. **Po odrzuceniu (Odrzuć):**
   - Decyzja zapisywana w localStorage
   - GA4 pozostaje wyłączone
   - Popup nie pokazuje się ponownie

### **Zmiana decyzji:**

Użytkownicy mogą zmienić decyzję poprzez:
- Wyczyszczenie localStorage przeglądarki
- W development: kliknięcie "Reset Cookies (Dev)" (dolny prawy róg)

### **Zgodność z GDPR:**

✅ **Co jest zaimplementowane:**
- Cookies nie są ładowane przed zgodą
- Jasne informacje o używanych cookies
- Możliwość odrzucenia
- Przycisk "Pokaż szczegóły" z pełną listą cookies
- IP anonymization w GA4 (`anonymize_ip: true`)

⚠️ **Do rozważenia w produkcji:**
- Link do pełnej Polityki Prywatności
- Link do pełnej Polityki Cookies
- Opcja zmiany decyzji w footer (obecnie tylko przez localStorage)
- Granular consent (osobne zgody dla różnych typów cookies)

## 📧 Kontakt

Dla pytań dotyczących konfiguracji, skontaktuj się z developerem.