import { fonts, colors } from '../styles/theme';
import TextInput from './TextInput';
import TextArea from './TextArea';
import CountrySelector from './CountrySelector';

const CheckoutFormInputs = ({ initialValues, handleChange }) => {
  return (
    <div className="form-inputs-container">
      <div className="input-row">
        <div className="textInput-wrap margin-right">
          <TextInput
            name="firstname"
            type="text"
            label="First name"
            required={true}
            value={initialValues.firstName}
            onChange={handleChange}
            extraClass={'textInput--bottomOnly'}
          />
        </div>

        <div className="textInput-wrap">
          <TextInput
            name="lastname"
            type="text"
            label="Last name"
            required={true}
            value={initialValues.lastName}
            onChange={handleChange}
            extraClass={'textInput--bottomOnly'}
          />
        </div>
      </div>

      <div className="textInput-wrap">
        <TextInput
          name="address1"
          type="text"
          label="Address 1"
          required={true}
          value={initialValues.address1}
          onChange={handleChange}
          extraClass={'textInput--bottomOnly'}
        />
      </div>

      <div className="textInput-wrap">
        <TextInput
          name="address2"
          type="text"
          label="Address 2"
          required={false}
          value={initialValues.address2}
          onChange={handleChange}
          extraClass={'textInput--bottomOnly'}
        />
      </div>

      <div className="input-row">
        <div className="textInput-wrap margin-right">
          <TextInput
            name="postcode"
            type="text"
            label="Post Code"
            required={true}
            value={initialValues.postcode}
            onChange={handleChange}
            extraClass={'textInput--bottomOnly'}
          />
        </div>

        <div className="textInput-wrap">
          <TextInput
            name="city"
            type="text"
            label="City"
            required={true}
            value={initialValues.city}
            onChange={handleChange}
            extraClass={'textInput--bottomOnly'}
          />
        </div>
      </div>

      <div className="countrySelect-wrap">
        <CountrySelector onSelect={handleChange} label={'Country'} />
      </div>

      <div className="input-row">
        <div className="textInput-wrap margin-right">
          <TextInput
            name="email"
            type="email"
            label="Email Address"
            required={true}
            value={initialValues.email}
            onChange={handleChange}
            extraClass={'textInput--bottomOnly'}
          />
        </div>

        <div className="textInput-wrap">
          <TextInput
            name="phone"
            type="text"
            label="Phone Number"
            required={false}
            value={initialValues.phone}
            onChange={handleChange}
            extraClass={'textInput--bottomOnly'}
          />
        </div>
      </div>

      <div className="textArea-wrap">
        <TextArea
          rows="4"
          name="orderNotes"
          label="Notes"
          required={false}
          value={initialValues.orderNotes}
          onChange={handleChange}
          extraClass={'textInput--bottomOnly'}
        />
      </div>

      <style jsx>{`
        .form-inputs-container {
          display: flex;
          flex-direction: column;
        }

        .input-row {
          display: flex;
        }

        .margin-right {
          margin-right: 4rem;
        }

        .textInput-wrap,
        .textArea-wrap {
          color: ${colors.textblue};
          flex-grow: 1;
          margin-top: 3rem;
        }

        .countrySelect-wrap {
          margin-top: 3rem;
        }
      `}</style>
    </div>
  );
};

export default CheckoutFormInputs;
