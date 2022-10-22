function* factorial(limit) {
  for (let i = 1, acc = 1; i <= limit; i++) {  
    yield acc *= i;
  }
}

for (const n of factorial(5)) {
  console.log(n);
}