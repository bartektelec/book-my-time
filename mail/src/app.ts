import express, { Application } from 'express';
import bodyParser from 'body-parser';
import { writeFileSync } from 'fs';
const cors = require('cors');

import router from './routes';

function onInit() {
  const app: Application = express();
  app.use(bodyParser.json());
  app.use(cors());

  app.use(router);

  app.listen(process.env.PORT || 3000, () => {
    console.log(`mail service is listening at port ${process.env.PORT || 3000}!`);
  });
}

onInit();
