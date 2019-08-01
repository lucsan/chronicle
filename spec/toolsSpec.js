describe('Tools', () => {

  it('Removees first occurance of an item in an array', () => {
    const ray = ['bucket', 'spade', 'lobster', 'lobster', 'sand']
    const rem = 'lobster'
    const a = slide(rem, ray)

    expect(a.length).toBe(4)
    expect(a[0]).toBe('bucket')
    expect(a[2]).toBe('lobster')
    expect(a[3]).toBe('sand')
  })

})
