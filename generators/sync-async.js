const { readdir } = require('fs');

function run(generator) {
  const it = generator(go);
  function go(err, result) {
    if (err) it.throw(err);
    it.next(result);
  }
  go();
}

run(function* (done) {
  let firstFile;
  try {
    const dirFiles = yield readdir(';;;a122ad', done);
    firstFile = dirFiles[0];
  } catch (error) {
    firstFile = null;
  }
  console.log(firstFile);
});