import { useMutation } from '@apollo/react-hooks';

import withApollo from '../lib/withApollo_wb';
import DELETE_USER from '../mutations/delete-user';
import { logoutUser } from '../lib/auth';
import { colors, breakPoints } from '../styles/theme';
import Button from './Button';

const DeleteUserModal = ({ id, active, closeModal }) => {
  const [deleteUser, { data, loading, error: deleteError }] = useMutation(DELETE_USER);

  const onDeleteClick = async ({ id }) => {
    await deleteUser({
      variables: {
        input: {
          clientMutationId: 'DeleteUser',
          id: '1234',
        },
      },
      onError: (error) => {
        if (error) {
          console.log(error);
          return;
        }
      },
    });

    logoutUser();
    props.apollo.resetStore();
    closeModal();
    Router.push('/login');
  };

  return (
    <div className={`background-modal ${active ? 'background-modal--active' : ''}`}>
      <div className="delete-user-modal">
        <h2>Seriously?</h2>
        <div className="please-comfirm-msg">
          <p>Click "Delete" to permanently delete your account.</p>
          <p>(Or click "Cancel" and stay with us...)</p>
        </div>
        <div className="row">
          <div className="buttons-container">
            <div className="button-wrapper">
              <Button
                extraClass="btn--big"
                onClick={() => onDeleteClick(id)}
                disabled={loading ? 'disabled' : ''}
              >
                {loading ? 'sending...' : 'DELETE'}
              </Button>
            </div>
            <div className="button-wrapper">
              <Button
                extraClass="btn--big btn--inverted"
                disabled={loading ? 'disabled' : ''}
                onClick={(event) => {
                  event.preventDefault();
                  closeModal();
                }}
              >
                CANCEL
              </Button>
            </div>
          </div>
        </div>

        {deleteError && (
          <div className="error-msg">
            <p>{`Delete failed: ${deleteError}`}</p>
          </div>
        )}
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

        .delete-user-modal {
          position: relative;
          top: 25%;
          margin: 0 auto;
          width: 60rem;
          background-color: rgb(${colors.lighterblue});
          padding: 6rem;
        }

        .h2 {
          color: rgb(${colors.orange});
        }

        .please-comfirm-msg {
          padding: 2rem 0;
        }

        .row {
          width: 100%;
          display: flex;
          padding: 2rem 0;
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

        .error-msg {
          font-size: 1.4rem;
          color: rgb(${colors.orange});
        }

        @media only screen and (max-width: ${breakPoints.bp_small}) {
          .delete-user-modal {
            width: 50rem;
          }
        }

        @media only screen and (max-width: ${breakPoints.bp_smallest}) {
          .delete-user-modal {
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
          .delete-user-modal {
            padding: 6rem 4rem;
          }
        }
      `}</style>
    </div>
  );
};

export default withApollo(DeleteUserModal);
