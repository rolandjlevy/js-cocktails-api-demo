export class Card {
  constructor(msg) {
    this.msg = msg;
  }
  showMessage() {
    console.log('Message:', this.msg);
  }
}