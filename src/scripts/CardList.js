export class CardList {
  constructor(container, /* array*/) {
    this.container = container;
    // this.array = array;
  }
  addCard(card) {
    this.container.append(card);
  }
  render(array) {
    array.forEach((elem) => this.addCard(elem));
  }
}
