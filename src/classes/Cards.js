import { Config } from "./index.js";
import { Card } from "./index.js";
import { CardModal } from "./index.js";

export class Cards extends Config {
  constructor(config, menus, currentModal, toggleSpinner) {
    super(config);
    this.menus = menus;
    this.currentModal = currentModal;
    this.toggleSpinner = toggleSpinner;
  }
  getCards(url, menuElement) {
    if (!url.length) return;
    const multipleClasses = 'row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'.split(' ');
    this.elem('#content').classList.add(...multipleClasses);
    this.toggleSpinner();
    fetch(url)
      .then(res => res.json())
      .then(data => {
        let str = '';
        data.drinks.forEach(item => {
          const card = new Card(item);
          str += card.renderCard();
        });
        this.elem('#content').innerHTML = str;
        this.elemAll('button.view-details').forEach(item => {
          item.addEventListener('click', (e) => {
            const modal = new CardModal(this.config, this.currentModal, this.toggleSpinner);
            const { drinkId } = e.target.dataset;
            modal.renderModal(drinkId);
          });
        });
        this.resetInactiveMenus(menuElement);
        this.toggleSpinner();
      })
      .catch((err) => {
        const errorMessage = `<p>Unable to load data, error: ${err}</p>`;
        this.elem('#content').innerHTML = errorMessage;
        this.toggleSpinner();
      });
  }
  getRandomCocktail() {
    this.toggleSpinner();
    fetch(`${this.baseUrl}/random.php`)
      .then(res => res.json())
      .then(data => {
        this.elem('#content').classList.remove(...content.classList)
        this.elem('#content').classList.add('row');
        const card = new Card(data.drinks[0]);
        this.elem('#content').innerHTML = card.renderCard();
        this.elem('button.view-details').addEventListener('click', (e) => {
          const modal = new CardModal(this.config, this.currentModal, this.toggleSpinner);
          const { drinkId } = e.target.dataset;
          modal.renderModal(drinkId);
        });
        this.resetAllMenus();
        this.toggleSpinner();
      })
      .catch((err) => {
        const errorMessage = `<p>Unable to load data, error: ${err}</p>`;
        this.elem('#content').innerHTML = errorMessage;
        this.toggleSpinner();
      });
    }
  resetInactiveMenus(menuElement) {
    this.menus.forEach(menu => {
      if (menu.menuElement !== menuElement) {
        this.elem(`${menu.menuElement} > select`).selectedIndex = 0;
      }
    });
  }
  resetAllMenus() {
    this.menus.forEach(menu => {
      this.elem(`${menu.menuElement} > select`).selectedIndex = 0;
    });
  }
}

