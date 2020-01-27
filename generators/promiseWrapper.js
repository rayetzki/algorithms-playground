const fetch = require('node-fetch')

async function* handlePromisesGenerator(arrayOfLinks) {
    for (let promise of arrayOfLinks) {
        const promiseResult = await promise
        if (promiseResult.status === 200) {
            yield { response: await promiseResult.json(), status: 'resolved' }
        } else {
            yield { response: await promiseResult.json(), status: 'rejected' }
        }
    }
}

const arrayOfLinks = []

for (let i = 1; i <= 100; i++) {
    arrayOfLinks.push(fetch(`https://jsonplaceholder.typicode.com/todos/${i}`))
}

(async () => {
    try {
        for await (let promise of handlePromisesGenerator(arrayOfLinks)) {
            console.log(promise)
        }
    } catch(error) {
        throw new Error(error)
    }
})()
