# 🎂 Happy Birthday, Sriparna 💖

A dreamy, glassmorphic, pastel-pink birthday website built entirely with **HTML5, CSS3, and vanilla JavaScript** — no frameworks, no build tools, no dependencies to install. Open `index.html` in a browser and it just works.

## ✨ What's inside

- **Animated hero** with a hand-built CSS gift-and-cupcake illustration, a glowing "Open Your Surprise" button, and a soft entrance animation.
- **Living background**: floating hearts, drifting butterflies, twinkling stars, soft clouds, rising balloons, falling rose petals, glowing sparkles, light rays, and a slowly shifting pastel gradient — all pure CSS/JS, no images required.
- **Surprise gift box** you tap to open, with a burst of hearts, a glow flash, and a fading-in message.
- **Typewriter letter** that types itself out the moment you scroll to it, using the exact heartfelt message you provided.
- **Interactive birthday cake** — click each candle to blow it out (with a little puff of smoke). Blow out every candle and confetti launches with a congratulations message.
- **Wish cards** that gently rise into view as you scroll.
- **Floating music button** — music never autoplays; it only starts when the visitor presses play.
- **Cursor heart trail, ripple effects on buttons, hover glow, and smooth scrolling** throughout.
- Fully responsive from small phones to large desktops, with `prefers-reduced-motion` support baked in.

## 📁 Folder structure

```
/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── music/     ← put your birthday song here
    ├── images/    ← optional, not required — the site looks complete without any photos
    └── icons/     ← optional, for any custom icons you want to add later
```

## 🎵 Adding the birthday music

The music button is already fully wired up. To activate it:

1. Add an MP3 file to the `assets/music/` folder.
2. Name it exactly: `birthday-song.mp3`
3. Done — the floating music button will now play/pause that file when tapped.

If no file is present, the button still appears after the surprise is opened, it will simply do nothing until a valid MP3 is added (no errors will appear in the console).

## 🚀 Deploying to GitHub Pages

1. Create a new GitHub repository (public).
2. Upload all files and folders exactly as they are, keeping the same structure.
3. Go to **Settings → Pages**.
4. Under "Build and deployment", set **Source** to `Deploy from a branch`.
5. Choose the `main` branch and `/ (root)` folder, then save.
6. Wait a minute or two — your site will be live at:
   `https://<your-username>.github.io/<repository-name>/`

No build step, no npm install, no configuration needed — it's ready to go exactly as uploaded.

## 💡 Notes

- The site intentionally contains **no photo gallery and no image placeholders** — every visual (the cupcake, gifts, cake, garlands, balloons) is drawn with CSS and SVG shapes so it looks complete and polished with zero setup.
- Everything respects `prefers-reduced-motion` for visitors who prefer calmer animations.
- Tested to avoid horizontal overflow and layout breakage across phone, tablet, and desktop widths, in both portrait and landscape.

---

Made with love, for Sriparna. 💖
