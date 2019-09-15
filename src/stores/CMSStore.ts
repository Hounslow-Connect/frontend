import axios from 'axios';
import { apiBase } from '../config/api';

class CMSStore {
  constructor() {
    this.getCMSFields();
  }

  getCMSFields = async () => {
    const CMSFields = await axios.get(`${apiBase}/settings`);

    console.log(CMSFields);
  };
}

export default CMSStore;
