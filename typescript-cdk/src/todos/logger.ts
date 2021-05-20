import * as log4js from 'log4js';

log4js.configure({
  appenders: {
    out: {
      type: 'console',
      layout: {
        type: 'pattern',
        pattern: '[%p] %m',
      },
    },
  },
  categories: {
    default: {
      appenders: ['out'],
      level: 'info',
    },
  },
});

export const getLogger = (category?: string): log4js.Logger => {
  return log4js.getLogger(category);
};
