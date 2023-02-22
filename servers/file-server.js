import http from 'node:http';
import fs from 'node:fs';
import crypto from 'node:crypto';

let count = 1;

const handler = (req, res) => {
  if (count++ % 2 === 0) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      status: 'error',
    }));
    return;
  }

  if (req.bodyType?.startsWith('image/')) {
    // TODO: define extension
    const uuid = crypto.randomUUID();
    const filename = `images/${uuid}.png`;

    fs.writeFile(filename, req.body, (err) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
          status: 'error',
        }));
        return;
      }

      // TODO handle error
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({
        status: 'ok',
        filename,
      }));
    });
    return;
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    status: 'ok',
  }));
};

// middleware
const cors = (next) => (req, res) => {
  const { origin } = req.headers;
  if (!origin) {
    next(req, res);
    return;
  }

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*',
  };

  if (req.method !== 'OPTIONS') {
    Object.entries(headers).forEach(([k, v]) => res.setHeader(k, v));
    next(req, res);
    return;
  }

  // req.method === OPTIONS
  Object.entries(headers).forEach(([k, v]) => res.setHeader(k, v));
  res.statusCode = 204;
  res.end();
};

const slow = (next, timeout) => (req, res) => {
  setTimeout(() => next(req, res), timeout);
};

const image = (next) => (req, res) => {
  // Content-Type: image/* -> image/png, image/jpeg
  if (!req.headers['content-type']?.startsWith('image/')) {
    next(req, res);
    return;
  }

  const buffers = [];
  // EventEmitter
  req.on('data', (data) => {
    buffers.push(data);
  });
  req.on('end', () => {
    // TODO: magic numbers
    const body = Buffer.concat(buffers);
    req.body = body;
    req.bodyType = req.headers['content-type'];
    next(req, res);
  });
};

const server = http.createServer(slow(cors(image(handler)), 3000));

server.on('connection', (socket) => {
  socket.pipe(process.stdout);
});
server.listen(9999, () => {
  console.log('server listen at port 9999');
});

// node servers/log-server.js
