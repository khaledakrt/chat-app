require('dotenv').config();
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const config = require('./config/index');
const connectMongo = require('./config/mongo');
const log = require('./log');
const io = require('./chat/io');

// Lier les fichiers SSL pour HTTPS
const privateKey = fs.readFileSync('./server.key', 'utf8');
const certificate = fs.readFileSync('./server.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };

// Serve static files from the React production build folder
const frontendPath = path.join(__dirname, 'public'); // Serve files from 'public'
app.use(express.static(frontendPath));

// Redirect HTTP requests to HTTPS
const httpServer = http.createServer((req, res) => {
  res.writeHead(301, { "Location": `https://${req.headers.host}${req.url}` });
  res.end();
});

httpServer.listen(80, () => {
  log.log('server', 'HTTP server is listening on port 80 (redirecting to HTTPS)');
});

// Create the HTTPS server
const server = https.createServer(credentials, app);

// Connect to MongoDB and start the chat
connectMongo();
io(server);

// Start the server
server.listen(config.server.port, err => {
  if (err) {
    log.err('server', 'could not start listening', err.message || err);
    process.exit();
  }
  log.log('env', `app starting in "${config.env}" mode...`);
  log.log('server', `HTTPS server is listening on ${config.server.port}...`);
});
