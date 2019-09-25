import axios from 'axios';
import { apiBase } from '../config/api';
import { observable } from 'mobx';
import get from 'lodash/get';
import forEach from 'lodash/forEach';

interface IAbout {
  content: string;
  title: string;
  video_url: string;
}

interface IContent {
  title: string;
  content: string;
}

interface IGlobal {
  contact_email: string;
  contact_phone: string;
  facebook_handle: string;
  footer_content: string;
  footer_title: string;
  twitter_handle: string;
}

interface IHome {
  categories_title: string;
  personas_content: string;
  personas_title: string;
  search_title: string;
}
class CMSStore {
  @observable about: IAbout | null = null;
  @observable contact: IContent | null = null;
  @observable favourites: IContent | null = null;
  @observable get_involved: IContent | null = null;
  @observable privacy_policy: IContent | null = null;
  @observable terms_and_conditions: IContent | null = null;
  @observable global: IGlobal | null = null;
  @observable home: IHome | null = null;

  constructor() {
    this.getCMSFields();
  }

  getCMSFields = async () => {
    try {
      const CMSFields = await axios.get(`${apiBase}/settings`);
      const cmsData = get(CMSFields, 'data.data.cms.frontend');

      return forEach(cmsData, (data, key) => {
        // @ts-ignore
        this[key] = data;
      });
    } catch (e) {
      console.error(e);
    }
  };
}

export default CMSStore;
