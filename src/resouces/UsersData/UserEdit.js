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
  ThumbnailField,
  ProductRefField,
  RichTextField,
  Edit,
  NumberField,
  Show,
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

const CategoryTitle = ({record}) => {
  return (
    <span>{record.name}</span>
  );
};

export const UserEdit = props => {
  return (
    <Edit title={<CategoryTitle/>} {...props}>
      <SimpleForm>
        <BooleanInput source="is_active"/>
        <DateTimeInput source="created" />
        <DateTimeInput source="modified" />
      </SimpleForm>
    </Edit>
  )
};
