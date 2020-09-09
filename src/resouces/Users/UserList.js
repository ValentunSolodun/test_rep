import React from 'react';
import {
  Datagrid,
  EditButton,
  List,
  TextField,
  NumberField,
  BooleanField,
  DateField, DeleteButton, ReferenceManyField,
  SearchInput,
  Filter,
  ReferenceInput,
  AutocompleteInput,
  DateInput,
  TextInput,
  NumberInput,
  NullableBooleanInput,
} from 'react-admin';

const UserFilter = props => (
  <Filter {...props}>
    <SearchInput source="q" alwaysOn />
    <NumberInput label='User ID' source='user_id' />
    <NumberInput label='Customer ID' source='customer_id' />
  </Filter>
);

export const UserList = (props) => {
  return (
    <List
      {...props}
      filters={<UserFilter />}
    >
      <Datagrid rowClick="edit">
        <NumberField label='User ID' source="user_id"/>
        <NumberField label='Customer User ID' source="customer_user_id"/>
        <NumberField label='Customer ID' source="customer_id"/>
        <BooleanField source="is_online" valueLabelTrue="True" valueLabelFalse="False"/>
        <TextField label='X Data' source="x_data"/>

        <BooleanField label="Approve All" source="settings.approveAll"/>
        <BooleanField label="Notification In Time" source="settings.notificationInTime"/>
        <DateField showTime options={{hour12: true, hour: '2-digit', minute: '2-digit'}}
                   label="Notification In Time End" source="settings.notificationInTimeEnd"/>
        <DateField showTime options={{hour12: true, hour: '2-digit', minute: '2-digit'}}
                   label="Notification In Time Start" source="settings.notificationInTimeStart"/>
        <BooleanField label="Voice Emotional Analysis" source="settings.voiceEmotionalAnalysis"/>
        <BooleanField label="Notification Offline Calls" source="settings.notificationOfflineCalls"/>
        <BooleanField label="Notification Dating Service" source="settings.notificationDatingService"/>
        <DeleteButton/>
      </Datagrid>
    </List>)
};
