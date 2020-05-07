import axios from 'axios';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

// Post email data to "contact" api-route
export const sendContactMail = async (name, senderMail, content) => {
  const data = {
    recipientMail: publicRuntimeConfig.RECIPIENT_MAIL,
    name,
    senderMail,
    content,
  };

  try {
    const res = await axios({
      method: 'post',
      url: '/api/contact',
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    });
    return res;
  } catch (error) {
    return error;
  }
};