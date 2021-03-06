var STATUS_CODES = require('http').STATUS_CODES

module.exports = Response

function Response(status, headers, body) {
  this.status = status
  this.headers = headers
  this.body = body
}

function getter(name, fn) {
  Object.defineProperty(Response.prototype, name, {get: fn})
}

getter('statusType', function() {
  return this.status / 100 | 0
})

getter('statusText', function() {
  return STATUS_CODES[this.status]
})

getter('ok', function() {
  return this.statusType == 2
})

getter('clientError', function() {
  return this.statusType == 4
})

getter('serverError', function() {
  return this.statusType == 5
})

getter('mime', function() {
  return (this.headers['content-type'] || '').split(/ *; */)[0]
})

getter('charset', function() {
  var type = this.headers['content-type'] || ''
  var m = /\bcharset=([^;]+)/i.exec(type)
  return m && trim('"', m[1].trim())
})

function trim(char, str) {
  if (str[0] == char) str = str.slice(1)
  var last = str.length - 1
  if (str[last] == char) str = str.slice(0, last)
  return str
}