import * as DynamoDB from 'aws-sdk/clients/dynamodb';
import { getLogger } from './logger';

const logger = getLogger();

const getTableName = () => process.env.TODOS_TABLE_NAME ?? '';

export const dynamoDb = new DynamoDB.DocumentClient({
  service: new DynamoDB({
    apiVersion: '2012-10-08',
    region: 'ap-northeast-1',
  }),
});

export interface Todo {
  id: string;
  text: string;
  checked: boolean;
  createdAt: number;
  updatedAt: number;
}

export const createTodo = async (todo: Todo): Promise<void> => {
  const params: DynamoDB.DocumentClient.PutItemInput = {
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
