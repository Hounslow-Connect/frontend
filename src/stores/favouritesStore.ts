import { observable, action } from 'mobx';
import axios from 'axios';
import get from 'lodash/get';
import remove from 'lodash/remove';

import { apiBase } from '../config/api';
import { IService, IOrganisation, IServiceLocation } from '../types/types';

class FavouritesStore {
  @observable favourites: IService[] = [];
  @observable organisations: IOrganisation[] = [];
  @observable serviceLocations: IServiceLocation[] = [];

  constructor() {
    this.fetchFavourites();
  }

  @action
  fetchFavourites = async () => {
    const favouritesFromStorage = localStorage.getItem('favourites');

    if (favouritesFromStorage) {
      const favouriteList = JSON.parse(favouritesFromStorage);

      try {
        const favouriteData = await axios.get(`${apiBase}/services?filter[id]=${favouriteList}`);
        this.favourites = get(favouriteData, 'data.data', []);
      } catch (e) {
        console.error(e);
      }

      this.fetchOrganisations();
      this.fetchServiceLocations();
    }
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

  @action
  removeFavourite = (id: string) => {
    const favouritesFromStorage = localStorage.getItem('favourites');

    if (favouritesFromStorage) {
      const amendedFilters = JSON.parse(favouritesFromStorage).filter(
        (favourite: string) => favourite !== id
      );

      localStorage.removeItem('favourites');
      localStorage.setItem('favourites', JSON.stringify(amendedFilters));

      const favourites = [...this.favourites];
      remove(favourites, ['id', id]);
      this.favourites = favourites;
    }
  };
}

export default FavouritesStore;
