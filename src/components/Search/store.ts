import { observable, action } from 'mobx';
import axios from 'axios';
import get from 'lodash/get';

import { apiBase } from '../../config/api';
import { ICategory, IPersona } from '../../types/types';

class SearchStore {
  @observable search: string = '';
  @observable categories: ICategory[] = [];
  @observable personas: IPersona[] = [];
  @observable categoryId: string = '';

  constructor() {
    this.getCategories();
    this.getPersonas();
  }

  @action setCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.categoryId = e.target.value;
  };

  @action
  getCategories = async () => {
    try {
      const categories = await axios.get(`${apiBase}/collections/categories?page=1`);
      this.categories = get(categories, 'data.data', []);
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
