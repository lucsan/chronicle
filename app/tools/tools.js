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

const slide = (i, a) => { return removeFirstOccurance(i, a) }

const removeFirstOccurance = (i, [...a]) => {
  a.splice(a.indexOf(i), 1)
  return a
}
