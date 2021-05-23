import * as AWS from 'aws-sdk';
import { getLogger } from './logger';

const logger = getLogger();
const getTableName = () => process.env.TODOS_TABLE_NAME ?? '';
const dynamoDb = new AWS.DynamoDB.DocumentClient();

export interface Todo {
  id: string;
  text: string;
  checked: boolean;
  createdAt: number;
  updatedAt: number;
}

export const getTodo = async (todoId: string): Promise<Todo | null> => {
  const params: AWS.DynamoDB.DocumentClient.GetItemInput = {
    TableName: getTableName(),
    Key: { id: todoId },
  };

  try {
    const res = await dynamoDb.get(params).promise();
    return (res.Item as Todo) ?? null;
  } catch (e) {
    logger.error('DynamoDB error');
    throw e;
  }
};

export const createTodo = async (todo: Todo): Promise<void> => {
  const params: AWS.DynamoDB.DocumentClient.PutItemInput = {
    TableName: getTableName(),
    Item: todo,
  };

  try {
    await dynamoDb.put(params).promise();
  } catch (e) {
    logger.error('DynamoDB error');
    throw e;
  }
};
