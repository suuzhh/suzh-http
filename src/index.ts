import { create } from '@lib/index';

const client = create();

const { send } = client.get(
  new URL('https://jsonplaceholder.typicode.com/todos/1'),
  { query: { id: 1 } }
);

send().then((result) => {
  console.log(result);
});
