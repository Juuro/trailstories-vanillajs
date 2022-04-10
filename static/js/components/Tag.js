export class Tag extends HTMLElement {
  constructor() {    
    super()

    this.template = document.createElement('template')
    this.template.innerHTML = `
      <style>
      :host {
        font-size: .6rem;
        opacity: .4;
        transition: opacity .2s;
      }  
      
      :host(:hover) {
        opacity: 1;
      }
    
      :host a {
        font-size: 1em;
        background-color: var(--text-color);
        padding: .1em .4em;
        color: var(--pastel-red);
        text-decoration: none;
        text-transform: uppercase;
        margin-right: .5em;
        border-radius: .2em;
        letter-spacing: .05em;
      }
      </style>

      <a href="${this.getAttribute('href')}" data-link="">${this.getAttribute('name')}</a>
    `
  }

  connectedCallback() {
    this.attachShadow({mode: 'open'})
    this.shadowRoot.appendChild(this.template.content.cloneNode(true))
  }
}

customElements.define('tag-item', Tag)