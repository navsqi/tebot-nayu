require('dotenv').config();
const http = require('http');
const wakeUp = require('./wakeUp');

require('./telegraf');

const port = process.env.PORT || 3131;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  res.end('Hello, please go back to the telegram bot');
});

server.listen(port, () => {
  wakeUp(process.env.BASE_URL);
});
