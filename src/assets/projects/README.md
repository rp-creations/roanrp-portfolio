# Project screenshots

Drop a screenshot here and it appears automatically — no code changes needed.
The filename (without extension) must match the project `slug` in
`src/data/portfolio.js`:

| Filename           | Project                                    |
| ------------------ | ------------------------------------------ |
| `casamie.webp`     | CASMIE — Casa Miani child-care portal      |
| `barbershop.webp`  | Lantin Barbershop Management System        |
| `java-gui.webp`    | CB Photography — Booking & Receipting      |

Supported extensions: `.png`, `.jpg`, `.jpeg`, `.webp`, `.avif`.

Add numbered variants (`casamie-2.webp`, `casamie-3.webp`) to build a carousel.
Each file must be a genuinely different screenshot — identical images would just
repeat the same slide.

> **Privacy:** CASMIE handles records about minors. Only publish screenshots of
> public pages, or of a seeded demo with names and identifying details removed.
> Never publish child profiles, case notes, photos of residents, or financial
> records.

Recommended: **1600 × 900** (16:9), compressed. The card renders at a 16:9
ratio, so off-ratio images are centre-cropped. Until a file exists, a neutral
wireframe placeholder is shown instead.

`source/` holds the original PNG exports. They are not imported by the app
(the glob only matches files directly in this folder), so they do not affect
the build — keep them if you want to re-export at a different size or quality.
