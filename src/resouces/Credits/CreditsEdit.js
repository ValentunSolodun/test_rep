import {
  BooleanInput, Datagrid, DateField,
  DateTimeInput,
  Edit,
  NumberField,
  NumberInput,
  SimpleForm,
  TextField,
  TextInput
} from 'react-admin';
import UserAvatar from '../../components/UserAvatar';
import {Divider} from '@material-ui/core';
import React from 'react';
import ColoredNumberField from '../../components/ColorNumberField';
import CustomNumberInput from '../../components/CustomNumberInput';
import EditTitle from '../../components/EditTitle';

export const CreditsEdit = props => {
  return (
    <Edit title={<EditTitle/>} {...props}>
      <SimpleForm>
        <NumberField formClassName='inline' label='Credit ID' source="credit_id"/>
        <NumberField formClassName='inline' label='User ID' source="user_id"/>
        <NumberField formClassName='inline' label='Session ID' source="session_id"/>
        <NumberField formClassName='inline' label='Payment ID' source="payment_id"/>
        <NumberField formClassName='inline' label='Customer ID' source="customer_id"/>
        <div/>
        <CustomNumberInput source='amount'/>
        <TextInput source='reason'/>
        <NumberInput source="duration"/>
      </SimpleForm>
    </Edit>
  )
};
