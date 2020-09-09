import React from 'react';
import {
  BooleanInput,
  Create,
  DateTimeInput,
  Edit,
  NumberField,
  NumberInput,
  SimpleForm,
  TextField,
  TextInput
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';
import {Divider} from '@material-ui/core';
import CustomNumberInput from '../../components/CustomNumberInput';

export const CreditsCreate = (props) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <NumberInput formClassName='inline' label='Credit ID' source="credit_id"/>
        <NumberInput formClassName='inline' label='User ID' source="user_id"/>
        <NumberInput formClassName='inline' label='Session ID' source="session_id"/>
        <NumberInput formClassName='inline' label='Payment ID' source="payment_id"/>
        <NumberInput formClassName='inline' label='Customer ID' source="customer_id"/>
        <div/>
        <CustomNumberInput source='amount'/>
        <TextInput source='reason'/>
        <NumberInput source="duration"/>
      </SimpleForm>
    </Create>
  )
};
