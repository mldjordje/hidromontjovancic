# Hidromont Jovancic - Next.js + PHP API

## 1) Frontend (Vercel)

Aplikacija je u root folderu (Next.js App Router).

### Lokalno

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
npm start
```

### Env za Vercel

Kopiraj vrednosti iz `.env.example`:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_API_BASE`

## 2) Backend (cPanel)

Backend je u `backend/api`, SQL schema u `backend/sql/schema.sql`.

### Koraci

1. U phpMyAdmin importuj `backend/sql/schema.sql`.
2. Na cPanel hostingu uploaduj `backend/api` na domen/subdomen za API (npr. `api.hidromontjovancic.rs/api`).
3. Podesi environment varijable (ili rucno `backend/api/config.php`):
   - `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASS`
   - `CORS_ORIGINS` (ukljuci glavni domen i Vercel domen)
   - `UPLOAD_DIR`, `UPLOAD_BASE_URL`
   - `ORDER_NOTIFY_EMAIL`, `MAIL_FROM`, `MAIL_FROM_NAME`
4. Kreiraj admin korisnika u tabeli `admins` (password hash):

```php
<?php echo password_hash('tvoja_lozinka', PASSWORD_DEFAULT); ?>
```

Upisi email + hash u tabelu `admins`.

## 3) Sta je uradjeno

- Migracija staticnog sajta na Next.js strukturu.
- Dodata admin sekcija:
  - `/admin/projects` za CRUD projekata.
  - `/admin/orders` za pregled i status upita sa sajta.
- Kontakt forma salje podatke na `POST /orders`, pa se prikazuju u admin panelu.
- Kopiran i prilagodjen PHP API za cPanel + phpMyAdmin deployment.

## 4) Napomena

U projektu je ostavljen i originalni `prevozkop` folder kao referenca, ali aktivni frontend za deploy je u root-u.
