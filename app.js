const cluster = require('cluster');
cluster.schedulingPolicy = cluster.SCHED_RR; // road balancer setting
const http = require('http');
const numCPUs = require('os').cpus().length;


if (cluster.isMaster) {
  console.log(`master ${process.pid} is running!!!`);

  // create worker(s) as the number of CPU core by forking cluster
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // catch the end of worker
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died...`);
    console.log(`exit ${code} : ${signal}`);
    // create a worker when an unexpected end occur
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      cluster.fork();
    }
  });
} else {
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end(`hello world ${process.pid} \n`);
  }).listen(8000);

  console.log(`worker ${process.pid} started`);
}