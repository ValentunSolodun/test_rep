import React from 'react';
import {
  Datagrid, DateField, DeleteButton, EditButton, Filter,
  List,
  NumberField, NumberInput, ReferenceManyField,
  Responsive, SearchInput,
  ShowButton,
  SimpleList,
  TextField,
  SelectInput
} from 'react-admin';
import UserReferenceField from '../../components/UserReferenceField';

const ApprovalFilter = props => (
  <Filter {...props}>
    {/*<SearchInput source="q" alwaysOn />*/}
    <NumberInput label='Approval ID' source='approval_id' />
    <NumberInput label='User ID' source='user_id' />
    <NumberInput label='Target ID' source='target_id' />
    <SelectInput source="status" choices={[
      { id: 'approved', name: 'Approved' },
      { id: 'not_approved', name: 'Not Approved' },
      { id: 'pending', name: 'Pending' },
      { id: 'declined', name: 'Declined' },
    ]} />
  </Filter>
);

export const ApprovalsList = (props) => {
  return (
    <List {...props}
      filters={<ApprovalFilter />}
    >
      <Datagrid rowClick='edit'>
        <NumberField label='Approval ID' source="approval_id"/>
        <NumberField label='User ID' source="user_id"/>
        <NumberField label='Target ID' source="target_id"/>
        <DateField source="created_time" showTime/>
        <DateField source="updated_time" showTime/>
        <TextField source='status' />
        <TextField source='approval' />
        <TextField source='user_approval' />
        <TextField source='target_approval' />
        <DeleteButton />
      </Datagrid>
    </List>)
};
