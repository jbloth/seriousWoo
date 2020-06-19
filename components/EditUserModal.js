import { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';

import validateAndSanitizeEditUserInput from '../lib/validateAndSanitizeEditUserInput';
import UPDATE_USER from '../mutations/update-user';
import CloseIcon from '../assets/icon-close_211652.svg';
import { colors, breakPoints } from '../styles/theme';
import TextInput from './TextInput';
import Button from './Button';

const EditUserModal = ({ id, initialData, active, closeModal }) => {
  const initialState = {
    firstName: initialData.firstName ? initialData.firstName : '',
    lastName: initialData.lastName ? initialData.lastName : '',
    email: initialData.email ? initialData.email : '',
    errors: null,
  };
  const [formData, setFormData] = useState(initialState);

  const handleChange = (event) => {
    const newState = {
      ...formData,
      [event.target.name]: event.target.value,
      errors: null,
    };
    setFormData(newState);
  };

  // Use login-mutation
  const [updateUser, { data, loading, error: updateError }] = useMutation(UPDATE_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validatededInput = validateAndSanitizeEditUserInput(formData);
    if (!validatededInput.isValid) {
      setFormData({ ...formData, errors: validatededInput.errors });
      return;
    }

    const updateUserInput = {
      clientMutationId: 'Babbel',
      id,
      firstName: validatededInput.sanitizedData.firstName,
      lastName: validatededInput.sanitizedData.lastName,
      email: validatededInput.sanitizedData.email,
    };

    await updateUser({
      variables: { input: updateUserInput },
      onError: (error) => {
        if (error) {
          console.log(error);
          return;
        }
      },
    });

    closeModal();
  };

  return (
    <div className={`background-modal ${active ? 'background-modal--active' : ''}`}>
      <div className="edit-user-modal">
        <div className="icon-wrapper close-icon">
          <CloseIcon onClick={closeModal} />
        </div>
        <h2>Edit your profile</h2>
        <form method="post" className="form" onSubmit={(e) => handleSubmit(e)}>
          <div className="textInput-wrap">
            <TextInput
              name="firstName"
              type="text"
              label="First Name"
              required={false}
              value={formData.firstName}
              onChange={handleChange}
              error={
                formData.errors && formData.errors.firstName ? formData.errors.firstName : null
              }
            />
          </div>

          <div className="textInput-wrap">
            <TextInput
              name="lastName"
              type="text"
              label="Last Name"
              required={false}
              value={formData.lastName}
              onChange={handleChange}
              error={formData.errors && formData.errors.lastName ? formData.errors.lastName : null}
            />
          </div>

          <div className="textInput-wrap">
            <TextInput
              name="email"
              type="text"
              label="Email"
              required={false}
              value={formData.email}
              onChange={handleChange}
              error={formData.errors && formData.errors.email ? formData.errors.email : null}
            />
          </div>

          <div className="row">
            <div className="buttons-container">
              <div className="button-wrapper">
                <Button type="submit" extraClass="btn--big" disabled={loading ? 'disabled' : ''}>
                  {loading ? 'sending...' : 'SAVE'}
                </Button>
              </div>
              <div className="button-wrapper">
                <Button
                  extraClass="btn--big btn--inverted"
                  disabled={loading ? 'disabled' : ''}
                  onClick={(event) => {
                    event.preventDefault();
                    setFormData(initialState);
                    closeModal();
                  }}
                >
                  DISCARD
                </Button>
              </div>
            </div>
          </div>

          {updateError && (
            <div className="error-wrap">
              <p className="error-msg">{'Failed to update data.'}</p>
            </div>
          )}
        </form>
      </div>

      <style jsx>{`
        .background-modal {
          display: none;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          position: fixed;
          background-color: rgba(${colors.bg}, 0.6);
        }

        .background-modal--active {
          display: block;
          z-index: 100;
        }

        .edit-user-modal {
          position: relative;
          top: 25%;
          margin: 0 auto;
          width: 60rem;
          background-color: rgb(${colors.lighterblue});
          padding: 6rem;
        }

        .close-icon {
          font-size: 3rem;
          position: absolute;
          top: 3rem;
          right: 3rem;
          fill: rgb(${colors.darkpink});
          cursor: pointer;
        }

        .h2 {
          color: rgb(${colors.orange});
        }

        .textInput-wrap,
        .buttons-container {
          margin-top: 3rem;
        }

        .row {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .buttons-container {
          width: 80%;
          display: flex;
          justify-content: space-between;
        }

        .button-wrapper {
          width: 16rem;
          margin: 0 1rem;
        }

        .error-wrap {
          margin: 2rem 0;
        }

        @media only screen and (max-width: ${breakPoints.bp_small}) {
          .edit-user-modal {
            width: 50rem;
            top: 10%;
          }
        }

        @media only screen and (max-width: ${breakPoints.bp_smallest}) {
          .edit-user-modal {
            width: 100%;
          }
        }

        @media only screen and (max-width: ${breakPoints.bp_tiny}) {
          .buttons-container {
            width: 100%;
          }

          .button-wrapper {
            margin: 0 1rem 0 0;
          }

          .button-wrapper:last-of-type {
            margin: 0 0 0 1rem;
          }
        }

        @media only screen and (max-width: ${breakPoints.bp_tiniest}) {
          .edit-user-modal {
            padding: 6rem 4rem;
          }
        }
      `}</style>
    </div>
  );
};

export default EditUserModal;
