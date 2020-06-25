// API route that uses nodemailer to send email with data from the contact form

import nodemailer from 'nodemailer';
import getConfig from 'next/config';
const { serverRuntimeConfig } = getConfig();

// Create nodemailer transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.mail.me.com',
  service: 'iCloud',
  auth: {
    user: process.env.MAIL_ADDRESS,
    pass: process.env.MAIL_PW,
  },
});

// Create email and call mailer function
export default async (req, res) => {
  const { senderMail, name, content, recipientMail } = req.body;

  // Check if fields are all filled
  if (senderMail === '' || name === '' || content === '' || recipientMail === '') {
    res.status(403).send('');
    return;
  }

  // Email content (html and text version)
  const msg_html = `
  <p>New Mail from that contact form on that website</p>
  <h3>Contact Details</h3>
  <ul>
  <li>Name: ${name}</li>
  <li>Email: ${senderMail}</li>
  </ul>
  <h3>Message</h3>
  <p>${content}</p>
  `;

  const msg_text = `
    Contact Details:

    Name: ${name},
    Email: ${senderMail},
    
    Message:
  ${content}
  `;

  // use mailer function to send email
  const mailerRes = await mailer({
    senderMail,
    name,
    html: msg_html,
    text: msg_text,
    recipientMail,
  });
  res.send(mailerRes);
};

// Send email
const mailer = ({ senderMail, name, html, text, recipientMail }) => {
  const from = name && senderMail ? `${name} <${senderMail}>` : `${name || senderMail}`;
  const message = {
    from: `"Nodemailer" <${process.env.MAIL_ADDRESS}>`,
    to: `${recipientMail}`,
    subject: `New message from ${from}`,
    text,
    replyTo: senderMail,
    html,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(message, (error, info) => (error ? reject(error) : resolve(info)));
  });
};
