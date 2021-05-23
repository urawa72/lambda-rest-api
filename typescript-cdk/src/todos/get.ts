import { getLogger } from './logger';
import { getTodo } from './todos';

const logger = getLogger();

interface Event {
  pathParameters: {
    todoId: string;
  };
}

interface HttpResponse {
  statusCode: number;
  body: string;
}

export const handler = async (event: Event): Promise<HttpResponse> => {
  logger.info('event', JSON.stringify(event));
  const todoId = event.pathParameters.todoId;

  try {
    const res = await getTodo(todoId);
    return {
      statusCode: 200,
      body: JSON.stringify(res),
    };
  } catch (e) {
    logger.error(e);
    return {
      statusCode: 500,
      body: 'internal server error',
    };
  }
};
