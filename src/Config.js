export class Config {
  constructor(config) {
    const { elem, elemAll, baseUrl } = config;
    this.elem = elem;
    this.elemAll = elemAll;
    this.baseUrl = baseUrl;
    this.config = config;
  }
}