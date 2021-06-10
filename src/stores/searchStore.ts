import { observable, action } from 'mobx';
import axios from 'axios';
import get from 'lodash/get';
import partition from 'lodash/partition';

import { apiBase } from '../config/api';
import { ICategory, IPersona, IEligibilityFilters } from '../types/types';

class SearchStore {
  @observable keyword: string = '';
  @observable location: string = '';
  @observable search: string = '';
  @observable categories: ICategory[] = [];
  @observable personas: IPersona[] = [];
  @observable categoryId: string = '';
  @observable covidCategories: ICategory[] = [];
  serviceEligibilityOptions: [] = [];

  @observable filters: IEligibilityFilters = {
    age: null,
    income: null,
    disability: null,
    language: null,
    gender: null,
    ethnicity: null
  };

  constructor() {
    this.getCategories();
    this.getPersonas();
    this.getServiceEligibilities();
  }

  @action
  setKeyword = (input: string) => {
    // @ts-ignore
    this.keyword = input;
  };

  @action
  setLocation = (input: string) => {
    // @ts-ignore
    this.location = input;
  };

  @action
  handleInput = (filter: string, input: string) => {
    console.log('[searchStore] --> handleInput filter:', filter, 'input: ', input);
    
    // @ts-ignore
    this.filters[filter] = input;
  };

  @action
  updateUrlParams = () => {
    
    let filters:any = this.filters
    let queryString = `search_term=${this.keyword}&`


    console.log('filters', filters);
    
    // let queryUrl = `results?`
    let queryParams = Object.keys(filters)
    .map((key) => { 
      console.log('map() key=', key, ', filters[key]=', filters[key]);
      
      return (filters[key] ? `${key}=${filters[key]}`  : null ) 
    })

    queryString = `${queryString}${queryParams.filter(filter => filter !== null).join('&')}` ;

    
    console.log('[SearchStore] --> [updateUrlParams] --> queryString=', queryString);

			// if(this.state.keyword) {
			// 	queryUrl += `search_term=${this.state.keyword}&`
			// }

			// if(SearchStore.filters.age) {
			// 	queryUrl += `keywords=${SearchStore.filters.age}&`
			// }

			// if(SearchStore.filters.location) {
			// 	queryUrl += `postcode=${SearchStore.filters.location}&`
			// }
			// if(SearchStore.filters.daysOfWeek) {
			// 	queryUrl += `daysOfWeek=${SearchStore.filters.daysOfWeek}&`
			// }
			// if(SearchStore.filters.types) {
			// 	queryUrl += `activityTypes=${SearchStore.filters.types}&`
			// }
			// if(SearchStore.filters.bookableOnlineOnly) {
			// 	queryUrl += `bookableOnly=${SearchStore.filters.bookableOnlineOnly}&`
			// }
			// if(SearchStore.filters.participants) {
			// 	queryUrl += `participants=${SearchStore.filters.participants}&`
			// }
			// if(SearchStore.filters.medium) {
			// 	queryUrl += `medium=${SearchStore.filters.medium}&`
			// }

			// if(queryUrl.charAt(queryUrl.length-1) === '&') {
			// 	queryUrl = queryUrl.substring(0, queryUrl.length - 1)
			// }
  }

  @action clear = () => {
    this.location = '';
    this.search = '';
    this.categoryId = '';
  };

  @action clearFilters = () => {
    console.log('[searchStore] --> clearFilters()');
    
    this.filters = {
      age: null,
      income: null,
      disability: null,
      language: null,
      gender: null,
      ethnicity: null
    };
  };

  @action setCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.categoryId = e.target.value;
  };

  @action
  getCategories = async () => {
    try {
      const categories = await axios.get(`${apiBase}/collections/categories?page=1`);
      const categoryList = get(categories, 'data.data', []);

      // temp addition for COVID-19
      const [covidCategories, normalCategories] = partition(categoryList, category =>
        category.name.includes('COVID-19:')
      );

      // sanitize category names by removing keyword for sorting
      covidCategories.forEach(category => (category.name = category.name.replace('COVID-19:', '')));

      this.categories = normalCategories;
      this.covidCategories = covidCategories;
    } catch (e) {
      console.error(e);
    }
  };

  @action
  getPersonas = async () => {
    try {
      const personas = await axios.get(`${apiBase}/collections/personas`);
      this.personas = get(personas, 'data.data', []);
    } catch (e) {
      console.error(e);
    }
  };

  @action
  getServiceEligibilities = async () => {
    try {
      const data = await axios.get(`${apiBase}/taxonomies/service-eligibilities`);
      this.serviceEligibilityOptions = get(data, 'data.data', []);
    } catch (e) {
      console.error(e);
    }
  };

  @action onChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    if(type === 'location') {
      this.location = e.target.value;
    }
    
    if(type === 'search') {
      this.search = e.target.value;
    }
  };
}

export default new SearchStore();
