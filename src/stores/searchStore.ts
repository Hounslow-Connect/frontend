import { observable, action } from 'mobx';
import axios from 'axios';
import get from 'lodash/get';
import partition from 'lodash/partition';

import { apiBase } from '../config/api';
import { ICategory, IPersona, IFilters } from '../types/types';

class SearchStore {
  @observable location: string = '';
  @observable search: string = '';
  @observable categories: ICategory[] = [];
  @observable personas: IPersona[] = [];
  @observable categoryId: string = '';
  @observable covidCategories: ICategory[] = [];

  @observable filters: IFilters = {
    age: ''
  };

  constructor() {
    this.getCategories();
    this.getPersonas();
  }

  @action
  setFilter = (filter: string, input: string) => {
    // @ts-ignore
    this.filters[filter] = input;
  };

  @action
  handleInput = (filter: string, input: string) => {
    console.log('[searchStore] --> handleInput filter:', filter, 'input: ', input);
    
    // @ts-ignore
    this.filters[field] = input;
  };

  @action clear = () => {
    this.location = '';
    this.search = '';
    this.categoryId = '';
  };

  @action clearFilters = () => {
    console.log('[searchStore] --> clearFilters()');
    
    this.filters = {
      age: null
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
