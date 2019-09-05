import { observable, action } from 'mobx';

export default class UIStore {
  @observable burgerMenuOpen: boolean = false;

  @action
  toggleBurgerMenu = () => {
    this.burgerMenuOpen = !this.burgerMenuOpen;
  };
}
