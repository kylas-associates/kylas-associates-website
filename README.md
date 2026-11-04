# Kylas Associates — Website

Static website for **Kylas Associates, Advocates & Legal Consultants**. It uses plain HTML, CSS and a small amount of vanilla JavaScript, with no frameworks, build step or npm. All text comes from `Kylas_Associates_Website_Content.docx`.

Live at **https://kylasassociates.com** (custom domain set in the `CNAME` file).

## Files

```
/
├── index.html               Home (Section 2)
├── about.html               About the Firm (3) and Founder Profile (4)
├── team.html                Team (5)
├── practice-areas.html      Practice Areas (6)
├── courts-and-forums.html   Courts and Forums (7)
├── consultation.html        Book a Consultation (8)
├── contact.html             Contact (9)
├── privacy.html, terms.html Legal Pages (10), linked from the footer
├── 404.html
├── assets/
│   ├── css/style.css
│   ├── js/main.js           disclaimer modal, mobile menu, FAQ accordion, team bios
│   ├── team/                team photographs
│   ├── favicon.svg
│   └── og-image.png         image shown when a link is shared
├── sitemap.xml, robots.txt
├── CNAME                    custom domain for GitHub Pages
└── .nojekyll
```

The header and footer are repeated in every page. If you change a phone number, address or menu item, change it in **every** `.html` file. Your editor's "find and replace in files" does this in one step.

To preview locally, double-click `index.html`, or run `python -m http.server 8000` in this folder and open http://localhost:8000.

---

## 1. Publishing on GitHub Pages

1. Sign in at https://github.com and click **New repository**. Give it a name, for example `kylas-associates`, set it to **Public** and click **Create repository**.
2. On the new repository page, click **uploading an existing file**. Drag in **everything in this folder**: all the `.html` files, the `assets` folder, `sitemap.xml`, `robots.txt`, `CNAME` and `.nojekyll`. `index.html` must sit at the top level, not inside another folder. Click **Commit changes**.
   *(With git: `git add . && git commit -m "Update website" && git push`.)*
3. Open **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**, choose **Branch: `main`** and folder **`/ (root)`**, then click **Save**.
5. Wait a minute or two. The address appears at the top of the Pages screen.

> If you publish **without** a custom domain (at `https://<username>.github.io/<repo>/`), delete the `CNAME` file. Every page works at that address because all links are relative. The exception is `404.html`, whose links start with `/`, so they only work on a custom domain or a `<username>.github.io` root site. Also change the `https://kylasassociates.com/` addresses in `sitemap.xml`, `robots.txt` and the `og:` / `canonical` tags.

## 2. Connecting a custom domain

The site is already set up for **kylasassociates.com**. To use a different domain, for example `kylasassociates.in`:

1. In **Settings → Pages → Custom domain**, enter the domain and click **Save**. GitHub updates the `CNAME` file for you.
2. In the DNS settings at your domain registrar, add these records:

   | Type  | Name / Host | Value |
   |-------|-------------|-------|
   | A     | `@`         | `185.199.108.153` |
   | A     | `@`         | `185.199.109.153` |
   | A     | `@`         | `185.199.110.153` |
   | A     | `@`         | `185.199.111.153` |
   | AAAA  | `@`         | `2606:50c0:8000::153` |
   | AAAA  | `@`         | `2606:50c0:8001::153` |
   | AAAA  | `@`         | `2606:50c0:8002::153` |
   | AAAA  | `@`         | `2606:50c0:8003::153` |
   | CNAME | `www`       | `<your-github-username>.github.io` |

3. DNS changes can take up to 24 hours. When GitHub shows the domain as verified, tick **Enforce HTTPS**.
4. Replace `https://kylasassociates.com/` with the new domain in `sitemap.xml`, `robots.txt` and the `<head>` of each page (`canonical` and `og:` tags).

## 3. Setting up the enquiry form (Formspree)

GitHub Pages cannot process forms, so the form on `contact.html` sends submissions to Formspree, which emails them to the firm.

1. Create a free account at https://formspree.io, using the email address that should receive enquiries.
2. Click **New Form**, name it (for example "Website enquiries") and confirm the email address.
3. Formspree shows an endpoint such as `https://formspree.io/f/abcdwxyz`. Copy the ID at the end (`abcdwxyz`).
4. Open `contact.html`, find `https://formspree.io/f/YOUR_FORM_ID`, replace `YOUR_FORM_ID` with your ID, and save and upload.
5. Send a test enquiry from the live site. Formspree asks you to confirm the first submission.

