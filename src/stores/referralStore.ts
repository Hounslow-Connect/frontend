import { observable, action, computed } from 'mobx';
import axios from 'axios';
import { apiBase } from '../config/api';
import { IService } from '../types/types';
import get from 'lodash/get';

interface IReferral {
  name: string;
  email: string;
  phone: string;
  other_contact: null | string;
}
class ReferralStore {
  @observable service: IService | null = null;
  @observable step: number = 1;
  @observable whoFor: 'Myself' | 'A friend or family member' | 'Someone else' | null = null;
  @observable referral: IReferral = {
    name: '',
    email: '',
    phone: '',
    other_contact: null,
  };

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
        return '<strong>First step - </strong>Who would you like to be connected?';
      case 2:
        return '<strong>First step - </strong>Who would you like to be connected?';
      case 3:
        return `<strong>Next step - </strong>Enter ${
          this.whoFor === 'Myself' ? 'your' : 'their'
        } contact information`;
      case 4:
        return `<strong>Next step - </strong>${
          this.whoFor === 'Myself' ? 'Terms and conditions' : 'Your name'
        }`;

      default:
        return '';
    }
  }

  @computed
  get totalSteps() {
    return this.whoFor === 'Myself' ? 3 : 5;
  }

  @action
  handleInput = (field: string, input: string) => {
    // @ts-ignore
    this.referral[field] = input;
  };
}

export default ReferralStore;
