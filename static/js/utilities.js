export const formatDate = (date) => {
  return new Date(date).toDateString()
}

export const readingTime = (time) => {
  const text = 'min read'

  if (time <= 0) {
    return `1 ${text}`
  }
  return `${time} ${text}`
}

export const tags = (post) => {
  let tags = ""

  post.tags.forEach(tag => {
    tags = tags.concat(`
      <tag-item href="tag/${tag.slug}" name="${tag.name}"></tag-item>
    `)
  })

  return tags
}