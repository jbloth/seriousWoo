import { fonts, colors } from '../styles/theme';
import TextInput from './TextInput';
import TextArea from './TextArea';
import CountrySelector from './CountrySelector';

const CheckoutFormInputs = ({ inputs, handleChange, showNotes = true }) => {
  return (
    <div className="form-inputs-container">
      <div className="input-row">
        <div className="textInput-wrap margin-right">
          <TextInput
            name="firstName"
            type="text"
            label="First Name"
            required={true}
            value={inputs.firstName}
            onChange={handleChange}
            extraClass={'textInput--bottomOnly'}
            error={inputs.errors && inputs.errors.firstName ? inputs.errors.firstName : null}
          />
        </div>

        <div className="textInput-wrap">
          <TextInput
            name="lastName"
            type="text"
            label="Last Name"
            required={true}
            value={inputs.lastName}
            onChange={handleChange}
            extraClass={'textInput--bottomOnly'}
            error={inputs.errors && inputs.errors.lastName ? inputs.errors.lastName : null}
          />
        </div>
      </div>

      <div className="textInput-wrap">
        <TextInput
          name="address1"
          type="text"
          label="Address 1"
          required={true}
          value={inputs.address1}
          onChange={handleChange}
          extraClass={'textInput--bottomOnly'}
          error={inputs.errors && inputs.errors.address1 ? inputs.errors.address1 : null}
        />
      </div>

      <div className="textInput-wrap">
        <TextInput
          name="address2"
          type="text"
          label="Address 2"
          required={false}
          value={inputs.address2}
          onChange={handleChange}
          extraClass={'textInput--bottomOnly'}
          error={inputs.errors && inputs.errors.address2 ? inputs.errors.address2 : null}
        />
      </div>

      <div className="input-row">
        <div className="textInput-wrap margin-right">
          <TextInput
            name="postcode"
            type="text"
            label="Post Code"
            required={true}
            value={inputs.postcode}
            onChange={handleChange}
            extraClass={'textInput--bottomOnly'}
            error={inputs.errors && inputs.errors.postcode ? inputs.errors.postcode : null}
          />
        </div>

        <div className="textInput-wrap">
          <TextInput
            name="city"
            type="text"
            label="City"
            required={true}
            value={inputs.city}
            onChange={handleChange}
            extraClass={'textInput--bottomOnly'}
            error={inputs.errors && inputs.errors.city ? inputs.errors.city : null}
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
            value={inputs.email}
            onChange={handleChange}
            extraClass={'textInput--bottomOnly'}
            error={inputs.errors && inputs.errors.email ? inputs.errors.email : null}
          />
        </div>

        <div className="textInput-wrap">
          <TextInput
            name="phone"
            type="text"
            label="Phone Number"
            required={false}
            value={inputs.phone}
            onChange={handleChange}
            extraClass={'textInput--bottomOnly'}
            error={inputs.errors && inputs.errors.phone ? inputs.errors.phone : null}
          />
        </div>
      </div>

      {showNotes && (
        <div className="textArea-wrap">
          <TextArea
            rows="4"
            name="orderNotes"
            label="Notes"
            required={false}
            value={inputs.orderNotes}
            onChange={handleChange}
            extraClass={'textInput--bottomOnly'}
            error={inputs.errors && inputs.errors.orderNotes ? inputs.errors.orderNotes : null}
          />
        </div>
      )}

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
