# Project screenshots

Drop a screenshot here and it appears automatically — no code changes needed.
The filename (without extension) must match the project `slug` in
`src/data/portfolio.js`:

| Filename           | Project                               |
| ------------------ | ------------------------------------- |
| `casamie.webp`     | CASMIE — Casa Miani Management System |
| `barbershop.webp`  | Barbershop Management System          |
| `java-gui.webp`    | Java GUI Application                  |

Supported extensions: `.png`, `.jpg`, `.jpeg`, `.webp`, `.avif`.

Recommended: **1600 × 900** (16:9), compressed. The card renders at a 16:9
ratio, so off-ratio images are centre-cropped. Until a file exists, a neutral
wireframe placeholder is shown instead.

`source/` holds the original PNG exports. They are not imported by the app
(the glob only matches files directly in this folder), so they do not affect
the build — keep them if you want to re-export at a different size or quality.
