//Dependencies
const http = require('http');
const app = require('./app');
//Port
const port = process.env.port || 3000;
//Start server
const server = http.createServer(app);
server.listen(port);