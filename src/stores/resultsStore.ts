import { observable, action, computed } from 'mobx';
import forEach from 'lodash/forEach';
import get from 'lodash/get';
import size from 'lodash/size';
import axios from 'axios';
import queryString from 'query-string';

import { apiBase } from '../config/api';
import {
  IParams,
  ICategory,
  IPersona,
  IOrganisation,
  IService,
  IGeoLocation,
  IEligibilityFilters,
} from '../types/types';

import { queryRegex, querySeparator } from '../utils/utils';

export default class ResultsStore {
  @observable keyword: string = '';
  @observable distance: string = '';
  @observable categoryId: string = '';
  @observable category: ICategory | null = null;
  @observable personaId: string = '';
  @observable persona: IPersona | null = null;
  @observable organisations: IOrganisation[] | null = [];
  @observable is_free: boolean = false;
  @observable open_now: boolean = false;
  @observable wait_time: string = 'null';
  @observable order: 'relevance' | 'distance' = 'relevance';
  @observable results: IService[] = [];
  @observable loading: boolean = false;
  @observable currentPage: number = 1;
  @observable totalItems: number = 0;
  @observable itemsPerPage: number = 9;
  @observable postcode: string = '';
  @observable locationCoords: IGeoLocation | {} = {};
  @observable view: 'grid' | 'map' = 'grid';
  serviceEligibilityOptions: [] = [];
  @observable queryParams: IParams = {};

  @observable filters: IEligibilityFilters = {
    age: null,
    income: null,
    disability: null,
    language: null,
    gender: null,
    ethnicity: null,
    housing: null
  };

  constructor() {
    this.getServiceEligibilities();
  }

  @computed
  get isKeywordSearch() {
    return !this.keyword;
  }

  @action
  getServiceEligibilities = async () => {
    try {
      const data = await axios.get(`${apiBase}/taxonomies/service-eligibilities`);
      this.serviceEligibilityOptions = get(data, 'data.data', []);
    } catch (e) {
      console.error(e);
    }
  };

  @action
  setPostcode = async (input: string) => {
    console.log('[setPostcode input:', input);
    
    // @ts-ignore
    if (input !== '' && input !== this.postcode) {
      this.postcode = input;
      await this.geolocate();
      return
    }

    this.postcode = input;
  };

  @action
  setDistance = (input: string) => {
    // @ts-ignore
    this.distance = input;
  };

  @action
  setKeyword = (input: string) => {
    // @ts-ignore
    this.keyword = input;
  };

  /**
   * Handles Input from search filters (onChange method)
   */
  @action
  handleInput = (filter: string, input: string) => {
    console.log('[searchStore] --> handleInput filter:', filter, 'input: ', input);
    
    // @ts-ignore
    this.filters[filter] = input;
  };

  // @action
  // getSearchQueryString = () => {
  //   console.log('[getSearchQueryString] --> filters query string=', this.getFiltersQueryString());
  //   let filtersQuery = this.getFiltersQueryString()

  //   return this.getFiltersQueryString()
  // }


  // @action
  // getFiltersQueryString = () => {
    
  //   let filters:any = this.filters
  //   let queryString = null
    
  //   let queryParams = Object.keys(filters)
  //   .map((key) => { 
  //     return (filters[key] ? `${key}=${filters[key]}`  : null ) 
  //   })

  //   queryString = `${queryParams.filter(filter => filter !== null).join('&')}`;
  //   return queryString
  // }

  @action
  getQueryParamsString = () => {
    let params: any = this.queryParams
    let queryString = null

    let queryParams = Object.keys(params)
    .map((key) => { 
      return (params[key] && key !== 'location' ? `${key}=${params[key]}` : null ) 
    })

    queryString = `${queryParams.filter(filter => filter !== null).join('&')}`;

    console.log('[getQueryParamsString] --> ', queryString);
    
    return queryString
  }


