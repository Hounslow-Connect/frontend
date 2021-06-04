import { observable, action } from 'mobx';
import axios from 'axios';
import { apiBase } from '../config/api';
import get from 'lodash/get';
// import every from 'lodash/every';
import { IOrganisation } from '../types/types';

export default class OrganisationStore {
  @observable organisation: IOrganisation | null = null;
  @observable loading: boolean = false;

  @action
  fetchOrganisation = async (name: string) => {
    this.loading = true;
    const organisationData = await axios.get(`${apiBase}/organisations/${name}`);
    this.organisation = get(organisationData, 'data.data');
    this.loading = false;
  };
}
