import { useState } from 'react';
import Link from 'next/link';

import validateAndSanitizeContactFormInput from '../lib/validateAndSanitizeContactFormInput';
import { sendContactMail } from './networking/mail-api';
import { colors, breakPoints } from '../styles/theme';

import TextInput from './TextInput';
import TextArea from './TextArea';
import Button from './Button';

const ContactForm = () => {
  const initialState = {
    name: '',
    email: '',
    content: '',
    consent: false,
    errors: null,
    mainError: null,
  };
  const [formData, setFormData] = useState(initialState);
  const [receivedMsg, setReceivedMsg] = useState(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleChange = (event) => {
    const newState = { ...formData, [event.target.name]: event.target.value };
    setFormData(newState);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setButtonDisabled(true);
    const { name, email, content, consent } = formData;

    // Validate and sanitize input
    if (!consent) {
      setFormData({ ...formData, errors: { consent: 'Your consent is required.' } });
      setButtonDisabled(false);
      return;
    }

    const validatededInput = validateAndSanitizeContactFormInput(formData);
    if (!validatededInput.isValid) {
      setFormData({ ...formData, errors: validatededInput.errors });
      setButtonDisabled(false);
      return;
    }

    // send email
    const res = await sendContactMail(name, email, content);

    if (res.status < 300) {
      setFormData(initialState);
      setReceivedMsg("Thanks! We'll get back to you.");
      setButtonDisabled(false);
    } else {
      console.log(res);
      setFormData({
        ...formData,
        mainError: 'Could not send message. Sorry. ' + res,
        errors: null,
      });
      setButtonDisabled(false);
    }
  };

  return (
    <div className="contact-form-container">
      {receivedMsg ? (
        <div className="received-msg">
          <p>{receivedMsg}</p>
        </div>
      ) : (
        <>
          <form method="post" onSubmit={submitForm}>
            <div className="input-row">
              <div className="textInput-wrap margin-right">
                <TextInput
                  name="name"
                  type="text"
                  label="Name"
                  required={true}
                  value={formData.name}
                  onChange={handleChange}
                  error={formData.errors && formData.errors.name ? formData.errors.name : null}
                />
              </div>

              <div className="textInput-wrap">
                <TextInput
                  name="email"
                  type="email"
                  label="Email"
                  required={true}
                  value={formData.email}
                  onChange={handleChange}
                  error={formData.errors && formData.errors.email ? formData.errors.email : null}
                />
              </div>
            </div>

            <div className="textArea-wrap">
              <TextArea
                rows="6"
                name="content"
                label="What's on your mind?"
                required={false}
                value={formData.content}
                onChange={handleChange}
                extraClass={'textInput--bottomOnly'}
                error={formData.errors && formData.errors.content ? formData.errors.content : null}
              />
            </div>

            <div className="consent-checkbox-wrap">
              <input
                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                checked={formData.consent}
                className="checkbox"
                name="consent"
                type="checkbox"
              />
              <div className="consent-text">
                I consent to having this website store my information so that they can respond to my
                inquiry.
              </div>
            </div>

            {formData.errors && formData.errors.consent && (
              <div className="error-msg">{formData.errors.consent}</div>
            )}

            <p className="privacy-msg">
              Please refer to our{' '}
              <Link href="/privacy">
                <a>privacy policy</a>
              </Link>{' '}
              to find out how we store your information.
            </p>

            <div className="submit-wrap">
              {buttonDisabled ? (
                <p>Sending message...</p>
              ) : (
                <Button type="submit" extraClass="btn--big">
                  SEND
                </Button>
              )}
            </div>
          </form>
          {formData.mainError && <div className="error-msg">{formData.mainError}</div>}
        </>
      )}
      <style jsx>{`
        .contact-form-container {
          display: flex;
          flex-direction: column;
          width: 80%;
          max-width: 60rem;
          min-height: 300px;
        }

        .input-row {
          display: flex;
        }

        .margin-right {
          margin-right: 4rem;
        }

        .textInput-wrap,
        .textArea-wrap,
        .submit-wrap {
          flex-grow: 1;
          margin-top: 3rem;
        }

        .consent-checkbox-wrap {
          display: flex;
          margin-top: 1rem;
        }

        .checkbox {
          margin-top: 4px;
          margin-right: 10px;
          width: 20px;
          height: 20px;
          border-radius: 0;
          border: 1px solid rgb(${colors.violet});
        }

        .privacy-msg {
          margin-top: 1rem;
          color: rgb(${colors.mdgray});
          font-size: 1.4rem;
        }

        .error-msg {
          color: rgb(${colors.textred});
          font-size: 1.4rem;
          margin: 1rem 0;
        }

        @media only screen and (max-width: ${breakPoints.bp_small}) {
          .contact-form-container {
            width: 90%;
            max-width: 60rem;
          }

          .input-row {
            flex-direction: column;
          }

          .margin-right {
            margin-right: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactForm;
