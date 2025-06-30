//process.stdin
//.pipe(process.stdout);

import { Readable, Writable, Transform } from 'node:stream';

class OnetoHundredStream extends Readable {
    constructor() {
        super();
        this.index = 1;
    }

    _read() {
        const i = this.index++;
        if (i > 100) {
            this.push(null);
        } else {
            const buf = Buffer.from(String(i) + '\n');
            this.push(buf);
        }
    }
}

class MultiplicaPorDezStream extends Transform {
    _transform(chunk, encoding, callback) {
        const result = Number(chunk.toString()) * 10;
        callback(null, Buffer.from(String(result) + '\n'));
    }
}

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1;
        callback(null, Buffer.from(String(transformed) + '\n'));
    }
}

new OnetoHundredStream()
    .pipe(new MultiplicaPorDezStream())
    .pipe(new InverseNumberStream())
    .pipe(process.stdout);
