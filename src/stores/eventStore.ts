import { observable, action } from 'mobx';
import axios from 'axios';
import moment from 'moment';
import { apiBase } from '../config/api';
import get from 'lodash/get';

class EventStore {
  @observable eventFeed: any[] = [];

  constructor() {
    this.fetchEventFeed();
  }

  @action
  fetchEventFeed = async () => {
    try {
      const todaysDate = moment().format(moment.HTML5_FMT.DATE)
      const response = await axios.get(`${apiBase}/organisation-events?filter[starts_after]=${todaysDate}`);  
      const eventFeed =  get(response, 'data.data');
      // filter by item.homepage === true // currently they're all false
      // eventFeedList = eventFeed.filter((item: any) => item.homepage);

      this.eventFeed = eventFeed;
    } catch (err) {
      console.error({err})
      return false
    }
  };  
}

const eventStore = new EventStore();

export default eventStore;
