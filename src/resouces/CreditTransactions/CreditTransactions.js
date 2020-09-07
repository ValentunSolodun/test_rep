import React from 'react';
import {
  Datagrid, DateField, EditButton,
  List,
  NumberField,
  Responsive,
  ShowButton,
  SimpleList,
  TextField
} from 'react-admin';

export const CreditTransactionsList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <NumberField source="id"/>
        <NumberField options={{ style: 'currency', currency: 'USD' }} source="amount"/>
        <TextField source="type"/>
        <DateField source="time_of_transaction" showTime/>
        <NumberField source="user_id"/>
      </Datagrid>
    </List>)
};
