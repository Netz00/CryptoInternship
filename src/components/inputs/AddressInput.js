import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import { useState } from "react";
const ethereum_address = require("ethereum-address");

function AddressInput({ text, onTextChange }) {
  const [formData, updateFormData] = useState({
    address: text,
    addressValid: true,
  });

  const handleChangeText = (e) => {
    const newMessageObj = {
      address: e.target.value.trim(),
      addressValid: ethereum_address.isAddress(e.target.value.trim()),
    };
    updateFormData(newMessageObj);
    if (newMessageObj.addressValid) onTextChange(newMessageObj.address);
  };

  return (
    <TextField
      backgroundcolor="transparent"
      variant="outlined"
      margin="normal"
      required
      fullWidth
      name="address"
      label="Etherium address"
      value={formData.address}
      type="text"
      id="address"
      autoComplete="current-address"
      onChange={handleChangeText}
      error={!formData.addressValid}
      helperText={!formData.addressValid ? "Invalid etherium address." : ""}
    />
  );
}

AddressInput.defaultProps = {
  onTextChange: () => {},
  text: "",
};

AddressInput.propTypes = {
  onTextChange: PropTypes.func,
  text: PropTypes.string,
};

export default AddressInput;
