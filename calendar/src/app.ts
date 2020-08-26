import express, { Application } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import router from './routes';
import connect from './db/connection';
const cors = require('cors');

function onInit() {
  const app: Application = express();
  app.use(bodyParser.json());
  app.use(cors());

  connect();

  app.use(router);

  app.listen(process.env.PORT || 3000, () => {
    console.log(`calendar service is listening at port ${process.env.PORT || 3000}!`);
  });
}

onInit();
