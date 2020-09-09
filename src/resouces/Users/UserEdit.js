import React, {Fragment, useState} from 'react';
import {
  Datagrid,
  DateField,
  BooleanInput,
  DateTimeInput,
  ShowButton,
  EditButton,
  ReferenceManyField,
  TextInput,
  SimpleForm,
  NumberInput,
  ThumbnailField,
  ProductRefField,
  RichTextField,
  Edit,
  NumberField,
  Show,
  FormTab,
  useTranslate,
  TabbedShowLayout,
  TextField,
  List,
  ChipField,
  SingleFieldList,
  Resource, BooleanField
} from 'react-admin';
import users from './index';
import UserAvatar from '../../components/UserAvatar';
import RichTextInput from 'ra-input-rich-text';
import {Divider, Tabs, Tab} from '@material-ui/core';
import ApprovalsTab from '../Customers/ApprovalsTab';
import CreditsTab from '../Customers/CreditsTab';
import EditTitle from '../../components/EditTitle';

export const UserEdit = props => {

  const [currentTab, setCurrentTab] = useState('approvals');

  const tabs = [
    // {id: 'subscriptions', name: 'User Subscription'},
    {id: 'approvals', name: 'User Approvals'},
    {id: 'credits', name: 'Credit Transactions'},
    {id: 'call-log', name: 'Call Log'},
  ];

  const handleChange = (event, value) => {
    setCurrentTab(value);
  };

  return (
    <Fragment>
      <Edit title={<EditTitle/>} {...props}>
        <SimpleForm>
          <TextField formClassName='inline' label='User ID' source="user_id"/>
          <TextField formClassName='inline' label='Customer User ID' source="customer_user_id"/>
          <NumberField formClassName='inline' label='Customer ID' source="customer_id"/>
          <div/>
          <TextInput toolbar={false} formClassName='inline' label='X Data' source="x_data"/>
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
      </Edit>
      <Tabs
        variant="fullWidth"
        centered
        value={currentTab}
        indicatorColor="primary"
        onChange={handleChange}
      >
        {tabs.map(choice => (
          <Tab
            key={choice.id}
            label={choice.name}
            value={choice.id}
          />
        ))}
      </Tabs>
      <div>
        {currentTab === 'approvals' && (
          <ApprovalsTab target='user_id' {...props} />
        )}

        {currentTab === 'credits' && (
          <CreditsTab target='user_id' {...props} />
        )}
      </div>
    </Fragment>
  )
};
