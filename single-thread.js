// const os = require('os');
// const numCPUs = os.cpus();
// console.log(numCPUs + ' core cpu.');

const fs = require('fs');

fs.readFile(__dirname + '/data.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data.toString('utf-8'));
});

console.log('continue without blocking')