export type OutputFormat = 'both' | 'insta' | 'popup';

export interface ExhibitionData {
  name: string;
  location: string;
  venue: string;
  date: string;
  hall: string;
  booth: string;
  boothColor: string;
  tagline: string;
  venueKey: string;
  outputFormat: OutputFormat;
}

export interface Preset {
  label: string;
  name: string;
  loc: string;
  venue: string;
  date: string;
  hall: string;
  booth: string;
  color: string;
  venue_key: string;
  tag?: string;
}
