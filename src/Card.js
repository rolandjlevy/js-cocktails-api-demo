export class Card {
  constructor(config) {
    const { strDrink, strDrinkThumb, idDrink } = config;
    this.strDrink = strDrink;
    this.strDrinkThumb = strDrinkThumb;
    this.idDrink = idDrink;
  }
  renderCard() {
    return `
      <div class="col card-col">
        <div class="card shadow-sm">
          <img src="${this.strDrinkThumb}" class="card-image card-img-top" width="100%" height="225" alt="${this.strDrink}" />
          <div class="card-body">
            <p class="card-text"><h4>${this.strDrink}</h4></p>
            <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
                <button type="button" data-drink-id="${this.idDrink}" class="view-details btn btn-sm btn-outline-secondary">View details</button>
              </div>
              <small class="text-muted">Date</small>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
