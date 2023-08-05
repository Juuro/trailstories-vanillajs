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

// TODO: Replace with a Tags component
export const tags = (post) => {
  let tags = ""

  post.tags.forEach(tag => {
    tags = tags.concat(`
      <tag-item href="/tag/${tag.slug}" name="${tag.name}"></tag-item>
    `)
  })

  return tags
}

export const getFeatureImage = post => {
  if (post.feature_image) {
    return `
    <a href="/${post.slug}" data-link>
      <img src="${post.feature_image}" alt="${post.title}" width="700" height="300">
    </a>
    `
  }
  return ""
}

export const parseMarkdown = markdownText => {
 const htmlText = markdownText
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
    .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
    .replace(/\*(.*)\*/gim, '<i>$1</i>')
    .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
    .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
    .replace(/\n$/gim, '<br />')

  return htmlText.trim()
}