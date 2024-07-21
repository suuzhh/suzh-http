import { buildResult, create } from '@lib/index';

const request = () => {
  return fetch('https://2jsonplaceholder.typicode.com/todos/1');
};

const res = await buildResult(request);
console.log(res.is_ok, res.unwrap());

const client = create();

const { data, error } = await client.get('https://2jsonplaceholder.typicode.com/todos/1');
