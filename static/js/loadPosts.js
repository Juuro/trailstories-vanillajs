export const loadPosts = async (slug) => {
  let url = ""

  if (slug) {
    url = `../../.netlify/functions/ghost?slug=${slug}`
  }
  else {
    url = `../../.netlify/functions/ghost`
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