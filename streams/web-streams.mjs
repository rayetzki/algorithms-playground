import { randomFill } from 'node:crypto';
import { ReadableStream, WritableStream, TransformStream } from 'node:stream/web';
import { setInterval as every } from 'node:timers/promises';

const SECOND = 1000;

// Read stream; Throw timestamp each second

const readStream = new ReadableStream({
  async start(controller) {
    for await (const _ of every(SECOND)) {
      controller.enqueue(performance.now());
    }
  }
});

// for await (const chunk of readStream) {
//   console.log(chunk);
// }


// Byob stream; Provide buffer and fill it with random data;

const byobStream = new ReadableStream({
  type: 'bytes',
  pull(controller) {
    const { byobRequest } = controller;
    return new Promise((resolve, reject) => {
      randomFill(byobRequest.view, (err) => {
        if (err) reject(err);
        byobRequest.respond(byobRequest.view.byteLength);
        resolve();
      });
    });
  },
});

const byobReader = byobStream.getReader({ mode: 'byob' });

console.log(await byobReader.read(new Uint8Array(10)));

// Simple write stream;
const writeStream = new WritableStream({
  write(chunk) {
    console.log(chunk);
  }
});

const writable = writeStream.getWriter();
await writable.write('Hello world!');


// Transform stream example

const transform = new TransformStream({
  transform(chunk, controller) {
    controller.enqueue(chunk.toUpperCase());
  }
});

const writer = transform.writable.getWriter();
const reader = transform.readable.getReader();

writer.write('Hello World!');
console.log(await reader.read())

// Can also consist of separate reader, writer, transformer
// reader.pipeThrough(tranform).pipeThrough(writer)

