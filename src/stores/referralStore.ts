import { observable, action, computed } from 'mobx';
import axios from 'axios';
import get from 'lodash/get';
import orderBy from 'lodash/orderBy';

import { apiBase } from '../config/api';
import { IService, IPartnerOrganistion } from '../types/types';

interface IReferral {
  name: string;
  email: string;
  phone: string;
  other_contact: null | string;
  referral_consented: boolean;
  feedback_consented: boolean;
  comments: null | string;
  postcode_outward_code: null;
  referee_name: null | string;
  referee_email: null | string;
  referee_phone: null | string;
  organisation: null | string;
  organisation_taxonomy_id: null | string | undefined;
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
    referee_name: null,
    referee_email: null,
    referee_phone: null,
    organisation: null,
    organisation_taxonomy_id: null,
  };
  @observable showConfirmation: boolean = false;
  @observable partnerOrganisations: IPartnerOrganistion[] = [];

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
      referee_name: null,
      referee_email: null,
      referee_phone: null,
      organisation: null,
      organisation_taxonomy_id: null,
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
  getPartnerOrganisations = async () => {
    try {
      const organisationData = await axios.get(`${apiBase}/taxonomies/organisations`);
      this.partnerOrganisations = get(organisationData, 'data.data');
    } catch (e) {
      console.error(e);
    }
  };

  @action
  submitReferral = async () => {
    if (this.service) {
      const params = {
        service_id: this.service.id,
        ...this.referral,
      };

      if (this.whoFor === 'A friend or family member') {
        params.organisation_taxonomy_id = process.env.REACT_APP_FRIENDS_FAMILY_TAXONOMY;
      }

      try {
        const referral = await axios.post(`${apiBase}/referrals`, {
          ...params,
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
    window.scrollTo(0, 0);
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
        return '<strong>Next step - </strong>Enter your contact information';
      case 6:
        return '<strong>Next step - </strong>Terms and Conditions';
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

  partnerOrganisationLabels = () => {
    const orderedList = orderBy(this.partnerOrganisations, 'name', 'asc');

    const filteredList = orderedList.filter(org => org.name !== 'Family/Friend');

    return filteredList.map(org => ({
      value: org.id,
      text: org.name,
    }));
  };
}

export default ReferralStore;
