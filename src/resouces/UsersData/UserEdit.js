import React from 'react';
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
  Tab,
  TabbedShowLayout,
  TextField,
  List,
  ChipField,
  SingleFieldList,
  Resource, BooleanField
} from 'react-admin';
import users from './index';
import UserAvatar from '../../components/UserAvatar';
import { Divider } from '@material-ui/core';

const CategoryTitle = ({record}) => {
  return (
    <span>{record.name}</span>
  );
};

export const UserEdit = props => {
  return (
    <Edit title={<CategoryTitle/>} {...props}>
      <SimpleForm>
        <TextField label='User ID' source="user_id"/>
        <UserAvatar size={100} label='Img' source="x_data.img_src"/>
        <div />
        <TextInput formClassName='inline' label='Name' source="x_data.name"/>
        <TextInput formClassName='inline' label='Passion' source="x_data.passion"/>
        <TextInput formClassName='inline' label='Truth' source="x_data.truth"/>
        <div />
        <TextInput formClassName='inline' source="availability"/>
        {/*<BooleanField source="is_online" valueLabelTrue="True" valueLabelFalse="False"/>*/}
        <DateTimeInput formClassName='inline' source="created_time"/>
        <DateTimeInput formClassName='inline' source="updated_time"/>
        {/*<NumberField label='Customer ID' source="customer_id"/>*/}
        <Divider style={{width: '100%', marginBottom: 20}} />
        <BooleanInput label='Notification Dating Service' source="settings.notificationDatingService"/>
        <BooleanInput label='Notification Offline Calls' source="settings.notificationOfflineCalls"/>
        <BooleanInput label='Receive calls at selected time only' source="settings.notificationInTime"/>
        <NumberInput formClassName='inline' source="settings.notificationInTimeEnd"/>
        <NumberInput formClassName='inline' source="settings.notificationInTimeStart"/>
      </SimpleForm>
    </Edit>
  )
};
