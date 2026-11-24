// A still-animated backdrop: twin suns over dunes by day, a starfield and a
// distant Death Star by night. The scene picks its layer from the system's
// light/dark setting.

function stars(): string {
  let s = 7
  const rand = () => {
    s = (s * 16807) % 2147483647

    return s / 2147483647
  }
  let out = ''

  for (let i = 0; i < 90; i++) {
    const x = Math.round(rand() * 1600)
    const y = Math.round(rand() * 760)
    const r = (0.6 + rand() * 1.4).toFixed(1)
    const delay = (rand() * 6).toFixed(1)
    const dur = (3 + rand() * 4).toFixed(1)

    out += `<circle class="st" cx="${x}" cy="${y}" r="${r}" fill="#e8ecf4" style="animation-delay:${delay}s;animation-duration:${dur}s"/>`
  }

  return out
}

export const SCENE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
<style>
.l{display:block}.d{display:none}
@media (prefers-color-scheme: dark){.l{display:none}.d{display:block}}
.st{opacity:.25;animation:tw 4s ease-in-out infinite}
@keyframes tw{0%,100%{opacity:.15}50%{opacity:.9}}
.sun{animation:glow 9s ease-in-out infinite}
@keyframes glow{0%,100%{opacity:.85}50%{opacity:1}}
</style>
<g class="l">
<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9d2a0"/><stop offset="1" stop-color="#f3e6c6"/></linearGradient></defs>
<rect width="1600" height="900" fill="url(#sky)"/>
<g class="sun"><circle cx="1400" cy="610" r="95" fill="#f6b955"/><circle cx="1230" cy="660" r="60" fill="#ee9a4d"/></g>
<path d="M0 760 Q220 700 460 750 T920 745 T1380 735 T1600 750 L1600 900 L0 900Z" fill="#d9bf8a" opacity=".55"/>
<path d="M0 820 Q300 770 640 815 T1250 810 T1600 800 L1600 900 L0 900Z" fill="#c9a96f" opacity=".5"/>
</g>
<g class="d">
<rect width="1600" height="900" fill="#0b0d12"/>
${stars()}
<g><circle cx="1380" cy="560" r="110" fill="#2a3142"/><path d="M1270 560 H1490" stroke="#0b0d12" stroke-width="6"/><circle cx="1420" cy="520" r="24" fill="#12151c"/><circle cx="1420" cy="520" r="9" fill="#7a2a2e"/></g>
</g>
</svg>`
