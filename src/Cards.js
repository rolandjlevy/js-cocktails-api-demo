export class Cards {
  constructor({ elem, baseUrl, currentModal, toggleSpinner }) {
    this.elem = elem;
    this.baseUrl = baseUrl;
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
        data.drinks.forEach(item => { str += this.renderCard(item); });
        this.elem('#content').innerHTML = str;
        this.toggleSpinner();
        resetInactiveMenus(menuElement);
      })
      .catch((err) => {
        const errorMessage = `<p>Unable to load data, error: ${err}</p>`;
        this.elem('#content').innerHTML = errorMessage;
      });
  }
  renderCard(drink) {
    const { strDrink, strDrinkThumb, idDrink } = drink;
    return `
      <div class="col card-col">
        <div class="card shadow-sm">
          <img src="${strDrinkThumb}" class="card-image card-img-top" width="100%" height="225" alt="${strDrink}" />
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
  getRandomCocktail() {
    this.toggleSpinner();
    fetch(`${this.baseUrl}/random.php`)
      .then(res => res.json())
      .then(data => {
        this.elem('#content').classList.remove(...content.classList)
        this.elem('#content').classList.add('row');
        this.elem('#content').innerHTML = this.renderCard(data.drinks[0]);
        this.toggleSpinner();
      })
      .catch((err) => {
        const errorMessage = `<p>Unable to load data, error: ${err}</p>`;
        this.elem('#content').innerHTML = errorMessage;
      });
    }
}