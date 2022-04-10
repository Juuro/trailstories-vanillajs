export class About extends HTMLElement {
  constructor() {
    super()

    document.title = "About"
    this.template = document.createElement('template')
    this.template.innerHTML = `
      <style>
      h2 {
        color: var(--light-green);
      }
      </style>
      
      <h2>About</h2>
    `
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(this.template.content.cloneNode(true))
  }
}

customElements.define('about-view', About)