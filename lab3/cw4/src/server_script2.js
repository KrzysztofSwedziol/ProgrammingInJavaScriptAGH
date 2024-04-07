import http from 'node:http';
import { URL } from 'node:url';
import { readFileSync, writeFileSync, existsSync, appendFileSync } from 'node:fs';

const guestBookFileName = 'guestbook.txt'; 


function loadGuestBookEntries() {
    if (existsSync(guestBookFileName)) {
        return readFileSync(guestBookFileName, { encoding: 'utf8' });
    }
    return '';
}


function addGuestBookEntry(name, content) {
    const entry = `${name}
${content}

`;
    appendFileSync(guestBookFileName, entry, { encoding: 'utf8' });
}

function requestListener(request, response) {
    const url = new URL(request.url, `http://${request.headers.host}`);
    switch ([request.method, url.pathname].join(' ')) {
        case 'GET /':
            // Load previous entries
            const entries = loadGuestBookEntries();
            response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            response.write(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Guest Book</title>
</head>
<body>
    <h1>Guest Book</h1>
    <pre>${entries}</pre>
    <h2>New entry:</h2>
    <form method="POST">
        <label for="name">Your name:</label><br>
        <input type="text" id="name" name="name" required><br>
        <label for="content">Entry content:</label><br>
        <textarea id="content" name="content" rows="4" required></textarea><br>
        <input type="submit" value="Submit">
    </form>
</body>
</html>
            `);
            response.end();
            break;
        case 'POST /':
            let body = '';
            request.on('data', chunk => {
                body += chunk.toString(); // convert Buffer to string
            });
            request.on('end', () => {
                const params = new URLSearchParams(body);
                const name = params.get('name');
                const content = params.get('content');
                addGuestBookEntry(name, content);
                response.writeHead(303, { 'Location': '/' }); // Redirect back to the guest book page
                response.end();
            });
            break;
        default:
            response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            response.write('Error 404: Not Found');
            response.end();
    }
}

const server = http.createServer(requestListener);
server.listen(8000);
console.log('Server is running on http://localhost:8000');