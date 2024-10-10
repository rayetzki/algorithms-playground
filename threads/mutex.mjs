import { isMainThread, Worker, workerData, threadId } from 'node:worker_threads';
import { getRandomValues } from 'node:crypto';

const UNLOCKED = 0;
const LOCKED = 1;

class Mutex {
  constructor(buffer) {
    this.typedArray = new Int32Array(buffer);
    this.isOwner = false;
  }

  lock() {
    while (true) {
      const value = Atomics.load(this.typedArray, 0);
      
      if (value === LOCKED) {
        Atomics.wait(this.typedArray, 0, LOCKED);
        continue;
      }

      if (Atomics.compareExchange(this.typedArray, 0, UNLOCKED, LOCKED) === UNLOCKED) {
        this.isOwner = true;
        break;
      }
    }
  }

  unlock() {
    if (!this.isOwner) {
      throw new Error('Thread that tries to unlock the mutex is not the owner of the mutex');
    }
    Atomics.store(this.typedArray, 0, UNLOCKED);
    Atomics.notify(this.typedArray, 0, 1);
    this.isOwner = false;
  }
}

if (isMainThread) {
  const buffer = new SharedArrayBuffer(12);
  new Worker(import.meta.filename, { workerData: buffer });
  new Worker(import.meta.filename, { workerData: buffer });
} else {
  const typedArray = new Int8Array(workerData);
  const mutex = new Mutex(workerData);
  // Critical section start
  mutex.lock();
  typedArray.set([getRandomValues(new Int8Array([1]))], 4);
  console.dir({ threadId, value: typedArray.at(4) });
  mutex.unlock();
  // End of critical section
}