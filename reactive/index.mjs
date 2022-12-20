import { mergeMap, of, catchError } from 'rxjs';

const requestStream = of('https://jsonplaceholder.typicode.com/todos/1');

requestStream.pipe(
  mergeMap(url => of(fetch(url))),
).subscribe(async response => {
  const data = await response.then(r => r.json());
  console.log(data);
});