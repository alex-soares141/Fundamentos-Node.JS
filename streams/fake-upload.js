import { Readable } from 'node:stream';
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

fetch('http://localhost:3334/users', {
    method: 'POST',
    body: new OnetoHundredStream(),
});