import { observable, action } from 'mobx';
import axios from 'axios';
import moment from 'moment';
import forEach from 'lodash/forEach';
import get from 'lodash/get';
import size from 'lodash/size';
import map from 'lodash/map';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import isEmpty from 'lodash/isEmpty';
import queryString from 'query-string';

import { apiBase } from '../config/api';
import { IParams, IGeoLocation, IOrganisation } from '../types/types';
import { queryRegex, querySeparator } from '../utils/utils';
import { IEvent } from '../components/EventSummary/IEvent';

const PER_PAGE = 9;
class EventStore {
  @observable eventsHomePage: any[] = [];
  @observable event: IEvent | undefined = undefined;
  @observable eventList: IEvent[] = [];
  @observable eventListNone: boolean = false;
  @observable numberOfPages: number = 0;
  @observable eventCategories: any[] = [];
  @observable distance: string = '';
  @observable category: string | null = null;
  @observable order: 'relevance' | 'distance' = 'relevance';
  @observable loading: boolean = false;
  @observable currentPage: number = 1;
  @observable totalItems: number = 0;
  @observable itemsPerPage: number = 9;
  @observable postcode: string = '';
  @observable locationCoords: IGeoLocation | {} = {};
  @observable queryParams: IParams = {};
  @observable eventCategoryOptions: Array<{ value: string; text: string }> = [];
  @observable eventListItems = [];
  @observable is_free: boolean = false;
  @observable is_virtual: boolean = false;
  @observable has_wheelchair_access: boolean = false;
  @observable has_induction_loop: boolean = false;
  @observable starts_after: string = '';
  @observable ends_before: string = '';
  @observable organisation: IOrganisation | null = null;
  @observable organisationId: string = '';

  @action
  fetchEventsHomePage = async () => {
    try {
      const todaysDate = moment().format(moment.HTML5_FMT.DATE);
      const response = await axios.get(
        `${apiBase}/organisation-events?filter[starts_after]=${todaysDate}`
      );
      const eventsHomePage = get(response, 'data.data');
      const eventsHomePageList = eventsHomePage.filter((item: IEvent) => item.homepage);
      this.eventsHomePage = eventsHomePageList;
    } catch (err) {
      console.error({ err });
      return false;
    }
  };

  @action
  fetchEvents = async (page = 1) => {
    this.loading = true;
    try {
      const response = await axios.post(
        `${apiBase}/search/events?page=${page}&per_page=${this.itemsPerPage}`,
        this.getPostParams()
      );
      this.eventList = get(response, 'data.data', []);
      // we have to differentiate between no results after filtering and
      // on the initial fetch from the server when we have no events at all.
      const noParamsSetViaUi = isEmpty(omit(this.getPostParams(), ['order']));
      this.eventListNone = noParamsSetViaUi && this.eventList.length === 0;

      this.totalItems = get(response, 'data.meta.total', 0);
      this.numberOfPages = Math.ceil(this.totalItems / PER_PAGE);
      this.loading = false;
    } catch (e) {
      this.eventList = [];
      console.error(e);
      this.loading = false;
    }
  };

  @action
  fetchEvent = async (uuid: string) => {
    this.loading = true;
    const eventData = await axios.get(`${apiBase}/organisation-events/${uuid}`);
    this.event = get(eventData, 'data.data');
    if (this.event?.organisation_id) {
      this.organisationId = this.event?.organisation_id;
      await this.getOrganisation();
    }
  };

  @action
  getOrganisation = async () => {
    try {
      const organisation = await axios.get(`${apiBase}/organisations/${this.organisationId}`);
      this.organisation = get(organisation, 'data.data', '');
    } catch (e) {
      // @ts-ignore
    }
  };

  @action
  getEventCategories = async () => {
    try {
      const data = await axios.get(`${apiBase}/collections/organisation-events`);
      const getData = get(data, 'data.data', []);
      const getValues = map(getData, obj => pick(obj, ['name']));
      this.eventCategoryOptions = getValues.map(({ name: text }) => ({ value: text, text }));
    } catch (e) {
      console.error(e);
    }
  };

  /** Form onChange actions */
  @action
  setPostcode = async (input: string) => {
    if (input !== '' && input !== this.postcode) {
      this.postcode = input;
      await this.geolocate();
      return;
    }

    if (input === '') {
      this.locationCoords = {};
    }
    this.postcode = input || '';
  };

  @action
  setDistance = (input: string) => {
    this.distance = input;
  };

  @action
  setCategory = (input: string) => {
    if (input === 'Show all events') {
      return (this.category = '');
    }
    this.category = input;
  };

  @action
  setStartDate = (input: string) => {
    this.starts_after = input;
  };

  @action
  setEndDate = (input: string) => {
    this.ends_before = input;
  };

  @action
  getQueryParamsString = () => {
    const params: any = this.queryParams;

    let queryParamsString = null;

    const queryParams = Object.keys(params).map(key => {
      return params[key] ? `${key}=${params[key]}` : null;
    });

    queryParamsString = `${queryParams.filter(filter => filter !== null).join('&')}`;
    return queryParamsString;
  };

