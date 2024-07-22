import { create } from '@lib/index';

const client = create();

const { send, abort } = client.get(
  'https://jsonplaceholder.typicode.com/todos/1'
);

send().then((res) => {
  console.log(res);
});

abort();

const res = await send();

console.log('2', res);

send().then((res) => {
  console.log('3', res);
});
abort();

await client.get('https://jsonplaceholder.typicode.com/todos/2').send();
