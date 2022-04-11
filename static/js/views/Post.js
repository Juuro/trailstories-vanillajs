import { loadPosts } from '../loadPosts.js'
import { formatDate, readingTime, tags, getFeatureImage } from '../utilities.js'

export class Post extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({ mode: 'open' })

		this.template = document.createElement('template')
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
		const { posts } = await loadPosts({slug: window.location.pathname})
		let postPage = ''

		posts?.forEach((post) => {
			document.title = `${post.title} – TrailStories`
			postPage = postPage.concat(`
				<article class="${post.custom_template}">
					${getFeatureImage(post)}
					<div class="text">
						<h2>
							<a href="/${post.slug}" data-link>${post.title}</a>
						</h2>
						<div class="meta">
							<span class="date">${formatDate(post.published_at)}</span>
							<span class="reading-time">${readingTime(post.reading_time)}</span>
						</div>
						<main>${post.html}</main>
						<div class="tags">${tags(post)}</div>
					</div>
				</article>
			`)
		})

		return postPage
	}

	async connectedCallback() {
		const postDom = await this.createPostsDom()
		this.postDomTemplate = document.createElement('template')
		this.postDomTemplate.innerHTML = postDom
		this.shadowRoot.appendChild(this.template.content.cloneNode(true))
		this.shadowRoot.appendChild(this.postDomTemplate.content.cloneNode(true))
	}
}

customElements.define('post-view', Post)