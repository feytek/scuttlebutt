var gossip = require('..')
var assert = require('assert')

var g1 = gossip()
var g2 = gossip()
var g3 = gossip()

function sync(g, h) {
  var s = g.createStream()
  var r = h.createStream()
  g.on('old_data', function (d) {
    console.log('old_data', d)
  })
  s.pipe(r).pipe(s)
  s.resume()
  r.resume()
}

sync(g1, g2)
sync(g2, g3)
sync(g3, g1)

//I like to have streams that work sync.
//if you can do that, you know it's tight.

var value = Math.random()

g1.set('key', value)

assert.equal(g3.get('key'), g1.get('key'))
assert.equal(g2.get('key'), g1.get('key'))

