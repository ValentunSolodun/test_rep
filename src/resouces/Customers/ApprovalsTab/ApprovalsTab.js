import React from 'react';
import {Datagrid, DateField, Edit, NumberField, Pagination, ReferenceManyField, TextField} from 'react-admin';

const TitleOfCustomer = ({record}) => <span>Customer {record.name}</span>

const ApprovalsTab = (props) => {
  return (
    <Edit {...props} title={<TitleOfCustomer/>}>
      <ReferenceManyField
        reference="approvals"
        target="customer_id"
        addLabel={false}
        pagination={<Pagination />}
        fullWidth
      >
        <Datagrid rowClick='edit'>
          <NumberField label='ID' source="approval_id"/>
          <NumberField label='User ID' source="user_id"/>
          <NumberField label='Target ID' source="target_id"/>
          <DateField source="created_time" showTime/>
          <DateField source="updated_time" showTime/>
          <TextField source='status' />
          <TextField source='approval' />
          <TextField source='user_approval' />
          <TextField source='target_approval' />
        </Datagrid>
      </ReferenceManyField>
    </Edit>
  )
}

export default ApprovalsTab;
