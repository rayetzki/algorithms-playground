import { Worker, isMainThread, workerData, threadId } from 'node:worker_threads';

class Semaphore {
  constructor(buffer, maxCount) {
    this.typedArray = new Int32Array(buffer);
    
    if (maxCount != null) {
      this.maxCount = maxCount;
      Atomics.store(this.typedArray, 0, maxCount);
    }
  }

  acquire() {
    while (true) {
      const value = Atomics.load(this.typedArray, 0);
      
      if (value === 0) {
        Atomics.wait(this.typedArray, 0, 0);
        continue;
      }

      if (Atomics.compareExchange(this.typedArray, 0, value, value - 1) === value) {
        break;
      }
    }
  }

  release() {
    Atomics.add(this.typedArray, 0, 1);
    Atomics.notify(this.typedArray, 0, 1);
  }
}

if (isMainThread) {
  const buffer = new SharedArrayBuffer(64);
  new Worker(import.meta.filename, { workerData: buffer });
  new Worker(import.meta.filename, { workerData: buffer });
} else {
  const typedArray = new Int32Array(workerData);
  const semaphore = new Semaphore(workerData, 1);

  semaphore.acquire();
  typedArray.set([threadId], 4);
  console.dir({ threadId, value: typedArray.at(4) });
  semaphore.release();
}