export class Imprint extends HTMLElement {
  constructor() {
    super()

    document.title = "Imprint"
    this.template = document.createElement('template')
    this.template.innerHTML = `
      <style>
      h2 {
        color: var(--light-green);
      }
      </style>
      
      <h2>Imprint</h2>
    `
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(this.template.content.cloneNode(true))
  }
}

customElements.define('imprint-view', Imprint)