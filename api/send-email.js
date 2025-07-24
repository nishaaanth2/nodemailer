import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { subject, html } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: `"Nishaanth" <${process.env.EMAIL}>`,
      to: process.env.EMAIL,
      subject,
      html,
    });

    console.log("✅ Email sent:", info.response);
    res.status(200).send('Email sent');
  } catch (err) {
    console.error("❌ Failed to send email:", err);
    res.status(500).send('Email sending failed');
  }
}
