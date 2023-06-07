import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import globalErrorHandler from './app/middleWares/globalErrorHandler';
import routes from './app/routes';

const app: Application = express();

// middleWares
app.use(cors());

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// Application Routes
app.use('/api/v1/', routes);

// Error Handling
app.use(globalErrorHandler);

export default app;
