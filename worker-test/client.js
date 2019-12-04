const worker = new Worker('/worker-test/worker.js');

worker.postMessage('hello from client')

window.fetch('/').then(function(response){
  return response.text().then(function(data){
    console.log('response', data.replace(/\n/g, ''))
  })
}).catch(function(err) {
  console.log('failed', err)
})
