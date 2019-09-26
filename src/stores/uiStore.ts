import { observable, action } from 'mobx';

export default class UIStore {
  @observable burgerMenuOpen: boolean = false;
  @observable feedbackModalOpen: boolean = false;

  @action
  toggleBurgerMenu = () => {
    this.burgerMenuOpen = !this.burgerMenuOpen;
  };

  @action
  toggleFeedbackModal = () => {
    this.feedbackModalOpen = !this.feedbackModalOpen;
  };
}
