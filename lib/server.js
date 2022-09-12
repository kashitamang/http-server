import net from 'net';
import chalk from 'chalk';

const logOut = (...args) => console.log(('[server]'), ...args);

export const serve = (host, port) => {

    const server = net.createServer((socket) => {
        logOut('A peer connected 👋')
        socket.on('data', (data) => {
            logOut('📨 Got Data:', data.toString());
            socket.write('📖 You sent' + data.toString().toUpperCase());
        });
    });
    server.listen(port, host, () => {
        logOut('🚀 Your server is up!');
    });
    logOut(`⌛ Trying to start your server...`);
    return server;
}