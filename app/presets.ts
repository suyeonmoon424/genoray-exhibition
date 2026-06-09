import { Preset } from './types';

export const PRESETS: Preset[] = [
  {
    label: 'CDA 2026',
    name: 'CDA 2026',
    loc: 'Anaheim / United States',
    venue: 'Anaheim Convention Center',
    date: 'May 14-16, 2026',
    hall: '',
    booth: '1046',
    color: '#FFC107',
    venue_key: 'anaheim',
  },
  {
    label: 'DENTEX 2026',
    name: 'DENTEX 2026',
    loc: 'Seoul / Korea',
    venue: 'Coex Exhibition Center',
    date: 'Jan. 11, 2026',
    hall: 'Hall D (3F)',
    booth: 'B13',
    color: '#00BFFF',
    venue_key: 'coex',
    tag: "Come and discover Genoray's advanced products",
  },
  {
    label: 'ECR 2026',
    name: 'ECR 2026',
    loc: 'Vienna / Austria',
    venue: 'Austria Center Vienna',
    date: 'Mar. 4-8, 2026',
    hall: '',
    booth: '306',
    color: '#FFC107',
    venue_key: 'austria_vienna',
  },
  {
    label: 'ITEM 2026',
    name: 'ITEM 2026',
    loc: 'Yokohama / Japan',
    venue: 'Pacifico Yokohama',
    date: 'Apr. 17-19, 2026',
    hall: '',
    booth: 'C4-03',
    color: '#00BFFF',
    venue_key: 'pacifico',
  },
  {
    label: 'SIDEX 2026',
    name: 'SIDEX 2026',
    loc: 'Seoul / Korea',
    venue: 'Coex Exhibition Center',
    date: 'May. 29-31, 2026',
    hall: 'Hall D (3F)',
    booth: 'D125~128',
    color: '#00BFFF',
    venue_key: 'coex',
  },
];

export const VENUE_BG_MAP: Record<string, string> = {
  coex: '/bg/bg_coex.jpg',
  anaheim: '/bg/bg_anaheim.jpg',
  austria_vienna: '/bg/bg_vienna.jpg',
  pacifico: '/bg/bg_yokohama.jpg',
};

export const COLOR_PRESETS = [
  { label: 'Amber', value: '#FFC107' },
  { label: 'Cyan', value: '#00BFFF' },
  { label: 'White', value: '#FFFFFF' },
];
