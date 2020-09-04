import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  // throw new Error('next error')
  return res.json({ msg: 'henlo' });
});

export default router;
