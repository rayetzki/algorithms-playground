import { Worker, isMainThread, workerData, threadId } from 'node:worker_threads';

if (isMainThread) {
  const buffer = new SharedArrayBuffer(12);
  new Worker(import.meta.filename, { workerData: buffer });
  new Worker(import.meta.filename, { workerData: buffer });
} else {
  const typedArray = new Int32Array(workerData);
  const itemIndex = 0;

  if (threadId !== 1) {
    Atomics.wait(typedArray, itemIndex, 0);
  }

  const value = Atomics.store(typedArray, itemIndex, threadId);
  Atomics.notify(typedArray, itemIndex);

  console.dir({ threadId, value });
}