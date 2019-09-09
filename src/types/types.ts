import { IconName } from '@fortawesome/fontawesome-svg-core';

export interface IPersona {
  created_at: string;
  id: string;
  intro: string;
  name: string;
  sideboxes: [];
  subtitle: string;
  updated_at: string;
}

export interface IParams {
  category?: string;
  persona?: string;
  is_free?: boolean;
  wait_time?: string;
  order?: 'location' | 'relevance';
}

export interface ICategory {
  id: string;
  intro: string;
  name: string;
  icon: IconName | undefined;
}
