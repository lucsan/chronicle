const headless = (draws) => {
  const build = () => {
    const charLoc = draws.character.location
    const loc = draws.places[charLoc]


    console.log('headless stage built for ' + draws.character.name)
    console.log(`you are at ${charLoc} - ${loc.desc}`)
    console.log(`%cThe exits are ${loc.exits.map(e => e.to)}`, 'color:brown')
    let props = draws.tools.propsAtLoc(charLoc, draws.decor)
    console.log(`You can see things ${props}`)

  }

  const move = (d) => {
    console.groupCollapsed(`%cmove to ${d.to}`, 'color: blue')
    console.log(d)

    const charLoc = draws.character.location
    const loc = draws.places[charLoc]

    console.log(`you are at ${charLoc} - ${loc.desc}`)
    console.log(`The exits are ${loc.exits.map(e => e.to)}`)

    props = draws.tools.propsAtLoc(charLoc, draws.decor)
    console.log(`you can see things ${props}`)
    console.groupEnd()

  }

  const combine = (d) => { console.log(d) }

  const update = (d) => {
    console.log(d)
    if (d.type == 'prose') console.log(draws.places[d.code].prose)
  }

  const look = (d) => { console.log(`You look at ${draws.decor[d.code].desc}`, d)}

  const prop = (d) => {
    console.log(`You took 🤜 ${d.code} ${draws.decor[d.code].desc} from ${d.from} to ${d.to} `)
  }

  const remark = (d) => {
    console.log(`%c${d.msg}`, 'color:green;font-weight:bold;')
  }

  return {
    build,
    move,
    look,
    prop,
    update,
    combine,
    remark
  }
}
