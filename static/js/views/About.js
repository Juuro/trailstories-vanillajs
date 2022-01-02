import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super()
    this.setTitle("About")
  }

  async getHtml() {
    return `
      <h2>About</h2>
    `
  }
}