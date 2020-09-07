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

export const UserApprovalsList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <NumberField source="id"/>
        <NumberField source="approving_user_id"/>
        <NumberField source="approved_status"/>
        <DateField source="status_change" showTime />
      </Datagrid>
    </List>)
};
