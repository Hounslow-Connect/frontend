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
  referral_consented: boolean;
  feedback_consented: boolean;
  comments: null | string;
  postcode_outward_code: null;
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
    referral_consented: false,
    feedback_consented: false,
    comments: null,
    postcode_outward_code: null,
  };
  @observable showConfirmation: boolean = false;

  @action
  clear = () => {
    this.service = null;
    this.step = 1;
    this.whoFor = null;
    this.referral = {
      name: '',
      email: '',
      phone: '',
      other_contact: null,
      referral_consented: false,
      feedback_consented: false,
      comments: null,
      postcode_outward_code: null,
    };
    this.showConfirmation = false;
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
  submitReferral = async () => {
    if (this.service) {
      try {
        const referral = await axios.post(`${apiBase}/referrals`, {
          service_id: this.service.id,
          ...this.referral,
        });

        if (referral.data) {
          this.showConfirmation = true;
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  @action
  nextStep = () => {
    this.step = this.step + 1;
  };

  @action
  goBackStep = () => {
    this.step = this.step - 1;
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
      case 5:
        if (this.whoFor === 'Myself') {
          return '<strong>Next step - </strong>Confirmation and what’s next';
        }
        return '';
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

  @action
  toggleConsent = () => {
    this.referral.referral_consented = !this.referral.referral_consented;
    this.referral.feedback_consented = !this.referral.feedback_consented;
  };
}

export default ReferralStore;
