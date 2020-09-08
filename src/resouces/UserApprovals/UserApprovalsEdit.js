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
  SelectInput,
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

export const UserApprovalsEdit = props => {
  return (
    <Edit title={<CategoryTitle/>} {...props}>
      <SimpleForm>
        <NumberField label='ID' source="approval_id"/>
        <NumberField label='User ID' source="user_id"/>
        <div />
        <DateTimeInput formClassName='inline' source="created_time" showTime/>
        <DateTimeInput formClassName='inline' source="updated_time" showTime/>
        <div />
        <SelectInput formClassName='inline' source='status' choices={[
          { id: 'approved', name: 'Approved' },
          { id: 'not_approved', name: 'Not Approved' },
          { id: 'declined', name: 'Declined' },
        ]}/>
        <SelectInput formClassName='inline' source='approval' choices={[
          { id: 'call', name: 'Call' },
          { id: 'video_call', name: 'Video Call' },
          { id: 'game', name: 'Game' },
        ]}/>
        <div />
        <SelectInput formClassName='inline' source='user_approval' choices={[
          { id: 'call', name: 'Call' },
          { id: 'video_call', name: 'Video Call' },
          { id: 'game', name: 'Game' },
        ]}/>
        <SelectInput formClassName='inline' source='target_approval' choices={[
          { id: 'call', name: 'Call' },
          { id: 'video_call', name: 'Video Call' },
          { id: 'game', name: 'Game' },
        ]}/>
      </SimpleForm>
    </Edit>
  )
};
