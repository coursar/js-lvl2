import http from 'node:http';

let counter = 0;

const handler = (req, res) => {
  counter++;

  const body = '<h1>HTTP</h1>';

  const url = new URL(req.url, `http://${req.headers.host}`);

  const amount = url.searchParams.get('amount');

  if (counter % 2 === 0) {
    res.statusCode = 400;
  } else {
    res.statusCode = 200;
  }

  res.setHeader('Content-Type', 'text/html');
  res.end(body);
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
