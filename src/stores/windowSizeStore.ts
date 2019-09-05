import { observable, computed, action } from 'mobx';
import debounce from 'lodash/debounce';

export default class WindowSizeStore {
  @observable screenWindow: any = {};
  @observable windowWidth: any = null;

  @computed
  get isMobile() {
    return this.windowWidth <= 500;
  }

  @action
  handleWindowWidthChange = debounce(() => {
    this.setWindowWidth(this.screenWindow.innerWidth);
  }, 100);

  constructor() {
    this.setWindow();
  }

  @action
  setWindow = () => {
    if (typeof window === 'object') {
      this.screenWindow = window;
      this.handleWindowWidthChange();
      this.screenWindow.addEventListener('resize', this.handleWindowWidthChange);
    }
  };

  @action
  setWindowWidth = (width: any) => {
    return (this.windowWidth = width);
  };
}
