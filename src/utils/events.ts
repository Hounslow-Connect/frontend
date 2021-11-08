import { Events } from '../types/types';

export const EventEmitter = {
  _events: {},
  dispatch(event: Events, data: any) {
    // @ts-ignore
    if (!this._events[event]) {
      return;
    }
    // @ts-ignore
    this._events[event].forEach(callback => callback(data));
  },
  subscribe(event: Events, callback: (data: any) => any) {
    // @ts-ignore
    if (!this._events[event]) {
      this._events[event] = [];
    }
    // @ts-ignore
    this._events[event].push(callback);
  },
  unsubscribe(event: Events) {
    // @ts-ignore
    if (!this._events[event]) {
      return;
    }
    // @ts-ignore
    delete this._events[event];
  },
};
