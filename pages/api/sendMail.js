const sgMail = require('@sendgrid/mail');

export default async (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_KEY);

  const { name, email, message } = req.body;

  const content = {
    to: process.env.NEXT_PUBLIC_RECIPIENT_MAIL,
    from: email,
    subject: `New Message From - ${name} (${email})`,
    text: message,
    html: `<p>${message}</p>`,
  };

  try {
    await sgMail.send(content);
    res.status(200).send('Message sent successfully.');
  } catch (error) {
    console.log('ERROR', error);
    res.status(400).send('Message not sent.');
  }
};
