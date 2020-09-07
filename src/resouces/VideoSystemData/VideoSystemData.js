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

export const VideoSystemDataList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <NumberField source="id"/>
        <NumberField source="user_id"/>
        <NumberField source="video_system_id"/>
      </Datagrid>
    </List>)
};
