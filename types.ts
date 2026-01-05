export enum Page {
  HOME = 'HOME',
  INSTITUTION = 'INSTITUTION',
  VAULT = 'VAULT',
  CONCIERGE = 'CONCIERGE'
}

export interface NavItem {
  label: string;
  page: Page;
}

export interface Artifact {
  id: string;
  title: string;
  collection: string;
  image: string;
  description: string;
}
