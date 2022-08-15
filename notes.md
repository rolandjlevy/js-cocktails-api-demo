# Cocktails API: thecocktaildb.com

## TO DO

- make a function for renderFullDetails elements
- Add About section to footer and top nav
- Update top nav

- Docs: https://www.thecocktaildb.com/api.php
- Random: https://www.thecocktaildb.com/api/json/v1/1/random.php 
- Filter: https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=vodka

## List the categories, glasses, ingredients or alcoholic filters
- https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list
- https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list
- https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list
- https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list

## Bootstrap
- https://getbootstrap.com/docs/5.2/examples/cheatsheet/
- https://getbootstrap.com/docs/5.2/examples/album/
- https://getbootstrap.com/docs/5.0/components/modal/#options

## JS notes

```js
// card example
<div class="col">
  <div class="card shadow-sm">
    <svg class="bd-placeholder-img card-img-top" width="100%" height="225" xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false">
      <title>Placeholder</title>
      <rect width="100%" height="100%" fill="#55595c" /><text x="50%" y="50%" fill="#eceeef"
        dy=".3em">Thumbnail</text>
    </svg>

    <div class="card-body">
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional
        content. This content is a little bit longer.</p>
      <div class="d-flex justify-content-between align-items-center">
        <div class="btn-group">
          <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
          <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
        </div>
        <small class="text-muted">9 mins</small>
      </div>
    </div>
  </div>
</div>

// renderCocktail
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

// UK date
const date = new Date(dateModified).toLocaleDateString('en-GB');

// modal event
elem('#currentModal').addEventListener('shown.bs.modal', () => {
  console.log('Modal opened')
});

// render menu
const renderCategoriesMenu = () => {
  const type = 'c'; // c for category
  getDataList({ type: 'c' }).then(data => {
    let str = `<select onchange="getCards(this.value)" class="form-select form-select-md">\n`;
    str += `<option value="">» Select a category «</option>\n`;
    data.drinks.sort((a, b) => compareFunction(a, b, 'strCategory'));
    const categories = data.drinks.forEach(item => {
      const categoryName = item.strCategory.replace(/\s/g, '_')
      str += `<option value="${`${baseUrl}/filter.php?${type}=${categoryName}`}">${item.strCategory}</option>\n`;
    });
    str += `</select>`;
    document.querySelector('#categories-menu').innerHTML = str;
  })
  .catch(e => console.log(e));
}
```