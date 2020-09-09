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

export const UserSubscriptionList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <NumberField source="id"/>
        <NumberField source="user_id"/>
        <TextField source="subscription_type"/>
        <DateField source="period_start" showTime />
        <DateField source="period_end" showTime />
        <NumberField options={{ style: 'currency', currency: 'USD' }} source="current_credit_regular"/>
        <NumberField options={{ style: 'currency', currency: 'USD' }} source="current_credit_added"/>
        <NumberField source="audio_rate"/>
        <NumberField source="video_rate"/>
        <NumberField options={{ style: 'currency', currency: 'USD' }} source="renewal_credit"/>
      </Datagrid>
    </List>)
};
