import { observable, action } from 'mobx';
import axios from 'axios';
import moment from 'moment';
import { apiBase } from '../config/api';
import get from 'lodash/get';

import { IEvent } from '../components/EventSummary/IEvent';

class EventStore {
  @observable eventFeed: any[] = [];
  @observable eventList: any[] = [];

  @action
  fetcheventFeed = async () => {
    try {
      const todaysDate = moment().format(moment.HTML5_FMT.DATE);
      const response = await axios.get(
        `${apiBase}/organisation-events?filter[starts_after]=${todaysDate}`
      );
      const eventFeed = get(response, 'data.data');
      const eventFeedList = eventFeed.filter((item: IEvent) => item.homepage);
      this.eventFeed = eventFeedList;
    } catch (err) {
      console.error({ err });
      return false;
    }
  };

  @action
  fetchAllEvents = async (page = 1) => {
    const perPage = 9
    try {
      const response = await axios.post(
        `${apiBase}/search/events?page=${page}&per_page=${perPage}`
      );
      const eventListResponse = get(response, 'data.data');
      this.eventList = eventListResponse;
    } catch (err) {
      console.error({ err });
      return false;
    }
  };
}

// const eventStore = new EventStore();

export default EventStore;
