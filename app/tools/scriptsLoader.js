const scriptsLoader = (scripts, callback) => {

  const stampsLoaded = (scriptsLength) => {
    let c = 0
    return () => {
      if (++c >= scriptsLength) callback()
    }
  }

  const scriptInserter = (callback) => {
    let head = document.getElementsByTagName('head')[0]
    return (uri) => {
      let script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = uri
      script.onreadystatechange = callback
      script.onload = callback
      head.appendChild(script)
    }
  }

  let inserts = scriptInserter(stampsLoaded(scripts.length))
  scripts.map(s => { inserts(s) })
}
