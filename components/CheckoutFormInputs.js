import { colors, breakPoints } from '../styles/theme';
import { countryCodeToName } from '../lib/functions';
import TextInput from './TextInput';
import TextArea from './TextArea';
import CountrySelector from './CountrySelector';

// Passive mode allows component to follow another instance of CheckoutFormInputs,
// handleChange will be ignored and instead of the countrySelector only the name of the
// country will be rendered.
const CheckoutFormInputs = ({
  inputs,
  handleChange,
  showNotes = true,
  texInputExtraClass,
  dontRequire = false,
  passiveMode = false,
}) => {
  // For the EditAddressModal component we don't want to require any field, so we set the dontRequire
  // parameter to true. For convience, we invert the valuer here.
  const require = !dontRequire;

  if (passiveMode) {
    handleChange = () => {};
  }

  return (
    <div className="form-inputs-container">
      <div className="input-row">
        <div className="textInput-wrap margin-right">
          <TextInput
            name="firstName"
            type="text"
            label="First Name"
            required={require}
            value={inputs.firstName}
            onChange={handleChange}
            extraClass={texInputExtraClass ? texInputExtraClass : null}
            error={inputs.errors && inputs.errors.firstName ? inputs.errors.firstName : null}
          />
        </div>

        <div className="textInput-wrap">
          <TextInput
            name="lastName"
            type="text"
            label="Last Name"
            required={require}
            value={inputs.lastName}
            onChange={handleChange}
            extraClass={texInputExtraClass ? texInputExtraClass : null}
            error={inputs.errors && inputs.errors.lastName ? inputs.errors.lastName : null}
          />
        </div>
      </div>

      <div className="textInput-wrap">
        <TextInput
          name="address1"
          type="text"
          label="Address 1"
          required={require}
          value={inputs.address1}
          onChange={handleChange}
          extraClass={texInputExtraClass ? texInputExtraClass : null}
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
          extraClass={texInputExtraClass ? texInputExtraClass : null}
          error={inputs.errors && inputs.errors.address2 ? inputs.errors.address2 : null}
        />
      </div>

      <div className="input-row">
        <div className="textInput-wrap margin-right">
          <TextInput
            name="postcode"
            type="text"
            label="Post Code"
            required={require}
            value={inputs.postcode}
            onChange={handleChange}
            extraClass={texInputExtraClass ? texInputExtraClass : null}
            error={inputs.errors && inputs.errors.postcode ? inputs.errors.postcode : null}
          />
        </div>

        <div className="textInput-wrap">
          <TextInput
            name="city"
            type="text"
            label="City"
            required={require}
            value={inputs.city}
            onChange={handleChange}
            extraClass={texInputExtraClass ? texInputExtraClass : null}
            error={inputs.errors && inputs.errors.city ? inputs.errors.city : null}
          />
        </div>
      </div>

      <div className="countrySelect-wrap">
        {passiveMode ? (
          <div className="country-display">{countryCodeToName(inputs.country)}</div>
        ) : (
          <CountrySelector
            extraClass={texInputExtraClass ? texInputExtraClass : null}
            value={inputs.country}
            onSelect={handleChange}
            label={'Country'}
            selected={inputs.country}
          />
        )}
      </div>

      <div className="input-row">
        <div className="textInput-wrap margin-right">
          <TextInput
            name="email"
            type="email"
            label="Email"
            required={require}
            value={inputs.email}
            onChange={handleChange}
            extraClass={texInputExtraClass ? texInputExtraClass : null}
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
            extraClass={texInputExtraClass ? texInputExtraClass : null}
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
            extraClass={texInputExtraClass ? texInputExtraClass : null}
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
          flex-grow: 1;
          margin-top: 3rem;
        }

        .countrySelect-wrap {
          margin-top: 3rem;
        }

        .country-display {
          color: rgb(${colors.mdgray});
        }

        @media only screen and (max-width: ${breakPoints.bp_large}) {
        }

        @media only screen and (max-width: ${breakPoints.bp_md}) {
          .input-row {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default CheckoutFormInputs;
