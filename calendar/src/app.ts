import express, { Application } from 'express';
import router from './routes';
import cors from 'cors';

const app: Application = express();

app.use(cors());

app.use(router);

app.listen(process.env.PORT || 3002, () => {
  console.log(`calendar service is listening at port ${process.env.PORT || 3002}!`);
});
