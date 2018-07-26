const cp = require('child_process');

function pipe(process, argv, stdin) {
  return new Promise((resolve, reject) => {
    let sp;
    try {
      sp = cp.spawn(process, argv);
    } catch(err) {
      console.error(err);
      reject(err);
      return;
    }
    let stdout = [];
    let stderr = [];
    sp.stdout.on('data', (bit) => {
      stdout.push(bit);
    });
    sp.stderr.on('data', (bit) => {
      stderr.push(bit);
    });
    sp.stdin.write(stdin);
    sp.stdin.end();
    sp.on('close', (code) => {
      resolve({code, stdout: Buffer.concat(stdout), stderr: Buffer.concat(stderr)});
    });
    sp.on('error', (err) => {
      console.error(err);
      reject(err);
    });
  });
}


const handlers = [
  {
    language: 'python',
    name: 'black',
    async process({content, width}) {
      const resp = await pipe('/usr/bin/env', ['black', '-l', width, '-'], content);
      if(resp.code != 0) {
        return {
          error: resp.stderr.toString(),
        };
      }
      return {
        content: resp.stdout.toString(),
      };
    }
  },
];

module.exports = handlers;