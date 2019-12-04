if(!self.fetch) {
  self.importScripts('https://polyfill.io/v3/polyfill.min.js?features=fetch%2CPromise')
}
self.addEventListener("message", function(ev) {
  console.log('post message data', ev.data)
  self.fetch('/').then(function(response){
    return response.text().then(function(data){
      console.log('fetch response', data.replace(/\n/g, ''))
    })
  }).catch(function(err) {
    console.log('fetch failed', err)
  })
});