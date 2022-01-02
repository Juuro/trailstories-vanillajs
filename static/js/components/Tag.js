export class Tag extends HTMLElement {
  constructor() {
    super()

    const shadow = this.attachShadow({mode: 'open'})

    const wrapper = document.createElement('span')
    const link = document.createElement('a')
    const hyperlink = this.getAttribute('href')
    link.setAttribute('href', hyperlink)
    link.setAttribute('data-link', '')
    const name = this.getAttribute('name')
    link.textContent = name

    const style = document.createElement('style')
    style.textContent = `
      a {
        font-size: 0.6rem;
        opacity: 0.4;
        background-color: var(--text-color);
        padding: 0.1em 0.4em;
        color: var(--pastel-red);
        text-decoration: none;
        text-transform: uppercase;
        margin-right: 0.5em;
        border-radius: 0.2em;
        transition: opacity 0.2s;
        letter-spacing: 0.05em;
      }
      
      a:hover {
        opacity: 1;
      }
    `

    shadow.appendChild(style)
    shadow.appendChild(wrapper)
    wrapper.appendChild(link)
  }
}

customElements.define('tag-item', Tag);