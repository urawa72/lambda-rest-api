import { handler } from '../create';
import * as todo from '../todos';

describe('invalid params', () => {
  (todo.createTodo as jest.Mock) = jest.fn().mockReturnValue(null);

  test('text is number', async () => {
    const res = await handler({
      body: JSON.stringify({ text: 12345, checked: false }),
    });
    expect(res.statusCode).toEqual(500);
  });

  test('text is boolean', async () => {
    const res = await handler({
      body: JSON.stringify({ text: false, checked: false }),
    });
    expect(res.statusCode).toEqual(500);
  });

  test('checked is number', async () => {
    const res = await handler({
      body: JSON.stringify({ text: 'test', checked: 12345 }),
    });
    expect(res.statusCode).toEqual(500);
  });

  test('checked is string', async () => {
    const res = await handler({
      body: JSON.stringify({ text: 'test', checked: 'test' }),
    });
    expect(res.statusCode).toEqual(500);
  });
});
