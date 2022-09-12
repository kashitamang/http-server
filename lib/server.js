import net from 'net';
import chalk from 'chalk';

const logOut = (...args) => console.log(('[server]'), ...args);

export const serve = (host, port) => {

    const server = net.createServer((socket) => {
        logOut('A peer connected 👋')
        socket.on('data', (data) => {
            const dataStr = data.toString();
            logOut('📨 Got Data:', data.toString());
            const lines = dataStr.split('/n');
            const startLine = lines[0];
            const [method, path] = startLine.split(' ');

            if (method === 'GET' && path == '/') {
                const body = `<html>
                <main>
                <h1>Welcome to Hey World</h1>
                </main>
                </html>`;
                const getHome = `HTTP/1.1 200 Ok
Content-Length: ${body.length}
Content-Type: text/html; charset=UTF-8

${body}`;
        socket.write(getHome);
            } else if (method == 'GET' && path == '/posts') {
                const json = `[
            {
                "id": "1",
                "language": "French",
                "greeting": "allo"
            },
            {
                "id": "2",
                "language": "Polish",
                "greeting": "czeszi"
            },
            {
                "id": "3",
                "language": "Hindi",
                "greeting": "SuNo"
            }
]`; 
            const getPosts = `HTTP/1.1 200 Ok
Content-Type: application/json

${json}`;
                socket.write(getPosts);
            }
        });
    });

    server.listen(port, host, () => {
        logOut('🚀 Your server is up!');
    });
    logOut(`⌛ Trying to start your server...`);
    return server;
}