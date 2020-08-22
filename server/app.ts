import express, { Application, Request, Response } from 'express';

const app: Application = express();
app.get('/', () => {
  console.log('hello there');
});

app.listen(3000, () => {
  console.log('server listening on port 3000');
});
