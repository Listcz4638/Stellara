# Stellara

Startovní web pro **Stellara** — objednávkovou stránku na astrologické konzultace u vás doma. Jednoduchý Node/Express server, který servíruje statickou landing page (`public/`). Připravený k nasazení na Render z GitHub repozitáře.

## ⚠️ Než to spustíš doopravdy

Rezervační formulář je připravený posílat objednávky přes [Formspree](https://formspree.io) (zdarma, bez nutnosti psát vlastní backend) — stačí doplnit jedno místo:

1. Založ si účet na formspree.io, vytvoř nový formulář a zkopíruj si jeho URL (tvar `https://formspree.io/f/xxxxxxxx`).
2. V `public/index.html` najdi řádek `<form class="booking-form" id="bookingForm" action="https://formspree.io/f/TVOJE_ID" ...>` a `TVOJE_ID` nahraď skutečným ID z Formspree.
3. Ulož, commitni a pushni na GitHub — Render web automaticky znovu nasadí.
4. Po prvním testovacím odeslání ti Formspree pošle potvrzovací e-mail — musíš ho potvrdit, jinak další zprávy zablokuje.
5. Zkus objednávku fakt odeslat a ověř, že ti e-mail s objednávkou dorazí.

Formulář teď posílá data přes `fetch` (bez přesměrování na Formspree) — po odeslání se rovnou zobrazí poděkování na stránce.

Až to bude fungovat, doplň v `index.html` reálné jméno, město a kontakt (jsou tam označené `[Jméno]`, `[Město]`, `[telefon / e-mail]`) a případně uprav ceny konzultací.

## Struktura

```
stellara/
├── server.js          # Express server (servíruje public/)
├── package.json
├── render.yaml         # Render blueprint (volitelné, pro automatickou konfiguraci)
├── public/
│   ├── index.html
│   ├── css/style.css
│   └── js/main.js
└── .gitignore
```

## Spuštění lokálně

```bash
npm install
npm start
```

Web poběží na http://localhost:3000

## Nahrání na GitHub

```bash
git init
git add .
git commit -m "Stellara: první verze"
git branch -M main
git remote add origin https://github.com/TVOJE-JMENO/stellara.git
git push -u origin main
```

(Repozitář na GitHubu si nejdřív založ přes „New repository" — bez README/gitignore, aby nedošlo ke konfliktu.)

## Nasazení na Render

1. Na [render.com](https://render.com) klikni na **New +** → **Web Service**.
2. Připoj svůj GitHub účet a vyber repozitář `stellara`.
3. Render by měl automaticky rozpoznat `render.yaml` a předvyplnit nastavení. Pokud ne, nastav ručně:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node
4. Klikni na **Create Web Service**. Render web nasadí a při každém `git push` do `main` ho automaticky znovu nasadí.

## Co dál

- Text a barvy uprav v `public/index.html` a `public/css/style.css` (proměnné jsou nahoře v `:root`).
- Animovaná mapa souhvězdí v hero sekci je čistý `<canvas>` v `public/js/main.js` — dá se snadno nahradit reálnými daty.
- Formulář „Přidat se na seznam" je zatím jen na frontendu — až budeš mít backend/databázi nebo službu jako Mailchimp, napoj ho v `main.js`.
