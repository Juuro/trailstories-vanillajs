import { loadPosts } from "../loadPosts.js";
import { formatDate, readingTime, tags } from '../utilities.js'
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super()
    this.setTitle("TrailStories")
  }

  getHtml = async () => {
    const { posts } = await loadPosts(window.location.pathname)
    let postPage = ''

    posts.forEach((post) => {
      postPage = postPage.concat(`
        <article class="${post.custom_template}">
          <a href="${post.slug}" data-link>
            <img src="${post.feature_image}" alt="" width="700" height="300">
          </a>
          <div class="text">
            <h2>
              <a href="${post.slug}" data-link>${post.title}</a>
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
}