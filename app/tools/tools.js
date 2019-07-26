const ctt = (camel) => { return camelToTitle(camel) }

const camelToTitle = (camel) => {
  let chars = camel.split('')
  let b = []
  chars.map(c => {
    if (c === c.toUpperCase()) b.push(' ')
    b.push(c)
  })
  b[0] = b[0].toUpperCase()
  return b.join('')
}
