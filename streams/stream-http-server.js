import http from 'node:http';
import { Transform } from 'node:stream';

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1;
        console.log(transformed);
        callback(null, transformed.toString());
    }
}

const server = http.createServer((req, res) => {

    const { method, url } = req;

    if (method === 'POST' && url === '/invert') {
        req.pipe(new InverseNumberStream())
        .pipe(res);
    }
    else {
        res.writeHead(404).end('Not Found');
    }

});

server.listen(3334);