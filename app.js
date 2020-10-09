const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`master ${process.pid} is running`);

  // create worker(s) as the number of CPU core by forking cluster
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // catch the end of worker
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
  }).listen(8000);

  console.log(`worker ${process.pid} started`);
}