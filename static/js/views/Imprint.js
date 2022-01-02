import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super()
    this.setTitle("Imprint")
  }

  async getHtml() {
    return `
      <h2>Imprint</h2>
    `
  }
}