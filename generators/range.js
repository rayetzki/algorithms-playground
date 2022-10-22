function* range(from, to) {
  for (let i = from; i <= to; i++) {
    yield i;
  }
}

for (const int of range(5, 10)) {
  console.log(int);
}