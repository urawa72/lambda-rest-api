import { handler } from '../get';
import * as todo from '../todos';

describe('valid path parameter', () => {
  test('todoId is string', async () => {
    const item = {
      id: '8f78ef00-e9df-4c41-bd7f-274e2ff92b05',
      text: 'test',
      checked: false,
      createdAt: 1621687785852,
      updatedAt: 1621687785852,
    };
    (todo.getTodo as jest.Mock) = jest.fn().mockReturnValue(item);

    const res = await handler({
      pathParameters: { todoId: '8f78ef00-e9df-4c41-bd7f-274e2ff92b05' },
    });
    const body = JSON.parse(res.body);
    expect(res.statusCode).toEqual(200);
    expect(body).toEqual(item);
  });
});
