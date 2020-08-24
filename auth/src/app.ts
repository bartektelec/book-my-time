import express, { Application } from 'express';
import router from './routes';

const app = express();

app.use(router);
