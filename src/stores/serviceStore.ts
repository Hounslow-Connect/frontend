import { observable, action } from 'mobx';
import axios from 'axios';
import { apiBase } from '../config/api';
import get from 'lodash/get';

export default class ServiceStore {
  @observable service: any = '';

  @action
  fetchService = async (name: string) => {
    const serviceData = await axios.get(`${apiBase}/services/${name}`);
    this.service = get(serviceData, 'data.data');
  };
}
