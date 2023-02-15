// node.js
// npm init -> package.json -> "type": "module"
import net from 'node:net';
// localhost:9999 -> http://...
const server = net.createServer((socket) => {
  const buffers = [];
  // EventEmitter
  socket.on('data', (data) => {
    buffers.push(data);
  });
  socket.on('end', () => {
    const request = Buffer.concat(buffers).toString('utf8');
    console.log(request);
  });

  const body = '<h1>Ok!</h1>';

  socket.write('HTTP/1.1 200 OK\r\n');
  socket.write('Content-Type: text/html\r\n');
  socket.write(`Content-Length: ${body.length}\r\n`);
  socket.write('Connection; close\r\n');
  socket.write('\r\n')
  socket.write(body);
  socket.end();
});

// 127.0.0.1 / localhost
server.listen(9999, () => {
  console.log('server listen at port 9999');
});

// сервер - IP, TCP Port 0-..., 1024
// client - IP, TCP Port -> dynamic
