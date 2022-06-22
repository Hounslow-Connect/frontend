import { observable, action } from 'mobx';
import axios from 'axios';
import moment from 'moment';
import { apiBase } from '../config/api';
import get from 'lodash/get';

import { IEvent } from '../components/EventSummary/IEvent';

const PER_PAGE = 9;
class EventStore {
  @observable eventFeed: any[] = [];
  @observable eventList: any[] = [];
  @observable total: number = 0;
  @observable numberOfPages: number = 0;

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
    try {
      const response = await axios.post(
        `${apiBase}/search/events?page=${page}&per_page=${PER_PAGE}`
      );
      const eventListResponse = get(response, 'data');
      this.eventList = eventListResponse.data;
      this.total = eventListResponse.meta.total;
      this.numberOfPages = Math.ceil(eventListResponse.meta.total / PER_PAGE);
    } catch (err) {
      console.error({ err });
      return false;
    }
  };
}

export default EventStore;
