import { IconName } from '@fortawesome/fontawesome-svg-core';

export interface IPersona {
  created_at: string;
  id: string;
  intro: string;
  name: string;
  sideboxes: ISidebox[];
  subtitle: string;
  updated_at: string;
}

export interface IParams {
  category?: string;
  persona?: string;
  is_free?: boolean;
  open_now?: boolean;
  wait_time?: string;
  order?: 'distance' | 'relevance';
  query?: string;
  postcode?: string;
  location?: IGeoLocation | {};
  distance?: null | string;
  age?: null | string;
  income?: null | string;
  disability?: null | string;
  language?: null | string;
  gender?: null | string;
  ethnicity?: null | string;
  housing?: null | string;
  eligibilities?: [];
}

export interface ICategory {
  id: string;
  intro: string;
  name: string;
  icon: IconName | undefined;
  sideboxes: ISidebox[];
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
  social_medias: [];
}

export interface IService {
  contact_email: string;
  contact_name: string;
  contact_phone: string;
  eligibility_types: IEligibility;
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
  organisation?: IOrganisation;
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
export interface IServiceTaxonomy {
  id: string;
  parent_id: string;
  name: string;
  order: number;
  children: [];
  created_at: string;
  updated_at: string;
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

export interface IOpeningHour {
  closes_at: string;
  frequency: string;
  opens_at: string;
  weekday: number;
  day_of_month: number;
  occurrence_of_month: number;
  starts_at: string;
}

export interface IHolidayTimes {
  closes_at: string;
  ends_at: string;
  is_closed: boolean;
  opens_at: string;
  starts_at: string;
}

export interface IPartnerOrganistion {
  id: string;
  name: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface ISidebox {
  content: string;
  title: string;
}

export interface ICriteria {
  age_group: string;
  disability: string;
  employment: string;
  gender: string;
  housing: string;
  income: string;
  language: string;
  other: string;
}
export interface IEligibility {
  custom: {
    age_group: string;
    disability: string;
    ethnicity: string;
    gender: string;
    income: string;
    language: string;
    other: string;
  };
  taxonomies: [];
}

export interface IBanner {
  title: string;
  content: string;
  button_text: string;
  button_url: string;
  has_image: true;
}

export interface IEligibilityFilters {
  age: null | string;
  income: null | string;
  disability: null | string;
  language: null | string;
  gender: null | string;
  ethnicity: null | string;
  housing: null | string;
}

export enum Events {
  SET_TITLE = 'set_title',
}
