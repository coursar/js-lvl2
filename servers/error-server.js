import http from 'node:http';

let counter = 0;

const handler = (req, res) => {
  counter++;

  const url = new URL(req.url, `http://${req.headers.host}`);

  const amount = Number.parseInt(url.searchParams.get('amount'), 10);

  if (Number.isNaN(amount)) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      status: 'error',
      error: 'err.client',
      errors: {
        'amount': 'err.should_be_number',
      },
    }));
    return;
  }

  if (counter % 2 === 0) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      status: 'error',
      error: 'err.internal', // Max connection limit ... mysql database
    }));
    return;
  }

  const result = amount * 0.05;

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    status: 'ok',
    result, // shorthand properties -> result: result
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

const server = http.createServer(slow(cors(handler), 3000));

server.on('connection', (socket) => {
  socket.pipe(process.stdout);
});
server.listen(9999, () => {
  console.log('server listen at port 9999');
});

// node servers/log-server.js
