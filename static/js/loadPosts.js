export const loadPosts = async (options) => {
  let url = ""

  if (options?.slug) {
    url = `../../.netlify/functions/ghost?slug=${options.slug}`
  }
  else if (options?.tag) {
    url = `../../.netlify/functions/ghost?tag=${options.tag}`
  }
  else {
    url = `../../.netlify/functions/ghost`
  }

  if (options?.page) {
    url += `&page=${options.page}`
  }

  return await fetch(url)
    .then(response => {
      return response.json()
    })
    .then(data => {
      return data
    })
    .catch(error => {
      console.error('And in the end everything failed because: ', error)
    })
}