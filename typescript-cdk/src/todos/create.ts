import * as uuid from 'uuid';
import { Todo, createTodo } from './todos';
import { getLogger } from './logger';

const logger = getLogger();

interface Event {
  body: string;
}

interface HttpResponse {
  statusCode: number;
  body: string;
}

export const handler = async (event: Event): Promise<HttpResponse> => {
  logger.info('event', JSON.stringify(event));

  const data = JSON.parse(event.body);
  const timestamp = new Date().getTime();
  const todo: Todo = {
    id: uuid.v4(),
    text: data.text,
    checked: false,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  try {
    if (typeof data.text !== 'string') {
      logger.error('Validation Faild');
      throw new Error('Text must be string');
    }
    await createTodo(todo);
    return {
      statusCode: 200,
      body: JSON.stringify(todo),
    };
  } catch (e) {
    logger.error(e);
    return {
      statusCode: 500,
      body: 'internal server error',
    };
  }
};
