console.log('--> container')

let Container = function(x) { this.__value = x }
Container.of = function(x) { return new Container(x) }
Container.prototype.map = function(f) { return Container.of(f(this.__value)) }



let a = Container.of(3).map((num) => { return num + 4 })

//console.log(a)

//console.log(Container(3))