  @action clearFilters = () => {
    console.log('[searchStore] --> clearFilters()');
    
    this.filters = {
      age: null,
      income: null,
      disability: null,
      language: null,
      gender: null,
      ethnicity: null,
      housing: null
    };
  };

  @action
  clear() {
    this.keyword = '';
    this.distance = '';
    this.categoryId = '';
    this.category = null;
    this.personaId = '';
    this.persona = null;
    this.is_free = false;
    this.open_now = false;
    this.wait_time = 'null';
    this.order = 'relevance';
    this.results = [];
    this.loading = false;
    this.organisations = [];
    this.currentPage = 1;
    this.totalItems = 0;
    this.itemsPerPage = 9;
    this.postcode = '';
    this.locationCoords = {};
    this.view = 'grid';

    this.clearFilters()
  }

  @action
  getCategory = async () => {
    console.log('[%c [getCategory] -->', 'color: red;');

    try {
      const category = await axios.get(`${apiBase}/collections/categories/${this.categoryId}`);
      this.category = get(category, 'data.data', '');
    } catch (e) {
      console.error(e);
    }
  };

  @action
  getPersona = async () => {
    console.log('[%c [getPersona] -->', 'color: red;');
    
    try {
      const persona = await axios.get(`${apiBase}/collections/personas/${this.personaId}`);
      this.persona = get(persona, 'data.data', '');
    } catch (e) {
      console.error(e);
    }
  };


  /**
   * Gets search terms from url query. Runs on component mount and update
   */
  getSearchTerms = () => {
    console.log('[getSearchTerms] -->');
    
    const searchTerms = queryString.parse(window.location.search);

    this.setSearchTerms(searchTerms);
  };


  /**
   * Updates the store with the pased in query params 
   * @param searchTerms 
   */
  @action
  setSearchTerms = async (searchTerms: { [key: string]: any }) => {
    console.log('[setSearchTerms] -->');
    forEach(searchTerms, (key, value) => {
      if (value === 'category') {
        this.categoryId = key;
      }

      if (value === 'persona') {
        this.personaId = key;
      }

      if (value === 'search_term') {
        this.keyword = key;
      }

      if (value === 'is_free') {
        this.is_free = key === 'true' ? true : false;
      }

      if (value === 'open_now') {
        this.open_now = key === 'true' ? true : false;
      }

      if (value === 'wait_time') {
        this.wait_time = key;
      }

      if (value === 'page') {
        this.currentPage = Number(key);
      }

      if (value === 'postcode') {
        this.postcode = key;
      }
      
      if (value === 'distance') {
        this.distance = key;
      }

      // set filter params
      if (value === 'age') {
        this.filters.age = key;
      }
      if (value === 'income') {
        this.filters.income = key;
      }
      if (value === 'disability') {
        this.filters.disability = key;
      }
      if (value === 'language') {
        this.filters.language = key;
      }
      if (value === 'gender') {
        this.filters.gender = key;
      }
      if (value === 'ethnicity') {
        this.filters.ethnicity = key;
      }
    });

    if (this.categoryId) {
      await this.getCategory();
    }

    if (this.personaId) {
      await this.getPersona();
    }

    if (this.postcode) {
      await this.geolocate();
    }

    this.setParams();
  };

  setParams = async () => {
    console.log('[setParams] -->');
    
    const params: IParams = {};

    if (this.category) {
      params.category = get(this.category, 'name');
    }

    if (this.persona) {
      params.persona = get(this.persona, 'name');
    }

    if (this.is_free) {
      params.is_free = this.is_free;
    }

    if (this.open_now) {
      params.open_now = this.open_now;
    }

    if (this.wait_time !== 'null') {
      params.wait_time = this.wait_time;
    }

    if (this.keyword) {
      params.query = this.keyword;
    }

    if (this.postcode) {
      params.postcode = this.postcode;
    }

    if (this.distance) {
      params.distance = this.distance;
    }

    if (this.filters.age) {
      params.age = this.filters.age;
    }
    if (this.filters.income) {
      params.income = this.filters.income;
    }
    if (this.filters.disability) {
      params.disability = this.filters.disability;
    }
    if (this.filters.language) {
      params.language = this.filters.language;
    }
    if (this.filters.gender) {
      params.gender = this.filters.gender;
    }
    if (this.filters.ethnicity) {
      params.ethnicity = this.filters.ethnicity;
    }

    if (size(this.locationCoords)) {
      params.location = this.locationCoords;
    }

    params.order = this.order;
    
    this.queryParams = params

    await this.fetchResults();
  };

