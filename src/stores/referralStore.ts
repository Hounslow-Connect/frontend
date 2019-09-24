import { observable, action, computed } from 'mobx';
import axios from 'axios';
import { apiBase } from '../config/api';
import { IService } from '../types/types';
import get from 'lodash/get';

class ReferralStore {
  @observable service: IService | null = null;
  @observable step: number = 1;
  @observable whoFor: 'Myself' | 'A friend or family member' | 'Someone else' | null = null;

  @action
  getServiceInfo = async (id: string) => {
    try {
      const serviceData = await axios.get(`${apiBase}/services/${id}`);
      this.service = get(serviceData, 'data.data');
    } catch (e) {
      console.error(e);
    }
  };

  @action
  nextStep = () => {
    this.step = this.step + 1;
  };

  @action
  setWhoFor = (who: 'Myself' | 'A friend or family member' | 'Someone else') => {
    this.whoFor = who;
  };

  @computed
  get stepDescription() {
    switch (this.step) {
      case 1:
        return '<strong>First step - </strong> Who would you like to be connected?';
      case 2:
        return '<strong>First step - </strong> Who would you like to be connected?';
      default:
        return '';
    }
  }
}

export default ReferralStore;
