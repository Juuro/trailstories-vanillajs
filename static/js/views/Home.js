import { loadPosts } from '../loadPosts.js'
import { formatDate, readingTime, tags, getFeatureImage } from '../utilities.js'
import AbstractView from './AbstractView.js'

export default class extends AbstractView {
  constructor() {
    super()
    this.setTitle('TrailStories')
  }

  getHtml = async () => {
    const { posts, meta } = await loadPosts()
    let postPage = ''

    console.log('meta: ', meta)

    posts?.forEach((post) => {
      postPage = postPage.concat(`
        <article class="${post.custom_template ? post.custom_template : ""}">
          ${getFeatureImage(post)}
          <div class="text">
            <h2>
              <a href="${post.slug}" data-link>${post.title}</a>
            </h2>
            <div class="meta">
              <span class="date">${formatDate(post.published_at)}</span>
              <span class="reading-time">${readingTime(post.reading_time)}</span>
            </div>
            <main>${post.custom_excerpt ? post.custom_excerpt : post.excerpt}...</main>
            <div class="tags">${tags(post)}</div>
          </div>
        </article>
      `)
    })

    postPage = postPage.concat(`
      <div class="pagination">
        ${meta.pagination.prev ? `<a href="${meta.pagination.prev}" data-link>Previous</a>` : ""}
        ${meta.pagination.next ? `<a href="${meta.pagination.next}" data-link>Next</a>` : ""}
      </div>
    `)

    return postPage
  }
}
