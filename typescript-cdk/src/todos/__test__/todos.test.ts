import { createTodo, dynamoDb } from '../todos';

const tableName = 'todos-table';
const dummyUuid = '8f78ef00-e9df-4c41-bd7f-274e2ff92b05';
process.env.TODOS_TABLE_NAME = 'todos-table';

test('create todo', async () => {
  dynamoDb.put = jest.fn().mockReturnValue({ promise: jest.fn() });
  const todo = {
    id: dummyUuid,
    text: 'test',
    checked: false,
    createdAt: 1621687785852,
    updatedAt: 1621687785852,
  };
  await createTodo(todo);

  expect(dynamoDb.put).toHaveBeenCalledTimes(1);
  expect(dynamoDb.put).toHaveBeenCalledWith({
    TableName: tableName,
    Item: todo,
  });
});
