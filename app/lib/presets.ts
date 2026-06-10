export const LOGO_ENTITIES = ['GENORAY', 'GAI', 'GEG', 'GJ', 'GK', 'GS', 'GT'] as const;
export type LogoEntity = typeof LOGO_ENTITIES[number];

export function getCanvasLogoSrc(entity: string): string {
  if (entity === 'GENORAY') return '/logos/GENORAY_logo_symbol.svg';
  return `/logos/GENORAY_${entity}_logo_H.svg`;
}

export function getEmailLogoSrc(entity: string): string {
  if (entity === 'GENORAY') return '/logos/GENORAY_logo.svg';
  return `/logos/GENORAY_${entity}_logo_V.svg`;
}

export type ExhibitionData = {
  exhibitionName: string;
  year: string;
  location: string;
  venue: string;
  date: string;
  hall: string;
  booth: string;
  color: string;
  venueKey: string;
};

export const VENUE_BG: Record<string, string> = {
  // Korea — Seoul COEX
  kr_seoul_coex_01: '/bg/bg_kr_seoul_coex_01.png',
  kr_seoul_coex_02: '/bg/bg_kr_seoul_coex_02.png',
  // Korea — Seoul
  kr_seoul_01: '/bg/bg_kr_seoul_01.png',
  kr_seoul_02: '/bg/bg_kr_seoul_02.png',
  kr_seoul_03: '/bg/bg_kr_seoul_03.png',
  // Korea — Incheon Songdo Convensia
  'kr_incheon_songdo-convensia_01': '/bg/bg_kr_incheon_songdo-convensia_01.png',
  'kr_incheon_songdo-convensia_02': '/bg/bg_kr_incheon_songdo-convensia_02.png',
  // Austria — Vienna
  at_vienna_01: '/bg/bg_at_vienna_01.png',
  at_vienna_02: '/bg/bg_at_vienna_02.png',
  at_vienna_03: '/bg/bg_at_vienna_03.png',
  // Austria — Vienna ACV
  at_vienna_acv_01: '/bg/bg_at_vienna_acv_01.png',
  // China — Shanghai
  cn_shanghai_01: '/bg/bg_cn_shanghai_01.png',
  cn_shanghai_02: '/bg/bg_cn_shanghai_02.png',
  // Germany — Berlin
  de_berlin: '/bg/bg_de_berlin.png',
  // Germany — Cologne
  de_cologne_01: '/bg/bg_de_cologne_01.png',
  de_cologne_02: '/bg/bg_de_cologne_02.png',
  // Germany — Düsseldorf
  de_dusseldorf_01: '/bg/bg_de_dusseldorf_01.png',
  de_dusseldorf_02: '/bg/bg_de_dusseldorf_02.png',
  // Germany — Düsseldorf Messe
  de_dusseldorf_messe_01: '/bg/bg_de_dusseldorf_messe_01.png',
  // Germany — Essen
  de_essen: '/bg/bg_de_essen.png',
  // France — Paris
  fr_paris_01: '/bg/bg_fr_paris_01.png',
  fr_paris_02: '/bg/bg_fr_paris_02.png',
  // Japan — Nagoya Fukiage
  jp_nagoya_fukiage_01: '/bg/bg_jp_nagoya_fukiage_01.png',
  // Japan — Yokohama Pacifico
  jp_yokohama_pacifico_01: '/bg/bg_jp_yokohama_pacifico_01.png',
  jp_yokohama_pacifico_02: '/bg/bg_jp_yokohama_pacifico_02.png',
  jp_yokohama_pacifico_03: '/bg/bg_jp_yokohama_pacifico_03.png',
  // Turkey — Antalya Belek
  tr_antalya_belek_01: '/bg/bg_tr_antalya_belek_01.png',
  // Turkey — Istanbul
  tr_istanbul_01: '/bg/bg_tr_istanbul_01.png',
  // UAE — Dubai
  uae_dubai_01: '/bg/bg_uae_dubai_01.png',
  uae_dubai_02: '/bg/bg_uae_dubai_02.png',
  uae_dubai_03: '/bg/bg_uae_dubai_03.png',
  uae_dubai_04: '/bg/bg_uae_dubai_04.png',
  // UAE — Dubai DEC
  uae_dubai_dec_01: '/bg/bg_uae_dubai_dec_01.png',
  // UAE — Dubai DWTC
  uae_dubai_dwtc_01: '/bg/bg_uae_dubai_dwtc_01.png',
  // US — Anaheim
  us_anaheim_01: '/bg/bg_us_anaheim_01.png',
  // US — Anaheim ACC
  us_anaheim_acc_01: '/bg/bg_us_anaheim_acc_01.png',
  us_anaheim_acc_02: '/bg/bg_us_anaheim_acc_02.png',
  us_anaheim_acc_03: '/bg/bg_us_anaheim_acc_03.png',
  // US — Chicago
  us_chicago_01: '/bg/bg_us_chicago_01.png',
  us_chicago_02: '/bg/bg_us_chicago_02.png',
  // US — Chicago McCormick
  us_chicago_mccormick_01: '/bg/bg_us_chicago_mccormick_01.png',
};

