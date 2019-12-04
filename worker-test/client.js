const worker = new Worker('worker.js');

worker.postMessage('hello from client')