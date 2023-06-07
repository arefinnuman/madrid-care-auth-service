import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { errorLogger, logger } from './shared/logger';

const databaseUrl = config.database_url as string;
const usingPort = config.port;

process.on('uncaughtException', error => {
  errorLogger.error(error);
  process.exit(1);
});

let server: Server;

async function bootstrap() {
  try {
    await mongoose.connect(databaseUrl);
    logger.info(`Database Connected`);

    server = app.listen(usingPort, () => {
      logger.info(`Madrid Care running on port ${usingPort}`);
    });
  } catch (error) {
    errorLogger.error(`Failed to connect`, error);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}
bootstrap();

process.on(`SIGTERM`, () => {
  logger.info(`SIGTERM is received`);
  if (server) {
    server.close();
  }
});
