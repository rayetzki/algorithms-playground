const fetch = require('node-fetch')

async function* handlePromisesGenerator(promiseArr, fetch) {
    let handledPromise
    const handledPromiseCollection = []

    for (let promise of promiseArr) {
        handledPromise = await fetch(promise)
        if (handledPromise.status === 200) {
            handledPromiseCollection.push(yield { response: await handledPromise.json(), status: 'resolved' })
        } else {
            handledPromiseCollection.push(yield { response: await handledPromise.json(), status: 'rejected' })
        }
    }
}

const promiseCollection = []

for (let i = 1; i <= 9; i++) {
    promiseCollection.push(`https://jsonplaceholder.typicode.com/todos/${i}`)
}

(async () => {
    try {
        for await (let promise of handlePromisesGenerator(promiseCollection, fetch)) {
            console.log(promise)
        }
    } catch(error) {
        throw new Error(error)
    }
})()