export const COLOR_PRESETS = [
  { label: 'Amber',       value: '#FFC107' },
  { label: 'Lime',        value: '#AAEB3A' },
  { label: 'Light Green', value: '#6FCA4E' },
  { label: 'Dark Green',  value: '#0A6E2A' },
  { label: 'Mint',        value: '#2DD4BF' },
  { label: 'Cyan',        value: '#00BFFF' },
  { label: 'Blue',        value: '#0EA5E9' },
];

export type VenueGroup = { group: string; items: { label: string; value: string }[] };

export const VENUE_OPTIONS: VenueGroup[] = [
  { group: 'KR — Seoul COEX', items: [
    { label: 'COEX Exterior 1', value: 'kr_seoul_coex_01' },
    { label: 'COEX Exterior 2', value: 'kr_seoul_coex_02' },
  ]},
  { group: 'KR — Seoul', items: [
    { label: 'Seoul 1', value: 'kr_seoul_01' },
    { label: 'Seoul 2', value: 'kr_seoul_02' },
    { label: 'Seoul 3', value: 'kr_seoul_03' },
  ]},
  { group: 'KR — Incheon Songdo Convensia', items: [
    { label: 'Songdo Convensia 1', value: 'kr_incheon_songdo-convensia_01' },
    { label: 'Songdo Convensia 2', value: 'kr_incheon_songdo-convensia_02' },
  ]},
  { group: 'AT — Vienna', items: [
    { label: 'Vienna 1', value: 'at_vienna_01' },
    { label: 'Vienna 2', value: 'at_vienna_02' },
    { label: 'Vienna 3', value: 'at_vienna_03' },
  ]},
  { group: 'AT — Austria Center Vienna', items: [
    { label: 'Austria Center Vienna', value: 'at_vienna_acv_01' },
  ]},
  { group: 'CN — Shanghai', items: [
    { label: 'Shanghai 1', value: 'cn_shanghai_01' },
    { label: 'Shanghai 2', value: 'cn_shanghai_02' },
  ]},
  { group: 'DE — Berlin', items: [
    { label: 'Berlin', value: 'de_berlin' },
  ]},
  { group: 'DE — Cologne', items: [
    { label: 'Cologne 1', value: 'de_cologne_01' },
    { label: 'Cologne 2', value: 'de_cologne_02' },
  ]},
  { group: 'DE — Düsseldorf', items: [
    { label: 'Düsseldorf 1', value: 'de_dusseldorf_01' },
    { label: 'Düsseldorf 2', value: 'de_dusseldorf_02' },
  ]},
  { group: 'DE — Düsseldorf Messe', items: [
    { label: 'Düsseldorf Messe', value: 'de_dusseldorf_messe_01' },
  ]},
  { group: 'DE — Essen', items: [
    { label: 'Essen', value: 'de_essen' },
  ]},
  { group: 'FR — Paris', items: [
    { label: 'Paris 1', value: 'fr_paris_01' },
    { label: 'Paris 2', value: 'fr_paris_02' },
  ]},
  { group: 'JP — Nagoya Fukiage', items: [
    { label: 'Nagoya Fukiage', value: 'jp_nagoya_fukiage_01' },
  ]},
  { group: 'JP — Yokohama Pacifico', items: [
    { label: 'Yokohama Pacifico 1', value: 'jp_yokohama_pacifico_01' },
    { label: 'Yokohama Pacifico 2', value: 'jp_yokohama_pacifico_02' },
    { label: 'Yokohama Pacifico 3', value: 'jp_yokohama_pacifico_03' },
  ]},
  { group: 'TR — Antalya Belek', items: [
    { label: 'Antalya Belek', value: 'tr_antalya_belek_01' },
  ]},
  { group: 'TR — Istanbul', items: [
    { label: 'Istanbul', value: 'tr_istanbul_01' },
  ]},
  { group: 'UAE — Dubai', items: [
    { label: 'Dubai 1', value: 'uae_dubai_01' },
    { label: 'Dubai 2', value: 'uae_dubai_02' },
    { label: 'Dubai 3', value: 'uae_dubai_03' },
    { label: 'Dubai 4', value: 'uae_dubai_04' },
  ]},
  { group: 'UAE — Dubai DEC', items: [
    { label: 'Dubai DEC', value: 'uae_dubai_dec_01' },
  ]},
  { group: 'UAE — Dubai DWTC', items: [
    { label: 'Dubai DWTC', value: 'uae_dubai_dwtc_01' },
  ]},
  { group: 'US — Anaheim', items: [
    { label: 'Anaheim 1', value: 'us_anaheim_01' },
  ]},
  { group: 'US — Anaheim ACC', items: [
    { label: 'Anaheim ACC 1', value: 'us_anaheim_acc_01' },
    { label: 'Anaheim ACC 2', value: 'us_anaheim_acc_02' },
    { label: 'Anaheim ACC 3', value: 'us_anaheim_acc_03' },
  ]},
  { group: 'US — Chicago', items: [
    { label: 'Chicago 1', value: 'us_chicago_01' },
    { label: 'Chicago 2', value: 'us_chicago_02' },
  ]},
  { group: 'US — Chicago McCormick', items: [
    { label: 'Chicago McCormick', value: 'us_chicago_mccormick_01' },
  ]},
];

