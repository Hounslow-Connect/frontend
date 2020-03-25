import { observable, action } from 'mobx';
import axios from 'axios';
import get from 'lodash/get';
import partition from 'lodash/partition';

import { apiBase } from '../../config/api';
import { ICategory, IPersona } from '../../types/types';

class SearchStore {
  @observable search: string = '';
  @observable categories: ICategory[] = [];
  @observable personas: IPersona[] = [];
  @observable categoryId: string = '';
  @observable covidCategories: ICategory[] = [];

  constructor() {
    this.getCategories();
    this.getPersonas();
  }

  @action clear = () => {
    this.search = '';
    this.categoryId = '';
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

  @action onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.search = e.target.value;
  };
}

export default new SearchStore();
