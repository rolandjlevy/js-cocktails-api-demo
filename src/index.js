import { Config, Cards, Menu } from './classes/index.js';
const CATEGORY_KEY = 'strCategory';
const INGREDIENT_KEY = 'strIngredient1';
const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

const elem = (selector) => document.querySelector(selector);
const elemAll = (selector) => document.querySelectorAll(selector);
const config = new Config({ elem, elemAll, baseUrl: BASE_URL });

const menus = [];

const initMenus = () => {
  const categoriesConfig = {
    name: 'categories',
    menuType: 'c',
    defaultLabel: 'Select a category',
    key: CATEGORY_KEY,
    menuElement: '#categories-menu'
  };
  menus.push(new Menu(config, categoriesConfig));

  const ingredientsConfig = {
    name: 'ingredients',
    menuType: 'i',
    defaultLabel: 'Select an ingredient',
    key: INGREDIENT_KEY,
    menuElement: '#ingredients-menu'
  };
  menus.push(new Menu(config, ingredientsConfig));

  menus.forEach((menu) => {
    menu.renderMenu();
    elem(menu.menuElement).addEventListener('change', (e) => {
      const url = e.target.value;
      cards.getCards(url, menu.menuElement);
    });
  });
};

const currentModal = new bootstrap.Modal(elem('#currentModal'));

const toggleSpinner = () => {
  ['d-none', 'd-flex'].map((cls) => elem('.spinner').classList.toggle(cls));
};

const cards = new Cards(config, menus, currentModal, toggleSpinner);

window.addEventListener('DOMContentLoaded', (event) => {
  initMenus();
  cards.getRandomCocktail();
  elem('#random-button').addEventListener('click', (e) =>
    cards.getRandomCocktail()
  );
  elem('.currentYear').textContent = new Date().getFullYear();
});
