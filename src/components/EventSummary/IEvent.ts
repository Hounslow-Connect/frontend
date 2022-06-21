
export interface ILocation {
  accessibility_info: string | null;
  address_line_1: string;
  address_line_2: string | null;
  address_line_3: string | null;
  city: string;
  country: string;
  county: string;
  created_at: string;
  has_accessible_toilet: boolean;
  has_image: boolean;
  has_induction_loop: boolean;
  has_wheelchair_access: boolean;
  id: string;
  lat: number;
  lon: number;
  postcode: string;
  updated_at: string;
}

export interface ICategoryTaxonomy {
  created_at: string;
  id: string;
  name: string;
  parent_id: string;
  updated_at: string;
}

export interface IEvent {
  apple_calendar_link?: string;
  booking_cta?: string;
  booking_summary?: string;
  booking_title?: string;
  booking_url?: string;
  category_taxonomies: ICategoryTaxonomy[];
  created_at?: string;
  description?: string;
  end_date?: string;
  end_time?: string;
  fees_text?: string | null;
  fees_url?: string | null;
  google_calendar_link?: string;
  has_image?: boolean;
  homepage: boolean;
  id: string;
  intro: string;
  is_free: boolean;
  is_virtual: boolean;
  location?: ILocation;
  location_id?: string;
  microsoft_calendar_link?: string;
  organisation_id?: string;
  organiser_email?: string | null;
  organiser_name?: string | null;
  organiser_phone?: string | null;
  organiser_url?: string | null;
  start_date: string;
  start_time: string;
  title: string;
  updated_at?: string;
}