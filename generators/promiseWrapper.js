const fetch = require("node-fetch");

async function* handlePromisesGenerator(arrayOfLinks) {
  for (let promise of arrayOfLinks) {
    try {
      const response = await promise;
      if (response) {
        yield {
          response: response.json(),
          status: "resolved",
        };
      }
    } catch (error) {
      yield { response: error.message, status: "rejected" };
    }
  }
}

const arrayOfLinks = [];
for (let i = 1; i <= 100; i++) {
  arrayOfLinks.push(fetch(`https://jsonplaceholder.typicode.com/todos/${i}`));
}

(async () => {
  for await (let promise of handlePromisesGenerator(arrayOfLinks)) {
    console.log(promise);
  }
})();
