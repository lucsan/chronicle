describe('expr', () => {

  it('Removees first occurance of an item in an array', () => {
    const ray = ['bucket', 'spade', 'lobster', 'lobster', 'sand']
    const rem = 'lobster'
    const a = removeFirstOccurance(rem, ray)
    console.log(a, ray)

    expect(a.length).toBe(4)
    expect(a[0]).toBe('bucket')
    expect(a[2]).toBe('lobster')
    expect(a[3]).toBe('sand')
  })

  const removeFirstOccurance = (i, [...a]) => {
    a.splice(a.indexOf(i), 1)
    return a
  }


})
