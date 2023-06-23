import express, { Application } from 'express';
import cors from 'cors';
const app: Application = express();

import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routes);

// // Testing
// app.get('/', async (req: Request, res: Response) => {
//   Promise.reject(new Error('Unhandlerror'))
// })

app.use(globalErrorHandler);

export default app;
