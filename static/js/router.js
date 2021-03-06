import { About } from "./views/about.js"
import { Home } from "./views/Home.js"
import { Imprint } from "./views/Imprint.js"
import { Post } from "./views/Post.js"
import { Tag } from "./views/Tag.js"

export const router = async () => {
  const routes = [
    {path: "/", view: 'home-view'},
    {path: "/about", view: 'about-view'},
    {path: "/imprint", view: 'imprint-view'},
    {path: "/tag", view: 'tag-view'},
    {path: "", view: 'post-view'},
  ]

  const potentialMatches = routes.map(route => {
    return {
      route: route, 
      isMatch: location.pathname === route.path || location.pathname.startsWith(route.path) && route.path !== '' && route.path !== '/'
    }
  })

  let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch)

  // TODO: Tries to load a post also when you try to load a URL/slug that doesn't exist. Fix it by loading an 404 page if the corresponding post doesn't exist.
  if (!match) {
    match = {
      route: routes[4],
      isMatch: true
    }
  }

  const view = match.route.view

  document.querySelector("main").innerHTML = `
    <article class="article-placeholder">
      <div class="text">
        <h2>
          <a href="season-start" data-link=""></a>
        </h2>
        <div class="meta">
          <span class="date"></span>
          <span class="reading-time"></span>
        </div>
        <main></main>
      </div>
    </div>
  `

  document.querySelector("main").innerHTML = document.createElement(view).outerHTML
}