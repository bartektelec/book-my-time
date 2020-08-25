import express, { Application } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import router from './routes';
import connect from './db/connection';
import passport from './passport/passport';
const cors = require('cors');

function onInit() {
  const app: Application = express();
  app.use(bodyParser.json());
  app.use(cors());

  app.use(express.static(path.join(__dirname, 'public')));

  connect();
  app.use(passport.initialize());

  app.use(router);

  app.listen(process.env.PORT || 3000, () => {
    console.log(`auth service is listening at port ${process.env.PORT || 3000}!`);
  });
}

onInit();
