import React from 'react';
import {
  BooleanField,
  Datagrid,
  DateField,
  Edit,
  EditButton,
  NumberField,
  Pagination,
  ReferenceManyField,
  TextField
} from 'react-admin';
import UserAvatar from '../../../components/UserAvatar';

const TitleOfCustomer = ({record}) => <span>Customer {record.name}</span>

const UsersTab = (props) => {
  return (
    <Edit {...props} title= {<TitleOfCustomer/>}>
      <ReferenceManyField
        reference="users"
        target="customer_id"
        pagination={<Pagination />}
        addLabel={false}
        fullWidth
      >
        <Datagrid rowClick="edit">
          <NumberField label='ID' source="user_id"/>
          <NumberField label='Customer User ID' source="customer_user_id"/>
          <TextField source="availability"/>
          <BooleanField source="is_online" valueLabelTrue="True" valueLabelFalse="False"/>
          <DateField source="created_time" showTime/>
          <DateField source="updated_time" showTime/>
          <NumberField label='Customer ID' source="customer_id"/>
          <TextField label='Name' source="x_data.name"/>
          <TextField label='Passion' source="x_data.passion"/>
          <TextField label='Truth' source="x_data.truth"/>
          <UserAvatar label='Img' source="x_data.img_src"/>
          {/*<EditButton/>*/}
        </Datagrid>
      </ReferenceManyField>
    </Edit>
  )
}

export default UsersTab;
