import React from 'react';
import {BooleanInput, Create, DateTimeInput, Edit, NumberField, SimpleForm, TextField, TextInput} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';
import {Divider} from '@material-ui/core';

export const UserCreate = (props) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput formClassName='inline' label='User ID' source="user_id"/>
        <TextInput formClassName='inline' label='Customer User ID' source="customer_user_id"/>
        <TextInput formClassName='inline' label='Customer ID' source="customer_id"/>
        <div/>
        <RichTextInput toolbar={false} formClassName='inline' label='X Data' source="x_data"/>
        <div/>
        <Divider style={{width: '100%', marginBottom: 20}}/>
        <BooleanInput label="Approve All" source="settings.approveAll"/>
        <BooleanInput label="Notification In Time" source="settings.notificationInTime"/>
        <DateTimeInput type='time' label="Notification In Time End" source="settings.notificationInTimeEnd"/>
        <DateTimeInput type='time' label="Notification In Time Start" source="settings.notificationInTimeStart"/>
        <BooleanInput label="Voice Emotional Analysis" source="settings.voiceEmotionalAnalysis"/>
        <BooleanInput label="Notification Offline Calls" source="settings.notificationOfflineCalls"/>
        <BooleanInput label="Notification Dating Service" source="settings.notificationDatingService"/>
      </SimpleForm>
    </Create>
  )
};

