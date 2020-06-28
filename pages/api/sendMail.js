const sgMail = require('@sendgrid/mail');

export default async (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_KEY);

  const { name, email, message } = req.body;
  const content = {
    to: process.env.RECIPIENT_MAIL,
    from: process.env.SENDER_MAIL,
    subject: `New Message From - ${name} (${email})`,
    text: `Name: ${name}, Email: ${email}\nMessage: ${message}`,
    html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
  };

  try {
    await sgMail.send(content);
    res.status(200).send('Message sent successfully.');
  } catch (error) {
    console.log('ERROR', error);
    res.status(400).send('Message not sent.');
  }
};
