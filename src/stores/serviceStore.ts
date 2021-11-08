import { observable, action, computed } from 'mobx';
import axios from 'axios';
import { apiBase } from '../config/api';
import get from 'lodash/get';
import every from 'lodash/every';
import { IService, IServiceLocation, IOrganisation, IServiceTaxonomy } from '../types/types';

export default class ServiceStore {
  @observable service: IService | null = null;
  @observable organisation: IOrganisation | null = null;
  @observable locations: IServiceLocation[] = [];
  @observable loading: boolean = false;
  @observable relatedServices: IService[] | null = null;
  @observable favourite: boolean = false;
  @observable organisationId: string = '';
  @observable serviceEligibilityTaxonomies: IServiceTaxonomy[] | null = null;

  checkIfFavorited = () => {
    const favourites = localStorage.getItem('favourites');

    if (favourites && this.service) {
      const favouriteList = JSON.parse(favourites);

      this.favourite = favouriteList.includes(this.service.id);
    }
  };

  @computed
  get hasCriteria() {
    if (this.service) {
      return (this.service.eligibility_types &&
        this.service.eligibility_types.taxonomies &&
        this.service.eligibility_types.taxonomies.length) ||
        !every(this.service.eligibility_types.custom, criteria => criteria === null)
        ? true
        : false;
    }

    return false;
  }

  @action
  fetchService = async (name: string) => {
    this.loading = true;
    const serviceData = await axios.get(`${apiBase}/services/${name}?include=organisation`);
    this.service = get(serviceData, 'data.data');

    if (this.service?.organisation_id) {
      this.organisationId = this.service?.organisation_id;
      await this.getOrganisation();
    }

    this.getServiceLocations();
    this.getRelatedServices(name);

    if (this.service && this.service.organisation_id) {
      this.fetchOrganisation(this.service.organisation_id);
    }

    this.checkIfFavorited();
  };

  @action
  fetchServiceEligibilities = async () => {
    const data = await axios.get(`${apiBase}/taxonomies/service-eligibilities`);
    this.serviceEligibilityTaxonomies = get(data, 'data.data');
  };

  @action
  fetchOrganisation = async (id: string) => {
    try {
      const organisationData = await axios.get(`${apiBase}/organisations/${id}`);
      this.organisation = get(organisationData, 'data.data');
    } catch (error) {}
  };

  @action
  getServiceLocations = async () => {
    if (this.service) {
      const locationData = await axios.get(
        `${apiBase}/service-locations?filter[service_id]=${this.service.id}&include=location`
      );

      this.locations = get(locationData, 'data.data');
    }
  };

  @action
  getOrganisation = async () => {
    try {
      const organisation = await axios.get(`${apiBase}/organisations/${this.organisationId}`);
      this.organisation = get(organisation, 'data.data', '');
    } catch (e) {}
  };

  @action
  getRelatedServices = async (name: string) => {
    const relatedServicesData = await axios.get(`${apiBase}/services/${name}/related`);

    this.relatedServices = get(relatedServicesData, 'data.data');

    this.loading = false;
  };

  addToFavourites = () => {
    if (this.service) {
      if (localStorage.getItem('favourites')) {
        const favourites = localStorage.getItem('favourites') || '';

        const favouritesArr = JSON.parse(favourites);
        favouritesArr.push(this.service.id);

        localStorage.setItem('favourites', JSON.stringify(favouritesArr));
      } else {
        localStorage.setItem('favourites', JSON.stringify([this.service.id]));
      }
    }

    this.favourite = true;
  };
}
