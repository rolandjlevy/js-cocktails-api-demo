export class Config {
  constructor(config) {
    const { elem, elemAll, baseUrl, menus, currentModal, toggleSpinner } = config;
    this.elem = elem;
    this.elemAll = elemAll;
    this.baseUrl = baseUrl;
    this.menus = menus;
    this.currentModal = currentModal;
    this.toggleSpinner = toggleSpinner;
    this.config = config;
  }
}