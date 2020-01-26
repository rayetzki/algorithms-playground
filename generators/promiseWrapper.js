const fetch = require('node-fetch')

const promiseCollection = []
const handledPromiseCollection = []

for (let i = 1; i <= 9; i++) {
    promiseCollection.push(`https://jsonplaceholder.typicode.com/todos/${i}`)
}

async function* handlePromisesGenerator(promiseArr) {
    let handledPromise
    for (let promise of promiseArr) {
        handledPromise = await fetch(promise)
        if (handledPromise.status === 200) {
            handledPromiseCollection.push(yield { response: await handledPromise.json(), status: 'resolved' })
        } else {
            handledPromiseCollection.push(yield { response: await handledPromise.json(), status: 'rejected' })
        }
    }
}

(async () => {
    try {
        console.time()
        for await (let promise of handlePromisesGenerator(promiseCollection)) {
            console.log(promise)
        }
        console.timeEnd()
    } catch(error) {
        throw new Error(error)
    }
})()