import express, { Application, Request, Response } from 'express';
import ip from 'ip';

const app: Application = express();
app.get('/', () => {
  console.log('hello there');
});

const PORT = 3001;
const IP = ip.address();

app.listen(PORT, () => {
  console.log(`server listening on http://${IP}:${PORT}`);
});
