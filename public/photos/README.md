# photos/

Drop your photos here. Site uses 3 treatment components:

## DuotonePhoto

Place: About section (medium portrait), margin near hero.
Best subjects: portrait, workspace, candid working shot.
Format: any jpg/png/webp. Treated client-side via SVG filter (no preprocessing).
Suggested files:
- `me.jpg` — main portrait (~400×500 px)
- `workspace.jpg` — desk / setup shot

## HalftoneImage

Place: Activity rows (60×60 thumbnails).
Best subjects: tight crops — scout badge, chess piece, wrestling stance, cube.
Suggested files:
- `scout.jpg`
- `chess.jpg`
- `wrestling.jpg`
- `cube.jpg`
- `nonprofit.jpg`
- `teen-court.jpg`
- `4h.jpg`

## TerminalFrame

Place: Project detail pages.
Best subjects: screenshots, model output graphs, dashboard renders.
Suggested files:
- `lncrna-confusion.png`
- `filtercycle-prototype.jpg`
- `ssma-asset.png`
- `prediction-dashboard.png`
- `curo-ui.png`

## Sizing tips

- Originals can be large; components scale them.
- For mobile perf, run through https://squoosh.app once and target ≤ 200 KB each.
- Square crops work best for HalftoneImage (60×60).
- 4:5 portrait works best for DuotonePhoto.

## Already wired

Components render placeholder SVGs if file missing. Drop a real image with matching filename → it just works.
