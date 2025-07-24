import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// 🆕 Test route
app.get('/', (req, res) => {
  res.status(200).json({ message: '✅ Server is running!' });
});

// ✅ Email sending route
app.post('/nexon-email', async (req, res) => {
  const { subject, html, name } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.NEXON_EMAIL,
        pass: process.env.NEXON_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: `"${name}" <${process.env.NEXON_EMAIL}>`,
      to: process.env.NEXON_EMAIL,
      subject,
      html,
    });

    console.log('✅ Email sent:', info.response);
    res.status(200).send('Email sent');
  } catch (err) {
    console.error('❌ Failed to send email:', err);
    res.status(500).send('Email sending failed');
  }
});

// Required for Vercel to recognize the exported handler
export default app;