export const PRESETS: Record<string, ExhibitionData> = {
  DENTEX: {
    exhibitionName: 'DENTEX',
    year: '2026',
    location: 'Seoul / Korea',
    venue: 'COEX Hall D (3F)',
    date: 'Jan. 11, 2026',
    hall: 'Hall D (3F)',
    booth: '',
    color: '#00BFFF',
    venueKey: 'kr_seoul_coex_01',

  },
  AEEDC: {
    exhibitionName: 'AEEDC',
    year: '2026',
    location: 'Dubai / UAE',
    venue: 'Dubai World Trade Centre',
    date: '',
    hall: '',
    booth: '',
    color: '#FFC107',
    venueKey: 'uae_dubai_dwtc_01',

  },
  IDS: {
    exhibitionName: 'IDS',
    year: '2027',
    location: 'Cologne / Germany',
    venue: 'Koelnmesse',
    date: 'Mar. 16-20, 2027',
    hall: '',
    booth: '',
    color: '#FFC107',
    venueKey: 'de_cologne_01',

  },
  ECR: {
    exhibitionName: 'ECR',
    year: '2026',
    location: 'Vienna / Austria',
    venue: 'Austria Center Vienna',
    date: 'Mar. 4-8, 2026',
    hall: '',
    booth: '',
    color: '#FFC107',
    venueKey: 'at_vienna_acv_01',

  },
  KIMES: {
    exhibitionName: 'KIMES',
    year: '2026',
    location: 'Seoul / Korea',
    venue: 'COEX',
    date: '',
    hall: '',
    booth: '',
    color: '#00BFFF',
    venueKey: 'kr_seoul_coex_01',

  },
  ITEM: {
    exhibitionName: 'ITEM',
    year: '2026',
    location: 'Yokohama / Japan',
    venue: 'Pacifico Yokohama',
    date: 'Apr. 17-19, 2026',
    hall: '',
    booth: '',
    color: '#00BFFF',
    venueKey: 'jp_yokohama_pacifico_01',

  },
  ExpoMed: {
    exhibitionName: 'ExpoMed Eurasia',
    year: '2026',
    location: 'Istanbul / Türkiye',
    venue: 'TÜYAP Fair and Congress Center',
    date: 'Apr. 16-18, 2026',
    hall: '',
    booth: '',
    color: '#00BFFF',
    venueKey: 'tr_istanbul_01',

  },
  CDA: {
    exhibitionName: 'CDA',
    year: '2026',
    location: 'Anaheim / United States',
    venue: 'Anaheim Convention Center',
    date: 'May 14-16, 2026',
    hall: '',
    booth: '',
    color: '#FFC107',
    venueKey: 'us_anaheim_acc_01',

  },
  SIDEX: {
    exhibitionName: 'SIDEX',
    year: '2026',
    location: 'Seoul / Korea',
    venue: 'Coex Exhibition Center',
    date: 'May. 29-31, 2026',
    hall: 'Hall D (3F)',
    booth: 'D125~128',
    color: '#00BFFF',
    venueKey: 'kr_seoul_coex_01',

  },
  GAMEX: {
    exhibitionName: 'GAMEX',
    year: '2026',
    location: 'Seoul / Korea',
    venue: 'COEX',
    date: '',
    hall: '',
    booth: '',
    color: '#00BFFF',
    venueKey: 'kr_seoul_coex_01',

  },
  MEDICA: {
    exhibitionName: 'MEDICA',
    year: '2026',
    location: 'Düsseldorf / Germany',
    venue: 'Messe Düsseldorf',
    date: '',
    hall: '',
    booth: '',
    color: '#FFC107',
    venueKey: 'de_dusseldorf_messe_01',

  },
  RSNA: {
    exhibitionName: 'RSNA',
    year: '2026',
    location: 'Chicago / United States',
    venue: 'McCormick Place',
    date: '',
    hall: '',
    booth: '',
    color: '#FFC107',
    venueKey: 'us_chicago_mccormick_01',

  },
  KDX: {
    exhibitionName: 'KDX',
    year: '2026',
    location: 'Incheon / Korea',
    venue: 'Songdo Convensia',
    date: '',
    hall: '',
    booth: '',
    color: '#00BFFF',
    venueKey: 'kr_incheon_songdo-convensia_01',

  },
  WHX: {
    exhibitionName: 'WHX Dubai',
    year: '2026',
    location: 'Dubai / UAE',
    venue: 'Dubai Exhibition Centre',
    date: '',
    hall: '',
    booth: '',
    color: '#FFC107',
    venueKey: 'uae_dubai_dec_01',

  },
  CDS: {
    exhibitionName: 'CDS Midwinter',
    year: '2026',
    location: 'Chicago / United States',
    venue: 'McCormick Place',
    date: '',
    hall: '',
    booth: '',
    color: '#FFC107',
    venueKey: 'us_chicago_mccormick_01',

  },
};

export const DEFAULT_DATA: ExhibitionData = {
  exhibitionName: '',
  year: String(new Date().getFullYear()),
  location: '',
  venue: '',
  date: '',
  hall: '',
  booth: '',
  color: '#FFC107',
  venueKey: 'kr_seoul_coex_01',
  tag: '',
};
