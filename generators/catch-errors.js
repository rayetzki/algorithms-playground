function* upper(items) { 
  for (const i of items) {
    try {
      yield i.toUpperCase();
    } catch (error) {
      yield null;
    }
  }
}

const bad_items = ['a', 'B', 1, 'c'];
for (const item of upper(bad_items)) {
  console.log(item);
}