  /**
   * Triggered when form inputs change 
   */
  // @action
  // handleFormChange = async () => {
  //   console.log('[resultsStore] --> handleFormChange() -->');
  //   this.setParams()
  // }

  @action
  fetchResults = async () => {
    console.log('[fetchResults] --> params: ', this.queryParams);
    
    this.loading = true;
    try {
      const results = await axios.post(`${apiBase}/search?page=${this.currentPage}&per_page=${this.itemsPerPage}`, this.queryParams);
      this.results = get(results, 'data.data', []);
      this.totalItems = get(results, 'data.meta.total', 0);

      forEach(this.results, (service: IService) => {
        // @ts-ignore
        this.organisations.push(service.organisation_id);
      });

      this.getOrganisations();
    } catch (e) {
      console.error(e);
      this.loading = false;
    }
  };

  @action
  getOrganisations = async () => {
    const organisations = await axios.get(
      `${apiBase}/organisations?filter[id]=${this.organisations}`
    );
    this.organisations = get(organisations, 'data.data', []);
    this.loading = false;
  };

  @action
  toggleIsFree = () => {
    this.is_free = !this.is_free;
  };

  @action
  toggleOpenNow = () => {
    this.open_now = !this.open_now;
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
    this.results = [];
    this.loading = true;
  };

  @action
  postcodeChange = (postcode: string) => {
    this.postcode = postcode.replace(' ', '');
  };


  // Legacy?
  // amendSearch = (searchTerm?: string) => {
  //   let url = window.location.search;

  //   if (this.postcode) {
  //     url = this.updateQueryStringParameter('location', this.postcode);
  //   }

  //   if (!this.postcode) {
  //     url = this.removeQueryStringParameter('location', url);
  //     this.locationCoords = {};
  //   }

  //   if (this.is_free) {
  //     url = this.updateQueryStringParameter('is_free', this.is_free, url);
  //   }

  //   if (!this.is_free) {
  //     url = this.removeQueryStringParameter('is_free', url);
  //   }

  //   if (this.open_now) {
  //     url = this.updateQueryStringParameter('open_now', this.open_now, url);
  //   }

  //   if (!this.open_now) {
  //     url = this.removeQueryStringParameter('open_now', url);
  //   }

  //   if (searchTerm) {
  //     url = this.updateQueryStringParameter('search_term', searchTerm, url);
  //   }

  //   this.results = [];
  //   return url;
  // };

  @action
  geolocate = async () => {
    try {
      const geolocation = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${this.postcode},UK&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
      );

      const location = get(geolocation, 'data.results[0].geometry.location', {});
      console.log('[geolocate] --> new location: ', location);
      this.locationCoords = {
        lon: location.lng,
        lat: location.lat,
      };
    } catch (e) {
      console.error('[geolocate] --> error getting new location: ', e);
    }
  };

  // @action
  // handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   this.keyword = e.target.value;
  // };

  @action
  toggleView = (view: 'map' | 'grid') => {
    this.view = view;
  };

  @action
  orderResults = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.order = e.target.value as 'relevance' | 'distance';
    this.results = [];

    this.setParams();
  };

  @computed
  get serviceWithLocations() {
    const locations = this.results.filter(service => service.service_locations.length);

    const totalLocations = locations.reduce((total, location) => {
      total += location.service_locations.length;
      return total;
    }, 0);

    return totalLocations;
  }
}
