import React from 'react';
import {
  Datagrid, DateField, EditButton,
  List,
  BooleanField,
  NumberField,
  Responsive,
  ShowButton,
  SimpleList,
  TextField
} from 'react-admin';

export const CallLogList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <NumberField source="id"/>
        {/*<NumberField options={{ style: 'currency', currency: 'USD' }} source="amount"/>*/}
        <NumberField source="caller"/>
        <NumberField source="callee"/>
        <NumberField source="duration"/>
        <BooleanField source="video"/>
        <NumberField source="rate"/>
        <TextField source="status"/>
      </Datagrid>
    </List>)
};
