import { observable, action } from 'mobx';
import { apiBase } from '../../config/api';
import { IconName } from '@fortawesome/fontawesome-svg-core';

export interface ICategory {
  name: string;
  id: string;
  icon: IconName;
}

class SearchStore {
  @observable search: string = '';
  @observable categories: ICategory[] = [];

  constructor() {
    this.getCategories();
  }

  fetchCategories = async () => {
    try {
      const data = await fetch(`${apiBase}/collections/categories?page=1`);
      return data.json();
    } catch (e) {
      console.error(e);
    }
  };

  @action
  getCategories = async () => {
    const { data } = await this.fetchCategories();
    this.categories = data;
  };

  @action onChange = (text: string) => {
    this.search = text;
  };
}

export default new SearchStore();
