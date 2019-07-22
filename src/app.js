import 'dotenv/config';

import express from 'express';
import 'express-async-errors';
import path from 'path';
import cors from 'cors';
import * as Sentry from '@sentry/node';
import Youch from 'youch';

import routes from './routes';

import sentryConfig from './config/sentry';

import './database';

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig);
    this.middleware();
    this.routes();
    this.exceptionHandler();
  }

  middleware() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    /**
     * When a middleware receives 4 params node automatic understands that a
     * exception handler.
     */
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'developement') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
