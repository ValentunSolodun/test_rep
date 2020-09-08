import React from 'react';
import {
  BooleanField,
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
      <Datagrid rowClick="edit">
        <TextField label='ID' source="customer_id"/>
        <DateField source="created_time" showTime/>
        <DateField source="updated_time" showTime/>
        <TextField source="billing_data"/>
        <TextField source="api_key"/>
        {/*<TextField source="api_secret"/>*/}
        <BooleanField source="enabled" valueLabelTrue="True" valueLabelFalse="False"/>
        {/*<EditButton />*/}
      </Datagrid>
    </List>)
};
