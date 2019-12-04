const worker = new Worker('/worker-test/worker.js');

worker.postMessage('hello from client')