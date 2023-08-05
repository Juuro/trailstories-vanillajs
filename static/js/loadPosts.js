export const loadPosts = async (options) => {
  console.log('loadPosts')
  let url = ""

  if (options?.slug) {
    url = `../../.netlify/functions/ghost?slug=${options.slug}`
  }
  else if (options?.tag) {
    url = `../../.netlify/functions/ghost?tag=${options.tag}`
  }
  else {
    // url = `../../.netlify/functions/ghost`

    return await fetch('./static/posts/foo.md')
      .then(response => response.text())
      .then((data) => {
        console.log('data', data)
        return {posts: [data]}
      })
  }

  if (options?.page) {
    url += `&page=${options.page}`
  }

  // return await fetch(url)
  //   .then(response => {
  //     return response.json()
  //   })
  //   .then(data => {
  //     return data
  //   })
  //   .catch(error => {
  //     console.error('And in the end everything failed because: ', error)
  //   })
}