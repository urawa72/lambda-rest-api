import { handler } from '../create';
import * as todo from '../todos';

const dummyUuid = '8f78ef00-e9df-4c41-bd7f-274e2ff92b05';
jest.mock('uuid', () => ({
  v4: () => {
    return dummyUuid;
  },
}));

describe('valid params', () => {
  test('success create (text is not empty)', async () => {
    (todo.createTodo as jest.Mock) = jest.fn().mockReturnValue(null);

    const res = await handler({
      body: JSON.stringify({ text: 'test', checked: false }),
    });
    const body = JSON.parse(res.body);

    expect(res.statusCode).toEqual(200);
    expect(body).toEqual({
      id: dummyUuid,
      text: 'test',
      checked: false,
      createdAt: expect.any(Number),
      updatedAt: expect.any(Number),
    });
  });

  test('success create (text is empty)', async () => {
    (todo.createTodo as jest.Mock) = jest.fn().mockReturnValue(null);

    const res = await handler({
      body: JSON.stringify({ text: '', checked: false }),
    });
    const body = JSON.parse(res.body);

    expect(res.statusCode).toEqual(200);
    expect(body).toEqual({
      id: dummyUuid,
      text: '',
      checked: false,
      createdAt: expect.any(Number),
      updatedAt: expect.any(Number),
    });
  });
});

describe('invalid params', () => {
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
});
