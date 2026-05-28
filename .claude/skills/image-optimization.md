# SKILL: Image Optimization — WebP + Lazy + Responsive

Quando il task tocca immagini (peso, lazy loading, responsive, hero video, render bg), segui questo workflow.

## QUANDO ATTIVARE
Trigger: "ottimizza immagini", "scroll lagga", "foto pesanti", "convert webp", "lazy loading", "responsive images", "hero performance", "LCP", "CLS".

## DIAGNOSI PRIMA DI AGIRE
1. Lista file: `Get-ChildItem -Path public\images -Recurse -File | Sort Length -Desc | Select Name, @{N='MB';E={[math]::Round($_.Length/1MB,2)}}`
2. Identifica i 3 file più pesanti. Se >2MB ciascuno → priorità alta.
3. Apri DevTools Network tab, ricarica, vedi quali immagini bloccano il load (orange/red bars).

## REGOLE OPTIMIZATION
- **Formato target**: WebP (qualità 80) per ogni immagine non-trasparente. JPEG fallback solo se serve compatibilità IE/legacy (raramente).
- **Dimensioni max**:
  - Hero/full-bleed: 1920×1280 (desktop), 768×1024 (mobile via srcset)
  - Card grid: 800×600 max
  - Thumbnail/icon: 400×300 max
- **Lazy loading**: `loading="lazy"` su tutte tranne hero (eager + fetchpriority="high").
- **Width/height attributes**: SEMPRE specificati per evitare CLS.
- **alt text**: descrittivo, italiano, contesto progetto.
- **Decoding**: `decoding="async"` sotto la fold.

## RESPONSIVE CON <picture>
Quando hero o sezione full-bleed:
```html
<picture>
  <source media="(max-width: 768px)" srcset="/images/hero/hero-main-mobile.webp" type="image/webp">
  <source media="(min-width: 769px)" srcset="/images/hero/hero-main.webp" type="image/webp">
  <img src="/images/hero/hero-main.jpg" alt="..." loading="eager" fetchpriority="high" width="1920" height="1280">
</picture>
```

## CONVERSIONE BATCH (PowerShell + ffmpeg)
Se ffmpeg disponibile:
```powershell
# Installa: choco install ffmpeg (admin)
# O scaricalo da ffmpeg.org

cd public\images
Get-ChildItem -Recurse -Include *.jpg,*.jpeg,*.png | ForEach-Object {
    $output = $_.FullName -replace '\.(jpg|jpeg|png)$', '.webp'
    ffmpeg -i $_.FullName -c:v libwebp -quality 80 $output
}
```

Senza ffmpeg, alternativa Node:
```powershell
npm install -D sharp
# poi script src/scripts/optimize-images.mjs (usa sharp().webp({quality:80}))
```

## FALLBACK PLACEHOLDER
Per immagini ancora non disponibili, NON usare img vuoti. Usa div con CSS gradient (.ph-int, .ph-vista, .ph-detail, .ph-ext) + tag piccolo "Render in arrivo" come da reference EDEL.

## ANTI-PATTERN
1. PNG quando JPEG/WebP basta (10x più pesante a parità qualità)
2. Hero immagine senza preload → LCP scarso
3. Immagini >5MB caricate eager → blocco render
4. Mancanza width/height → CLS shift sul load
5. Lazy loading anche sull'hero → primo paint vuoto
6. SVG o canvas per finta animazione invece di video → impossibile da gestire

## VERIFICA FINE TASK
- Lighthouse → Performance > 85, LCP < 2.5s
- Total page weight < 3MB su prima visita
- Nessun CLS shift visibile a occhio durante scroll