Until step 4 is done, the form does not work.

## 4. Team photos and details

**Photos** live in `assets/team/` and are named after each person:

| Person | File |
|---|---|
| Dr. K. P. Kylasanatha Pillay | `kylasanatha-pillay.jpg` |
| Adv. Sreedevi Kylasanath | `sreedevi-kylasanath.jpg` |
| Adv. Achuth Kylas | `achuth-kylas.jpg` |
| Adv. Kamalakshy Kylasanath | `kamalakshy-kylasanath.jpg` |
| Adv. Joselal George | `joselal-george.jpg` |
| Adv. Sachin P.K. | `sachin-pk.jpg` |
| Adv. Jaison Scaria | `jaison-scaria.jpg` |
| Adv. Varghese Xavier | `varghese-xavier.jpg` *(missing)* |
| Adv. Ananthu R.S. | `ananthu-rs.jpg` *(missing)* |
| Adv. Praveen S. | `praveen-s.jpg` *(missing)* |
| Adv. Sathi R. | `sathi-r.jpg` *(missing)* |
| Sabu C.G. | `sabu-cg.jpg` *(missing)* |

To add or replace a photo, save a **square** JPEG, about 600 × 600 pixels and under 150 KB, with the exact file name above, and upload it to `assets/team/`. No code change is needed. Until a file exists, the site shows the person's initials on a grey square. Colour photos are shown in black and white automatically.

The founder's larger photo on `about.html` uses the same `kylasanatha-pillay.jpg`.

**To edit a team member's details**, open `team.html` and find the person's `<li class="card" id="...">` block:

- `<h3>` is the name.
- `<p class="designation">` is the designation.
- `<p class="quals">` holds the qualifications, enrolment and contact line.
- `<div class="bio">` holds the full profile paragraphs, one `<p>` per paragraph.

To add a profile for someone without one (currently Adv. Jaison Scaria), copy the "Read profile" `<button>` and `<div class="bio">` from another card. Change the `bio-...` id in **both** places to match the person, for example `bio-jaison-scaria`.

Keep the order of the cards as set by the firm: Dr. K. P. Kylasanatha Pillay, Adv. Sreedevi Kylasanath, Adv. Achuth Kylas, Adv. Kamalakshy Kylasanath, then the rest of the team.

## 5. Remaining placeholders and missing items

- [ ] **Adv. Jaison Scaria — `[Areas of practice]`**. Shown highlighted in yellow on `team.html`. He also has no profile paragraphs yet.
- [ ] **Photo: Adv. Varghese Xavier** (`assets/team/varghese-xavier.jpg`)
- [ ] **Photo: Adv. Ananthu R.S.** (`assets/team/ananthu-rs.jpg`)
- [ ] **Photo: Adv. Praveen S.** (`assets/team/praveen-s.jpg`)
- [ ] **Photo: Adv. Sathi R.** (`assets/team/sathi-r.jpg`)
- [ ] **Photo: Sabu C.G.** (`assets/team/sabu-cg.jpg`, optional)
- [ ] **Formspree form ID**: replace `YOUR_FORM_ID` in `contact.html` (see section 3).
- [ ] **Map pins**: check that each embedded map on `contact.html` points to the right building. They are generated from the address text. The Delhi office map searches for "Supreme Towers, Sector 99, Noida".

## Notes

- **Disclaimer.** On a visitor's first visit, a full-screen Bar Council of India disclaimer hides the site until they click **I Agree**. **Exit** takes them back or to a blank page. Acceptance is remembered in the browser's `localStorage`. If storage is unavailable, the disclaimer shows on every page.
- **Colour contrast.** To meet WCAG AA, small copper text uses a slightly darker copper (`--copper-text: #8A5428`), and small grey text uses a darker steel (`--steel-text`). Text on the Slate Blue-Grey bands uses Charcoal and Deep Teal, because Soft White on Slate (about 2:1) is too faint to read. Soft White is kept for divider lines on those bands.
- **No advertising.** In line with Bar Council of India rules, the site has no testimonials, results, rankings or promotional pop-ups. Keep it that way when editing.
