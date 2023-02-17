import http from 'node:http';

let counter = 0;

const handler = (req, res) => {
  counter++;

  const url = new URL(req.url, `http://${req.headers.host}`);

  const amount = url.searchParams.get('amount');

  if (counter % 2 === 0) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      status: 'error',
      error: 'err.internal', // Max connection limit ... mysql database
    }));
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
  const {origin} = req.headers;
  if (!origin) {
    next(req, res);
    return;
  }

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': '*',
  };

  Object.entries(headers).forEach(([k, v]) => {
    res.setHeader(k, v);
  });

  next(req, res);
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
