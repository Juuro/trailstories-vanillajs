import { loadPosts } from '../loadPosts.js'

import { formatDate, readingTime, tags, getFeatureImage, parseMarkdown } from '../utilities.js'

export class Home extends HTMLElement {
  constructor() {
    super()
    // TODO: attachShadow in constructor or in connectedCallback?
    this.attachShadow({ mode: 'open' })

    this.template = document.createElement('template')
    // TODO: How to share CSS between custom elements?
    this.template.innerHTML = `
      <style>
      a {
        color: #78f9a0;
        transition: color .2s;
      }
      
      a:hover {
        color: #1c4442;
      }
      
      article {
        background-color: var(--pastel-red);
        color: var(--text-color);
        margin: 3em auto;
        width: 100%;
        transform: skew(0, -3deg);
        transition: box-shadow .2s;
      }
      
      article.article-placeholder {
        border-radius: 0.2em;
        animation: pulse 1.5s infinite ease-out;
      }

      article.custom-bike-post {
        box-shadow: -1em 1em var(--bike-post-color);
      }

      article:hover {
        box-shadow: 0 0px 19px 0 var(--wine-red);
      }

      article img {
        width: 100%;
        max-width: 100%;
        object-fit: cover;
      }

      article .text {
        padding: 1em 1.5em;
      }

      article h2 {
        color: var(--text-color);
        font-size: 2.5em;
        margin: 0 0 0;
      }

      article h2 a {
        color: inherit;
        text-decoration: none;
        transition: color .2s;
      }

      article h2 a:hover {
        color: var(--text-color-hover);
      }

      article .meta {
        color: var(--wine-red);
        font-size: 0.8em;
        display: flex;
      }

      article .meta span {
        flex-grow: 1;
      }

      article .meta span:last-child {
        text-align: right;
      }

      article main {
        margin: 1em 0;
      }
      </style>
    `
  }

  createPostsDom = async () => {
    const { posts, meta } = await loadPosts()
    let postPage = ''

    // console.log(posts)

    posts?.forEach((post) => {
      // TODO: Article custom element!
      postPage = postPage.concat(`
      <article>
        <div class="text">
          ${parseMarkdown(post)}
        </div>
      </article>

    `)
      // postPage = postPage.concat(`
      //   <article class="${post.custom_template ? post.custom_template : ""}">
      //     ${getFeatureImage(post)}
      //     <div class="text">
      //     <h2>
      //         <a href="/${post.slug}" data-link>${post.title}</a>
      //     </h2>
      //     <div class="meta">
      //         <span class="date">${formatDate(post.published_at)}</span>
      //         <span class="reading-time">${readingTime(post.reading_time)}</span>
      //     </div>
      //     <main>${post.custom_excerpt ? post.custom_excerpt : post.excerpt}...</main>
      //     <div class="tags">${tags(post)}</div>
      //     </div>
      //   </article>
      // `)
    })

    // postPage = postPage.concat(`
    //   <div class="pagination">
    //   ${meta.pagination.prev ? `<a href="${meta.pagination.prev}" data-link>Previous</a>` : ""}
    //   ${meta.pagination.next ? `<a href="${meta.pagination.next}" data-link>Next</a>` : ""}
    //   </div>
    // `)

    return postPage
  }

  async connectedCallback() {
    const postsDom = await this.createPostsDom()
    this.postsDomTemplate = document.createElement('template')
    this.postsDomTemplate.innerHTML = postsDom
    this.shadowRoot.appendChild(this.template.content.cloneNode(true))
    this.shadowRoot.appendChild(this.postsDomTemplate.content.cloneNode(true))
  }
}

customElements.define('home-view', Home)