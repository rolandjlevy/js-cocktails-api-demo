const baseUrl = 'https://www.thecocktaildb.com/api/json/v1/1';
const elem = (selector) => document.querySelector(selector);
const currentModal = new bootstrap.Modal(elem('#currentModal'));

const getMenuData = ({ menuType }) => {
  const url = `${baseUrl}/list.php?${menuType}=list`;
  return new Promise((resolve, reject) => {
    fetch(url)
    .then(res => res.json())
    .then(data => resolve(data))
    .catch(e => reject(e));
  });
}

const renderMenu = (config) => {
  const { menuType, defaultLabel, key, menuElement } = config;
  console.log(menuElement)
  getMenuData({ menuType }).then(data => {
    let str = `<select onchange="getCards(this.value, '${menuElement}')" class="form-select form-select-md">\n`;
    str += `<option value="">» ${defaultLabel} «</option>\n`;
    data.drinks.sort((a, b) => compareFunction(a, b, key));
    data.drinks.forEach(item => {
      const name = item[key].replace(/\s/g, '_')
      str += `<option value="${`${baseUrl}/filter.php?${menuType}=${name}`}">${item[key]}</option>\n`;
    });
    str += `</select>`;
    document.querySelector(menuElement).innerHTML = str;
  })
  .catch(e => console.log(e));
}

const resetInactiveMenus = (menuElement) => {
  menuConfigs.forEach(config => {
    if (config.menuElement !== menuElement) {
      document.querySelector(`${config.menuElement} > select`).selectedIndex = 0;
    }
  });
}

const getCards = (url, menuElement) => {
  if (!url.length) return;
  const multipleClasses = 'row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'.split(' ');
  elem('#content').classList.add(...multipleClasses);
  toggleSpinner();
  fetch(url)
  .then(res => res.json())
  .then(data => {
    let str = '';
    data.drinks.forEach(item => { str += renderCard(item); });
    elem('#content').innerHTML = str;
    resetInactiveMenus(menuElement);
    toggleSpinner();
  })
  .catch(e => console.log(e));
}

const renderCard = (drink) => {
  const { strDrink, strDrinkThumb, idDrink } = drink;
  return `
    <div class="col card-col">
      <div class="card shadow-sm">
        <img src="${strDrinkThumb}" class="card-image card-img-top" width="100%" height="225" />
        <div class="card-body">
          <p class="card-text"><h4>${strDrink}</h4></p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              <button type="button" onclick=renderModalDetails(${idDrink}) class="btn btn-sm btn-outline-secondary">View details</button>
            </div>
            <small class="text-muted">Date</small>
          </div>
        </div>
      </div>
    </div>
  `;
}

const renderModalDetails = (id) => {
  toggleSpinner();
  fetch(`${baseUrl}/lookup.php?i=${id}`)
  .then(res => res.json())
  .then(data => {
    const { strDrink, strCategory, strDrinkThumb, strInstructions, strGlass, strVideo, dateModified } = data.drinks[0];
    elem('.modal-title').textContent = strDrink;
    const date = new Date(dateModified).toLocaleDateString('en-GB');
    const delimiter = '<br>\t\t&bull;&nbsp;';
    const ingredients = Object.entries(data.drinks[0]).reduce((acc, [key, value]) => {
      if (key.includes('strIngredient') && value) acc.push(value);
      return acc;
    }, []).join(delimiter);
    const videoLink = strVideo ? `<p><strong>Video</strong>: <a href="${strVideo}">Watch on YouTube</a></p>` : '';
    elem('.modal-body').innerHTML = `
      <div>
        <p><img src="${strDrinkThumb}" width="120" /></p>
        <p><strong>Category</strong>: ${strCategory}</p>
        <p><strong>Glass type</strong>: ${strGlass || 'N/A'}</p>
        <p><strong>Instructions</strong>: ${strInstructions || 'N/A'}</p>
        <p><strong>Ingredients</strong>: ${delimiter}${ingredients}</p>
        <p><strong>Date modified</strong>: ${date || 'N/A'}</p>
        ${videoLink}
      </div>
    `;
    toggleSpinner();
    currentModal.show();
  })
  .catch(e => console.log(e));
}

const getRandomCocktail = () => {
  toggleSpinner();
  fetch(`${baseUrl}/random.php`)
  .then(res => res.json())
  .then(data => {
    elem('#content').classList.remove(...content.classList)
    elem('#content').classList.add('row');
    elem('#content').innerHTML = renderCard(data.drinks[0]);
    toggleSpinner();
  })
  .catch(e => console.log(e));
}

const toggleSpinner = () => {
  ['d-none', 'd-flex'].map(c => elem('.spinner').classList.toggle(c));
}

const compareFunction = (a, b, key) => {
  if (a[key] < b[key]) return -1;
  if (a[key] > b[key]) return 1;
  return 0;
};

const menuConfigs = [
  {
    menuType: 'c', 
    defaultLabel: 'Select a category', 
    key: 'strCategory', 
    menuElement: '#categories-menu'
  },
  {
    menuType: 'i', 
    defaultLabel: 'Select an ingredient', 
    key: 'strIngredient1', 
    menuElement: '#ingredients-menu'
  }
];

window.addEventListener('DOMContentLoaded', (event) => {
  menuConfigs.forEach(config => renderMenu(config));
  getRandomCocktail();
});