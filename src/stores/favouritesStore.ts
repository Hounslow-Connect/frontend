import { observable, action } from 'mobx';
import axios from 'axios';

import { apiBase } from '../config/api';
import { IService, IOrganisation, IServiceLocation } from '../types/types';
import get from 'lodash/get';

class FavouritesStore {
  @observable favourites: IService[] = [];
  @observable organisations: IOrganisation[] = [];
  @observable serviceLocations: IServiceLocation[] = [];

  constructor() {
    this.fetchFavourites();
  }

  @action
  fetchFavourites = async () => {
    const favouritesFromStorage = localStorage.getItem('favourites') || '';

    const favouriteList = JSON.parse(favouritesFromStorage);

    try {
      const favouriteData = await axios.get(`${apiBase}/services?filter[id]=${favouriteList}`);
      this.favourites = get(favouriteData, 'data.data', []);
    } catch (e) {
      console.error(e);
    }

    this.fetchOrganisations();
    this.fetchServiceLocations();
  };

  @action
  fetchOrganisations = async () => {
    const organisationList = this.favourites.map(
      (favourite: IService) => favourite.organisation_id
    );

    try {
      const organisationData = await axios.get(
        `${apiBase}/organisations?filter[id]=${organisationList}`
      );
      this.organisations = get(organisationData, 'data.data');
    } catch (e) {
      console.error(e);
    }
  };

  @action
  fetchServiceLocations = async () => {
    const serviceIdList = this.favourites.map((favourite: IService) => favourite.id);

    try {
      const serviceLocationData = await axios.get(
        `${apiBase}/service-locations?filter[service_id]=${serviceIdList}&include=location`
      );
      this.serviceLocations = get(serviceLocationData, 'data.data');
    } catch (e) {
      console.error(e);
    }
  };

  getLocations = (id: string) => {
    return this.serviceLocations.filter((location: IServiceLocation) => location.service_id === id);
  };
}

export default FavouritesStore;
