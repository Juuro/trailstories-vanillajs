export class PaginationComponent extends HTMLElement {
  constructor() {
    super()

    const shadow = this.attachShadow({mode: 'open'})

    const link = document.createElement('a')
    const hyperlink = this.getAttribute('href')
    link.setAttribute('href', hyperlink)
    link.setAttribute('data-link', '')
    const name = this.getAttribute('name')
    link.textContent = name

    const style = document.createElement('style')
    style.textContent = `
      :host {
        font-size: 0.6rem;
        opacity: 0.4;
        transition: opacity 0.2s;
      }  
      
      :host(:hover) {
        opacity: 1;
      }

      a {
        font-size: 1em;
        background-color: var(--text-color);
        padding: 0.1em 0.4em;
        color: var(--pastel-red);
        text-decoration: none;
        text-transform: uppercase;
        margin-right: 0.5em;
        border-radius: 0.2em;
        letter-spacing: 0.05em;
      }
    `

    shadow.appendChild(style)
    shadow.appendChild(link)
  }
}

customElements.define('pagination-component', PaginationComponent);