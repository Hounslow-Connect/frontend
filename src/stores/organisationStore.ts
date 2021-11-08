import { observable, action, computed } from 'mobx';
import axios from 'axios';
import { apiBase } from '../config/api';
import get from 'lodash/get';
import { IOrganisation, IService } from '../types/types';

export default class OrganisationStore {
  @observable organisation: IOrganisation | null = null;
  @observable associatedServices: IService[] | null = null;
  @observable loading: boolean = false;

  @computed
  get hasSocials() {
    return this.organisation && this.organisation.social_medias.length ? true : false;
  }

  /**
   * Get organisation using the passed in organisation slug
   * @param name
   */
  @action
  fetchOrganisation = async (name: string) => {
    this.loading = true;
    try {
      const organisationData = await axios.get(`${apiBase}/organisations/${name}`);
      this.organisation = get(organisationData, 'data.data');

      if (this.organisation && this.organisation.id) {
        this.fetchAssociatedServices(this.organisation.id);
      } else {
        this.loading = false;
      }
    } catch (error) {
      this.loading = false;
    }
  };

  /**
   * Get associated services using the organisation id
   * @param id string
   */
  @action
  fetchAssociatedServices = async (id: string) => {
    if (!id) {
      return;
    }

    try {
      const servicesData = await axios.post(
        `${apiBase}/services/index?filter[organisation_id]=${id}`
      );
      this.associatedServices = get(servicesData, 'data.data');
      this.loading = false;
    } catch (error) {
      this.loading = false;
    }
  };
}
