import net from 'net';

const logOut = (...args) => {
    if(process.env['NODE_ENV'] !== 'test') {
        console.log(('[server]'), ...args)
    };
}

export const serve = (host, port) => {

    const server = net.createServer((socket) => {
        logOut('A peer connected 👋')
        socket.on('data', (data) => {
            const dataStr = data.toString();
            logOut('📨 Got Data:', data.toString());
            const lines = dataStr.split('/n');
            const startLine = lines[0];
            const [method, path] = startLine.split(' ');

            if (method == 'GET' && path == '/') {
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
                "greeting": "suNo"
            }
]`; 
            const getPosts = `HTTP/1.1 200 Ok
Content-Type: application/json

${json}`;
                socket.write(getPosts);
            } else if (method === 'POST' && path == '/mail') {
            const postMail = `HTTP/1.1 204 No Content
Content-Length: 0
Host: http://localhost:8080/mail

`;
                socket.write(postMail);
            } else {
                const anythingElse = `HTTP/1.1 404 Not Found
Accept: text/html, application/json
Content-Length: 0 
Host: http://localhost:8080/?

`;
                socket.write(anythingElse);
            };
        });
    });

    server.listen(port, host, () => {
        logOut('🚀 Your server is up!');
    });
    logOut(`⌛ Trying to start your server...`);
    return server;
}