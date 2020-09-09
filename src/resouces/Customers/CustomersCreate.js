import React from 'react';
import {
  BooleanInput,
  Create,
  DateTimeInput,
  Edit,
  NumberField,
  NumberInput, SelectInput,
  SimpleForm,
  TextField,
  TextInput
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';
import {Divider} from '@material-ui/core';
import CustomNumberInput from '../../components/CustomNumberInput';

export const CustomersCreate = (props) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput label='Customer ID' source='customer_id' />
        <TextInput source="api_key"/>
        <TextInput source="api_secret"/>
        <BooleanInput label="Enabled" source="enabled" />
      </SimpleForm>
    </Create>
  )
};
