import { Cards } from './src/Cards.js';
import { Menu } from './src/Menu.js';
import { Modal } from './src/Modal.js';

const elem = (selector) => document.querySelector(selector);
const baseUrl = 'https://www.thecocktaildb.com/api/json/v1/1';
const currentModal = new bootstrap.Modal(elem('#currentModal'));

window.getCards = (url, menuElem) => cards.getCards(url, menuElem);

window.getRandomCocktail = () => cards.getRandomCocktail();

window.renderModalDetails = (id) => modal.renderDetails(id);

window.resetInactiveMenus = (menuElement) => {
  menus.forEach(menu => {
    if (menu.menuElement !== menuElement) {
      elem(`${menu.menuElement} > select`).selectedIndex = 0;
    }
  });
}

window.toggleSpinner = () => {
  ['d-none', 'd-flex'].map(cls => elem('.spinner').classList.toggle(cls));
  console.log('toggleSpinner called');
}

const cards = new Cards({ elem, baseUrl, toggleSpinner });
const modal = new Modal({ elem, baseUrl, currentModal, toggleSpinner });
const menus = [];

window.addEventListener('DOMContentLoaded', (event) => {
  const categoriesConfig = {
    name: 'categories',
    menuType: 'c',
    defaultLabel: 'Select a category',
    key: 'strCategory',
    menuElement: '#categories-menu',
    onchangeAction: 'getCards',
    baseUrl,
    elem
  };
  const categoriesMenu = new Menu(categoriesConfig);
  menus.push(categoriesMenu);

  const ingredientsConfig = {
    name: 'ingredients',
    menuType: 'i',
    defaultLabel: 'Select an ingredient',
    key: 'strIngredient1',
    menuElement: '#ingredients-menu',
    onchangeAction: 'getCards',
    baseUrl,
    elem
  }
  const ingredientsMenu = new Menu(ingredientsConfig);
  menus.push(ingredientsMenu);
  menus.forEach(menu => menu.renderMenu());
  getRandomCocktail();
  elem('.currentYear').textContent = new Date().getFullYear();
});