import type { ReactNode } from 'react';
import type { WebListingItem } from './Landing.types';

function rng(seed: string): () => number {
  let a = [...String(seed)].reduce((h, c) => ((h * 31 + c.charCodeAt(0)) >>> 0), 7);
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const SKY = [
  ['#DCE4FC', '#F5F8F8'],
  ['#CBEBE9', '#F5F8F8'],
  ['#FFEBB8', '#FFF7E1'],
  ['#EBF1F1', '#FFFFFF'],
];

export function carShape(color: string): string {
  return `<path d="M52 205C52 195 58 190 70 188L100 182C110 160 125 148 150 146L245 146C268 147 285 160 298 180L335 186C348 189 352 196 352 206L352 222L52 222Z" fill="${color}"/>
  <path d="M122 180C128 162 138 154 152 153L196 153L196 180Z M206 153L244 153C260 154 272 165 282 180L206 180Z" fill="#F5F8F8" opacity=".88"/>
  <rect x="338" y="196" width="14" height="7" rx="3" fill="#FFE08A"/>
  <circle cx="110" cy="224" r="26" fill="#142123"/><circle cx="110" cy="224" r="11" fill="#BECBCC"/>
  <circle cx="294" cy="224" r="26" fill="#142123"/><circle cx="294" cy="224" r="11" fill="#BECBCC"/>`;
}

export function renderArtSvg(item: WebListingItem, variant = 0): string {
  const r = rng(item.id + variant);
  const sky = SKY[Math.floor(r() * SKY.length)];
  const gid = 'g' + item.id + variant + Math.floor(r() * 1e5);
  let body = '';

  if (item.cat === 'car') {
    const xs = variant ? [-20, 30, 0][variant % 3] : 0;
    body = `<rect y="238" width="400" height="62" fill="#142123" opacity=".1"/><ellipse cx="200" cy="246" rx="165" ry="9" fill="#142123" opacity=".18"/><g transform="translate(${xs} 6)">${carShape(item.color)}</g>`;
  } else {
    const cols = ['#0A6360', '#2640A0', '#9C5E00', '#506466', '#0B7A75'];
    const main = cols[Math.floor(r() * cols.length)];
    let b = `<rect y="250" width="400" height="50" fill="#142123" opacity=".1"/>`;
    for (let i = 0; i < 4; i++) {
      const w = 40 + r() * 30;
      const h = 70 + r() * 90;
      const x = i < 2 ? 10 + i * 52 : 300 + (i - 2) * 50;
      b += `<rect x="${x}" y="${250 - h}" width="${w}" height="${h}" fill="${main}" opacity=".28"/>`;
    }
    const fl = Math.min(8, Math.max(3, item.floors || 4));
    const bw = 170;
    const bx = 115;
    const bh = fl * 28 + 14;
    b += `<rect x="${bx}" y="${250 - bh}" width="${bw}" height="${bh}" rx="4" fill="${main}"/>`;
    for (let f = 0; f < fl; f++) {
      for (let c = 0; c < 4; c++) {
        const lit = r() > 0.35;
        b += `<rect x="${bx + 14 + c * 40}" y="${250 - bh + 14 + f * 28}" width="26" height="16" rx="2" fill="${lit ? '#FFE08A' : '#F5F8F8'}" opacity="${lit ? 1 : 0.8}"/>`;
      }
    }
    if (item.feats && item.feats.includes('balcony')) {
      b += `<rect x="${bx + 10}" y="${250 - bh + 10 + Math.min(2, fl - 1) * 28}" width="156" height="3" fill="#fff" opacity=".7"/>`;
    }
    b += `<rect x="${bx + bw / 2 - 12}" y="228" width="24" height="22" rx="3" fill="#FFB627"/><circle cx="62" cy="228" r="20" fill="#2FA7A1"/><rect x="60" y="238" width="4" height="12" fill="#093A39"/><circle cx="352" cy="232" r="16" fill="#62C2BD"/>`;
    body = b;
  }

  return `<svg class="art" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${item.cat === 'car' ? 'Car preview illustration' : 'Property preview illustration'}"><defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky[0]}"/><stop offset="1" stop-color="${sky[1]}"/></linearGradient></defs><rect width="400" height="300" fill="url(#${gid})"/>${body}</svg>`;
}

const HERO_CAR_COLORS = ['#4766DB', '#DC2626', '#10B981', '#F59E0B', '#8B5CF6'];

export function renderSkylineSvg(carIndex = 0): string {
  const r = rng('skyline');
  let far = '';
  let near = '';
  let win = '';
  for (let x = -20; x < 1460; ) {
    const w = 34 + r() * 44;
    const h = 50 + r() * 100;
    far += `<rect x="${x}" y="${215 - h}" width="${w}" height="${h}" fill="#108F8A" opacity=".5"/>`;
    x += w + 4;
  }
  for (let x = -10; x < 1460; ) {
    const w = 40 + r() * 56;
    const h = 70 + r() * 120;
    near += `<rect x="${x}" y="${215 - h}" width="${w}" height="${h}" fill="#093A39"/>`;
    for (let yy = 215 - h + 10; yy < 205; yy += 16) {
      for (let xx = x + 7; xx < x + w - 12; xx += 14) {
        if (r() > 0.62) {
          win += `<rect x="${xx}" y="${yy}" width="7" height="8" rx="1" fill="#FFC952" opacity="${0.55 + r() * 0.4}"/>`;
        }
      }
    }
    x += w + 6;
  }
  let dashes = '';
  for (let x = 0; x < 1460; x += 70) {
    dashes += `<rect x="${x}" y="238" width="36" height="4" rx="2" fill="#FFC952" opacity=".85"/>`;
  }
  const color = HERO_CAR_COLORS[Math.abs(carIndex) % HERO_CAR_COLORS.length];
  return `<svg class="hero-art-yad" viewBox="0 0 1440 260" preserveAspectRatio="xMidYMax slice" aria-hidden="true"><circle cx="1130" cy="104" r="50" fill="#FFB627"/>${far}${near}${win}<rect y="215" width="1440" height="45" fill="#062726"/>${dashes}<g class="hero-car-yad"><g transform="translate(940 118) scale(.52)">${carShape(color)}</g></g></svg>`;
}

export function SvgIcon({ name, className = '' }: { name: string; className?: string }): ReactNode {
  const icons: Record<string, ReactNode> = {
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </>
    ),
    heart: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />,
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c1-4 4-6 8-6s7 2 8 6" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
    pin: (
      <>
        <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" />
        <circle cx="12" cy="9.5" r="2.5" />
      </>
    ),
    bed: (
      <>
        <path d="M3 18V7M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5" />
        <circle cx="7" cy="11" r="1.5" />
      </>
    ),
    size: (
      <>
        <path d="M4 4h16v16H4z" />
        <path d="M4 10h6V4" />
      </>
    ),
    floor: (
      <>
        <path d="m12 3 9 5-9 5-9-5 9-5z" />
        <path d="m3 13 9 5 9-5" />
      </>
    ),
    car: (
      <>
        <path d="M4 15v-3l2-5h12l2 5v3" />
        <path d="M4 15h16v3H4z" />
        <path d="M6 18v2M18 18v2M4 12h16" />
      </>
    ),
    home: (
      <>
        <path d="M4 11 12 4l8 7v9H4z" />
        <path d="M10 20v-6h4v6" />
      </>
    ),
    gauge: (
      <>
        <path d="M4 17a8 8 0 1 1 16 0" />
        <path d="m12 17 4-5" />
      </>
    ),
    fuel: (
      <>
        <path d="M5 20V5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v15M3 20h13" />
        <path d="M14 9h2a2 2 0 0 1 2 2v5a1.5 1.5 0 0 0 3 0V8l-3-3" />
      </>
    ),
    check: <path d="m5 12 5 5L20 7" />,
    x: <path d="M6 6l12 12M18 6 6 18" />,
    phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A15 15 0 0 1 4 5a1 1 0 0 1 1-1z" />,
    chat: <path d="M4 5h16v11H9l-5 4z" />,
    share: (
      <>
        <circle cx="6" cy="12" r="2.5" />
        <circle cx="18" cy="6" r="2.5" />
        <circle cx="18" cy="18" r="2.5" />
        <path d="m8.2 10.8 7.6-3.6M8.2 13.2l7.6 3.6" />
      </>
    ),
    chev: <path d="m15 6-6 6 6 6" />,
    filter: <path d="M4 6h16M7 12h10M10 18h4" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    sparkle: (
      <>
        <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
        <path d="M19 17v4M17 19h4" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    info: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5M12 8h.01" />
      </>
    ),
    alert: (
      <>
        <path d="M12 4 3 20h18z" />
        <path d="M12 10v4M12 17h.01" />
      </>
    ),
    parking: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="M10 16V8h3a2.5 2.5 0 0 1 0 5h-3" />
      </>
    ),
    elevator: (
      <>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="m9 10 3-3 3 3M9 14l3 3 3-3" />
      </>
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" />
      </>
    ),
    moon: (
      <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8A9.006 9.006 0 0 0 12 3z" />
    ),
    device: (
      <>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </>
    ),
    logout: (
      <>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </>
    ),
    image: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="9" cy="10" r="1.8" />
        <path d="m21 16-5-5-8 8" />
      </>
    ),
    arrow: <path d="M19 12H5M11 6l-6 6 6 6" />,
    whatsapp: (
      <path d="M17.5 6.5A7.8 7.8 0 0 0 12 4.2a7.8 7.8 0 0 0-6.8 11.6L4 20l4.3-1.1a7.8 7.8 0 0 0 3.7 1h.01a7.8 7.8 0 0 0 7.8-7.8c0-2.1-.8-4-2.3-5.6zm-5.5 12.3h-.01a6.5 6.5 0 0 1-3.3-.9l-.2-.1-2.5.7.7-2.4-.2-.3a6.5 6.5 0 1 1 12 2.8 6.5 6.5 0 0 1-6.5-.8z" />
    ),
    telegram: (
      <path d="m21.5 4.5-19 7.3c-.6.2-.6.7 0 .9l4.9 1.5 1.7 5.2c.2.5.4.5.7.3l2.5-2.4 5.2 3.8c1 .5 1.6.3 1.9-.8l3.1-14.8c.4-1.5-.5-2.1-1-1zM8.3 14l-.4 3.2 8.7-7.8-10.4 6.7z" />
    ),
    map: (
      <>
        <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
        <line x1="9" y1="3" x2="9" y2="18" />
        <line x1="15" y1="6" x2="15" y2="21" />
      </>
    ),
    view360: (
      <>
        <ellipse cx="12" cy="12" rx="9" ry="5" />
        <circle cx="12" cy="12" r="2" />
        <path d="M12 3v4M12 17v4" />
      </>
    ),
    location: (
      <>
        <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </>
    ),
  };

  return (
    <svg className={`ico-svg ${className}`} viewBox="0 0 24 24" aria-hidden="true">
      {icons[name] || null}
    </svg>
  );
}
