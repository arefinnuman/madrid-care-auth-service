import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { errorLogger, logger } from './shared/logger';

const usingPort = config.port;
const dataBaseUrl = config.database_url as string;

async function bootstrap() {
  try {
    await mongoose.connect(dataBaseUrl);
    logger.info(`DataBase Connected`);
    app.listen(usingPort, () => {
      logger.info(`Madrid Care running on ${usingPort}`);
    });
  } catch (error) {
    errorLogger.error(`Failed to connect`, error);
  }
}

bootstrap();
