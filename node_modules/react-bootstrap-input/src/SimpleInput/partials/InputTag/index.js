/** @format */
import React from "react";
import NumberFormat from "react-number-format";

const InputTag = ({
  type,
  value,
  name,
  onChange,
  readonly,
  autoFocus,
  currency,
  inputRef
}) => {
  const onNumericValueChange = (e) => {
    if (e.target.value !== value) {
      onChange(e);
    }
  };
  let suffix = ` ${currency}`;

  switch (type) {
    case "money":
      suffix = ` ${currency}`;
      return (
        <NumberFormat
          getInputRef = {(el) => {inputRef.current = el}} 
          value={value}
          className="form-control"
          decimalSeparator=","
          thousandSeparator="."
          suffix={suffix}
          name={name}
          readOnly={readonly}
          onChange={onChange}
          autoFocus={autoFocus}
        />
      );
    case "number":
      suffix = ``;
      return (
        <NumberFormat
          getInputRef = {(el) => {inputRef.current = el}} 
          placeholder=""
          value={value}
          className="form-control"
          decimalSeparator=","
          thousandSeparator="."
          suffix={suffix}
          name={name}
          readOnly={readonly}
          onChange={onNumericValueChange}
          autoFocus={autoFocus}
        />
      );
      case "tel":
        suffix = ``;
        return (
          <NumberFormat          
            getInputRef = {(el) => {inputRef.current = el}} 
            type="tel"
            placeholder=""
            value={value}
            className="form-control"
            suffix={suffix}
            name={name}
            readOnly={readonly}
            onChange={onNumericValueChange}
            autoFocus={autoFocus}
          />
        );
    case "percent":
    case "percent1":
      return (
        <NumberFormat
          getInputRef = {(el) => {inputRef.current = el}} 
          value={value}
          className="form-control"
          decimalSeparator=","
          thousandSeparator="."
          suffix=" %"
          readOnly={readonly}
          name={name}
          onChange={onNumericValueChange}
          autoFocus={autoFocus}
        />
      );
    case "date":
      return (
        <NumberFormat
          getInputRef = {(el) => {inputRef.current = el}} 
          value={value}
          name={name}
          className="form-control"
          // placeholder="31/01/2015"
          format="##/##/####"
          mask="_"
          readOnly={readonly}
          onChange={onChange}
          autoFocus={autoFocus}
        />
      );
    default:
      return (
        <input
          ref={inputRef}
          type={type}
          value={value}
          name={name}
          onChange={onChange}
          className="form-control"
          readOnly={readonly}
          placeholder=""
          autoFocus={autoFocus}
        />
      );
  }
};

InputTag.displayName = "InputTag";

export default InputTag;