  /**
   * Gets search terms from url query. Runs on component mount and update
   */
  getSearchTerms = () => {
    const searchTerms = queryString.parse(window.location.search);
    this.setSearchTerms(searchTerms);
  };

  /**
   * Updates the store with the pased in query params
   * @param searchTerms
   */
  @action
  setSearchTerms = async (searchTerms: { [key: string]: any }) => {
    forEach(searchTerms, (key, value) => {
      if (value === 'postcode') {
        this.postcode = key;
      }

      if (value === 'distance') {
        this.distance = key;
      }

      if (value === 'category') {
        this.category = key;
      }

      if (value === 'starts_after') {
        this.starts_after = key;
      }

      if (value === 'ends_before') {
        this.ends_before = key;
      }

      if (value === 'is_free') {
        this.is_free = key === 'true' ? true : false;
      }

      if (value === 'is_virtual') {
        this.is_virtual = key === 'true' ? true : false;
      }

      if (value === 'has_wheelchair_access') {
        this.has_wheelchair_access = key === 'true' ? true : false;
      }

      if (value === 'has_induction_loop') {
        this.has_induction_loop = key === 'true' ? true : false;
      }
    });

    if (this.postcode) {
      await this.geolocate();
    }

    this.setParams(true);
  };

  setParams = async (search = false) => {
    const params: IParams = {};

    if (this.category) {
      params.category = this.category;
    }

    if (this.postcode) {
      params.postcode = this.postcode;

      if (!this.distance) {
        this.setDistance('3');
      }
    } else {
      if (this.distance) {
        this.setDistance('');
      }
    }

    if (this.distance) {
      params.distance = this.distance;
    }

    if (this.starts_after) {
      params.starts_after = this.starts_after;
    }

    if (this.ends_before) {
      params.ends_before = this.ends_before;
    }

    if (this.is_free) {
      params.is_free = this.is_free;
    }

    if (this.is_virtual) {
      params.is_virtual = this.is_virtual;
    }

    if (this.has_wheelchair_access) {
      params.has_wheelchair_access = this.has_wheelchair_access;
    }

    if (this.has_induction_loop) {
      params.has_induction_loop = this.has_induction_loop;
    }

    params.order = this.order;

    this.queryParams = params;

    if (search) {
      await this.fetchEvents();
    }
  };

  getPostParams = () => {
    const params: IParams = {};

    if (this.category) {
      params.category = this.category;
    }

    if (this.postcode) {
      params.postcode = this.postcode;
    }

    if (this.distance) {
      params.distance = this.distance;
    }

    if (this.starts_after) {
      params.starts_after = this.starts_after;
    }

    if (this.ends_before) {
      params.ends_before = this.ends_before;
    }

    if (this.is_free) {
      params.is_free = this.is_free;
    }

    if (this.is_virtual) {
      params.is_virtual = this.is_virtual;
    }

    if (this.has_wheelchair_access) {
      params.has_wheelchair_access = this.has_wheelchair_access;
    }

    if (this.has_induction_loop) {
      params.has_induction_loop = this.has_induction_loop;
    }

    if (size(this.locationCoords)) {
      params.location = this.locationCoords;
    }

    params.order = this.order;

    return params;
  };

  updateQueryStringParameter = (
    key: string,
    value: string | boolean | number,
    query: string = window.location.search
  ) => {
    const re = queryRegex(key);
    const separator = querySeparator(query);

    if (query.match(re)) {
      return query.replace(re, `$1${key}=${value}$2`);
    } else {
      return `${query}${separator}${key}=${value}`;
    }
  };

  removeQueryStringParameter = (key: string, query: string = window.location.search) => {
    const re = queryRegex(key);

    if (query.match(re)) {
      return query.replace(re, '$2');
    }

    return query;
  };

  @action
  paginate = (page: number) => {
    this.currentPage = page;
    this.eventList = [];
    this.loading = true;
  };

  @action
  postcodeChange = (postcode: string) => {
    this.postcode = postcode.replace(' ', '');
  };

  @action
  geolocate = async () => {
    try {
      const geolocation = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${this.postcode},UK&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
      );

      const location = get(geolocation, 'data.results[0].geometry.location', {});

      if (location && get(geolocation, 'data.results[0]')) {
        this.locationCoords = {
          lon: location.lng,
          lat: location.lat,
        };
      }
    } catch (e) {
      console.error('[geoLocate] error: ', e);
    }
  };

  @action
  toggleIsFree = () => {
    this.is_free = !this.is_free;
  };

  @action
  toggleIsVirtual = () => {
    this.is_virtual = !this.is_virtual;
  };

  @action
  toggleHasWheelchair = () => {
    this.has_wheelchair_access = !this.has_wheelchair_access;
  };

  @action
  toggleHasInduction = () => {
    this.has_induction_loop = !this.has_induction_loop;
  };
}

export default EventStore;
