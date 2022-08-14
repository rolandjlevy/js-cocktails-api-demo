const baseUrl = 'https://www.thecocktaildb.com/api/json/v1/1';

const getCategories = () => {
  const categoriesUrl = `${baseUrl}/list.php?c=list`;
  return new Promise((resolve, reject) => {
    fetch(categoriesUrl)
    .then(res => res.json())
    .then(data => resolve(data))
    .catch(e => reject(e));
  });
}

getCategories().then(data => {
  let categoriesMenu = `<select onchange="getCategory(this.value)">\n`;
  categoriesMenu += `<option>-- select a category --</option>\n`;
  const categories = data.drinks.forEach(item => {
    const category = item.strCategory.replace(/\s/g, '_')
    categoriesMenu += `<option value="${`${baseUrl}/filter.php?c=${category}`}">${item.strCategory}</option>\n`;
  });
  categoriesMenu += `</select>`;
  document.querySelector('#categories').innerHTML = categoriesMenu;
  })
  .catch(e => console.log(e));

const getCategory = (categoryUrl) => {
  fetch(categoryUrl)
  .then(res => res.json())
  .then(data => {
    let content = `<ul>`;
    data.drinks.forEach(item => { content += `<li>${renderCocktail(item)}</li>`; });
    content += `</ul>`;
    document.querySelector('#content').innerHTML = content;
  })
  .catch(e => console.log(e));
}

const getRandomCocktail = () => {
  fetch(`${baseUrl}/random.php`)
  .then(res => res.json())
  .then(data => {
    document.querySelector('#content').innerHTML = renderCocktail(data.drinks[0]);
  })
  .catch(e => console.log(e));
}

const renderCocktail = (drink) => {
  const { strDrink, strDrinkThumb, idDrink } = drink;
  return `
    <div class="cocktail">
      <h3>${strDrink}</h3>
      <img width="200" src="${strDrinkThumb}" />
      <button type="button" class="btn btn-primary details-btn" onclick="getDetails(${idDrink})">Get details</button>
    </div>
  `;
}

const getDetails = (id) => {
  const url = `${baseUrl}/lookup.php?i=${id}`
  console.log(url);
}

getRandomCocktail();