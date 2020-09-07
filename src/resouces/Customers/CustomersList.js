import React from 'react';
import {
  Datagrid,
  DateField,
  EditButton,
  List,
  NumberField,
  Responsive,
  SimpleList,
  TextField
} from 'react-admin';

export const CustomersList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <NumberField source="customer_id"/>
        <TextField source="created_time"/>
        <TextField source="updated_time"/>
        <EditButton />
      </Datagrid>
    </List>)
};
