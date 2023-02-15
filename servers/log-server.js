import http from 'node:http';

const server = http.createServer((req, res) => {
  const body = '<h1>HTTP</h1>';

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(body);
});
server.on('connection', (socket) => {
  socket.pipe(process.stdout);
});
server.listen(9999, () => {
  console.log('server listen at port 9999');
});

// node servers/log-server.js
