export class Menu {
  constructor(config) {
    Object.entries(config).forEach(([key, value]) => {
      this[key] = value
    });
  }
  getMenuData() {
    const url = `${this.baseUrl}/list.php?${this.menuType}=list`;
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }
  compareFunction(a, b, key) {
    if (a[key] < b[key]) return -1;
    if (a[key] > b[key]) return 1;
    return 0;
  }
  renderMenu() {
    this.getMenuData()
      .then(data => {
        let str = `<select class="form-select form-select-md">\n`;
        str += `<option value="">» ${this.defaultLabel} «</option>\n`;
        data.drinks.sort((a, b) => this.compareFunction(a, b, this.key));
        data.drinks.forEach(item => {
          const currentName = item[this.key].replace(/\s/g, '_');
          str += `<option value="${`${this.baseUrl}/filter.php?${this.menuType}=${currentName}`}">${item[this.key]}</option>\n`;
        });
        str += `</select>`;
        this.elem(this.menuElement).innerHTML = str;
      })
      .catch((err) => {
        const errorMessage = `<p>Unable to load the ${this.name} menu, error: ${err}</p>`;
        this.elem(this.menuElement).innerHTML = errorMessage;
      });
  }
}