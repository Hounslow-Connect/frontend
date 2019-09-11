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
  IResults,
  IGeoLocation,
} from '../types/types';

import { queryRegex, querySeparator } from '../utils/utils';

export default class ResultsStore {
  @observable keyword: string = '';
  @observable categoryId: string = '';
  @observable category: ICategory | null = null;
  @observable personaId: string = '';
  @observable persona: IPersona | null = null;
  @observable organisations: IOrganisation[] | null = [];
  @observable is_free: boolean = false;
  @observable wait_time: string = 'null';
  @observable order: 'relevance' | 'distance' = 'relevance';
  @observable results: IResults[] = [];
  @observable loading: boolean = false;
  @observable currentPage: number = 1;
  @observable totalItems: number = 0;
  @observable itemsPerPage: number = 25;
  @observable postcode: string = '';
  @observable locationCoords: IGeoLocation | {} = {};
  @observable view: 'grid' | 'map' = 'map';

  @computed
  get isKeywordSearch() {
    return !!this.keyword;
  }

  @action
  clear() {
    this.keyword = '';
    this.categoryId = '';
    this.category = null;
    this.personaId = '';
    this.persona = null;
    this.is_free = false;
    this.wait_time = 'null';
    this.order = 'relevance';
    this.results = [];
    this.loading = false;
    this.organisations = [];
    this.currentPage = 1;
    this.totalItems = 0;
    this.itemsPerPage = 25;
    this.postcode = '';
    this.locationCoords = {};
    this.view = 'grid';
  }

  @action
  getCategory = async () => {
    try {
      const category = await axios.get(`${apiBase}/collections/categories/${this.categoryId}`);
      this.category = get(category, 'data.data', '');
    } catch (e) {
      console.error(e);
    }
  };

  @action
  getPersona = async () => {
    try {
      const persona = await axios.get(`${apiBase}/collections/personas/${this.personaId}`);
      this.persona = get(persona, 'data.data', '');
    } catch (e) {
      console.error(e);
    }
  };

  getSearchTerms = () => {
    const searchTerms = queryString.parse(window.location.search);

    this.setSearchTerms(searchTerms);
  };

  @action
  setSearchTerms = async (searchTerms: { [key: string]: any }) => {
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

      if (value === 'wait_time') {
        this.wait_time = key;
      }

      if (value === 'page') {
        this.currentPage = Number(key);
      }

      if (value === 'location') {
        this.postcode = key;
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

    if (this.wait_time !== 'null') {
      params.wait_time = this.wait_time;
    }

    if (this.keyword) {
      params.query = this.keyword;
    }

    if (size(this.locationCoords)) {
      params.location = this.locationCoords;
    }

    params.order = this.order;

    await this.fetchResults(params);
  };

  @action
  fetchResults = async (params: IParams) => {
    this.loading = true;
    try {
      const results = await axios.post(`${apiBase}/search?page=${this.currentPage}`, params);
      this.results = get(results, 'data.data', []);
      this.totalItems = get(results, 'data.meta.total', 0);
      this.itemsPerPage = get(results, 'data.meta.per_page', 25);

      forEach(this.results, (service: IResults) => {
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
  };

  @action
  postcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.postcode = e.target.value.replace(' ', '');
  };

  amendSearch = () => {
    let url = window.location.search;

    if (this.postcode) {
      url = this.updateQueryStringParameter('location', this.postcode);
    }

    if (!this.postcode) {
      url = this.removeQueryStringParameter('location', url);
      this.locationCoords = {};
    }

    if (this.is_free) {
      url = this.updateQueryStringParameter('is_free', this.is_free, url);
    }

    if (!this.is_free) {
      url = this.removeQueryStringParameter('is_free', url);
    }

    this.results = [];
    return url;
  };

  @action
  geolocate = async () => {
    try {
      const geolocation = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${this.postcode}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
      );

      const location = get(geolocation, 'data.results[0].geometry.location', {});

      this.locationCoords = {
        lon: location.lng,
        lat: location.lat,
      };
    } catch (e) {
      console.error(e);
    }
  };

  @action
  handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.keyword = e.target.value;
  };

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
}
