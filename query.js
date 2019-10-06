function query(text, callback) {
  'use strict'
  process.stdin.resume()
  process.stdout.write(text)
  
  return new Promise(res => {
    process.stdin.once('data', function(data) {
      res(callback(data.toString().trim()))
    })
  })
}

module.exports = query
