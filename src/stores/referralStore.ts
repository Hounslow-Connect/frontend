import { observable, action } from 'mobx';
import axios from 'axios';
import { apiBase } from '../config/api';
import { IService } from '../types/types';
import get from 'lodash/get';

class ReferralStore {
  @observable service: IService | null = null;

  @action
  getServiceInfo = async (id: string) => {
    try {
      const serviceData = await axios.get(`${apiBase}/services/${id}`);
      this.service = get(serviceData, 'data.data');
    } catch (e) {
      console.error(e);
    }
  };
}

export default ReferralStore;
