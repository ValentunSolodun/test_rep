import React from 'react';
import {TextInput} from 'react-admin';

const CustomNumberInput = (props) => {
  console.log(props);
  return (
    <TextInput {...props} format={d => new RegExp(/^-?\d*?\.?\d*$/g).test(String(d)) ? String(d) : ''} />
  )
}

export default CustomNumberInput;
