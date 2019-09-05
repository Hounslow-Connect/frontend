import { observable, action } from 'mobx';
import forEach from 'lodash/forEach';
import get from 'lodash/get';
import axios from 'axios';

import { apiBase } from '../config/api';
import { IParams } from '../types/types';

class ResultsStore {
  @observable categoryId: string = '';
  @observable category: string = '';
  @observable personaId: string = '';
  @observable persona: string = '';
  @observable is_free: boolean | null = null;
  @observable wait_time: string = 'null';
  @observable order: 'relevance' | 'location' = 'relevance';
  @observable results: [] = [];

  @action
  getCategory = async () => {
    try {
      const category = await axios.get(`${apiBase}/collections/categories/${this.categoryId}`);
      this.category = get(category, 'data.data.name', '');
    } catch (e) {
      console.error(e);
    }
  };

  @action
  getPersona = async () => {
    try {
      const persona = await axios.get(`${apiBase}/collections/personas/${this.personaId}`);
      this.persona = get(persona, 'data.data.name', '');
    } catch (e) {
      console.error(e);
    }
  };

  @action
  setSearchTerms = async (searchTerms: { [key: string]: any }) => {
    forEach(searchTerms, (key, value) => {
      if (value === 'category') {
        this.categoryId = key;
      }

      if (value === 'persona ') {
        this.personaId = key;
      }

      if (value === 'is_free') {
        this.is_free = key === 'true' ? true : false;
      }

      if (value === 'wait_time') {
        this.wait_time = key;
      }
    });

    if (this.categoryId) {
      await this.getCategory();
    }

    if (this.personaId) {
      await this.getPersona();
    }

    this.setParams();
  };

  setParams = async () => {
    const params: IParams = {};

    if (this.category) {
      params.category = this.category;
    }

    if (this.persona) {
      params.persona = this.persona;
    }

    if (this.is_free) {
      params.is_free = this.is_free;
    }

    if (this.wait_time !== 'null') {
      params.wait_time = this.wait_time;
    }

    params.order = this.order;

    await this.fetchResults(params);
  };

  @action
  fetchResults = async (params: IParams) => {
    try {
      const results = await axios.post(`${apiBase}/search?page=1`, params);
      this.results = get(results, 'data.data');
    } catch (e) {
      console.error(e);
    }
  };
}

export default new ResultsStore();
