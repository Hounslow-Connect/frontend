import { IServiceLocation } from '../types/types';
import get from 'lodash/get';

export const queryRegex = (key: string) => new RegExp('([?&])' + key + '=.*?(&|$)', 'i');

export const querySeparator = (query: string) => (query.includes('?') ? '&' : '?');

export const getLocationName = (locations: []) =>
  locations.map((location: IServiceLocation) =>
    location.name ? location.name : get(location, 'location.address_line_1', '')
  );
