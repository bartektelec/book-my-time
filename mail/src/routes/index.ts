import { Router, Request, Response } from 'express';
import { env } from 'process';

const router = Router();
const transporter = require('nodemailer').createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

router.get('/', (req: Request, res: Response) => {
  return res.json({ msg: 'henlo' });
});

router.post('/sendConfirmationEmail', async (req: Request, res: Response) => {
  try {
    const { recipient, subject, text } = req.body;
    const mailOptions = {
      from: process.env.EMAIL,
      to: recipient,
      subject: 'Book my time event creation confirmation',
      text: 'Oi',
    };
    const info = await transporter.sendMail(mailOptions);
    res.json(info);
  } catch (err) {
    console.error(err);
    res.json(err);
  }
});

export default router;
