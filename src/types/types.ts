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
  order?: 'distance' | 'relevance';
  query?: string;
  location?: IGeoLocation | {};
}

export interface ICategory {
  id: string;
  intro: string;
  name: string;
  icon: IconName | undefined;
}

export interface IOrganisation {
  created_at: string;
  description: string;
  email: string;
  has_logo: boolean;
  id: string;
  name: string;
  phone: string;
  slug: string;
  updated_at: string;
  url: string;
}

export interface IService {
  contact_email: string;
  contact_name: string;
  contact_phone: string;
  created_at: string;
  description: string;
  fees_text: null | string;
  fees_url: null | string;
  gallery_items: [];
  has_logo: boolean;
  id: string;
  intro: string;
  is_free: boolean;
  last_modified_at: string;
  name: string;
  offerings: [];
  organisation_id: string;
  referral_button_text: null | string;
  referral_email: null | string;
  referral_method: string;
  referral_url: null | string;
  service_locations: [];
  show_referral_disclaimer: boolean;
  slug: string;
  social_medias: [];
  status: string;
  testimonial: null | string;
  type: string;
  updated_at: string;
  url: string;
  useful_infos: [];
  video_embed: null | string;
  wait_time: null | string;
}

export interface IServiceLocation {
  created_at: string;
  has_image: boolean;
  holiday_opening_hours: [];
  id: string;
  is_open_now: boolean;
  location: ILocation;
  location_id: string;
  name: null | string;
  regular_opening_hours: [];
  service_id: string;
  updated_at: string;
}

export interface ILocation {
  accessibility_info: null | string;
  address_line_1: string;
  address_line_2: string;
  address_line_3: string;
  city: string;
  country: string;
  county: string;
  created_at: string;
  has_image: boolean;
  has_induction_loop: boolean;
  has_wheelchair_access: boolean;
  id: string;
  lat: number;
  lon: number;
  postcode: string;
  updated_at: string;
}

export interface IGeoLocation {
  lon: string;
  lat: string;
}
