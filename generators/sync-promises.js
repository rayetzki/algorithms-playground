function askFoo() {
  return new Promise((resolve) => {
    resolve('foo');
  });
}

function run(generator) {
  const it = generator();
  function go(result) {
    if (result.done) return result.value;
    return result.value.then(
      (value) => go(it.next(value)),
      (error) => go(it.throw(error)),
    );
  };
  go(it.next());
}

run(function* () {
  const foo = yield askFoo();
  console.log(foo);  
});
