import * as AWS from 'aws-sdk';
import * as todo from '../todos';

jest.mock('aws-sdk', () => {
  const mDocumentClient = {
    put: jest.fn(),
    get: jest.fn(),
  };
  const mDynamoDB = { DocumentClient: jest.fn(() => mDocumentClient) };
  return { DynamoDB: mDynamoDB };
});
const mockDynamoDb = new AWS.DynamoDB.DocumentClient();

const tableName = 'todos-table';
process.env.TODOS_TABLE_NAME = 'todos-table';

test('get todo', async () => {
  const item = {
    id: '8f78ef00-e9df-4c41-bd7f-274e2ff92b05',
    text: 'test',
    checked: false,
    createdAt: 1621687785852,
    updatedAt: 1621687785852,
  };
  mockDynamoDb.get = jest.fn().mockReturnValue({
    promise: jest.fn(() => {
      return {
        Item: item,
      };
    }),
  });
  const todoId = '8f78ef00-e9df-4c41-bd7f-274e2ff92b05';
  const res = await todo.getTodo(todoId);

  expect(mockDynamoDb.get).toHaveBeenCalledTimes(1);
  expect(mockDynamoDb.get).toHaveBeenCalledWith({
    TableName: tableName,
    Key: { id: todoId },
  });
  expect(res).toEqual(item);
});

test('create todo', async () => {
  mockDynamoDb.put = jest.fn().mockReturnValue({
    promise: jest.fn(),
  });
  const params = {
    id: '8f78ef00-e9df-4c41-bd7f-274e2ff92b05',
    text: 'test',
    checked: false,
    createdAt: 1621687785852,
    updatedAt: 1621687785852,
  };
  await todo.createTodo(params);

  expect(mockDynamoDb.put).toHaveBeenCalledTimes(1);
  expect(mockDynamoDb.put).toHaveBeenCalledWith({
    TableName: tableName,
    Item: params,
  });
});
