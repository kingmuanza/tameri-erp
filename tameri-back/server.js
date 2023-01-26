console.log('Le serveur se prépare');

const http = require('http');
const https = require('https');
const app = require('./app');
var fs = require('fs');

var privateKey = fs.readFileSync('key.pem', 'utf8');
var certificate = fs.readFileSync('server.crt', 'utf8');

var credentials = { key: privateKey, cert: certificate };

const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
const port = normalizePort(process.env.PORT ||  '3000');
// const port = normalizePort(process.env.PORT ||  '8080');
app.set('port', port);

const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    console.log(error);
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const server = http.createServer(app);
const serverSecure = https.createServer(credentials, app);

server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + address.port);
});

serverSecure.on('error', errorHandler);
serverSecure.on('listening', () => {
    const address = serverSecure.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('serverSecure Listening on ' + address.port);
    console.log(address);
});

server.listen('3000', '127.0.0.1', );
serverSecure.listen('3001', '127.0.0.1', );