import React from 'react';
import {Datagrid, DateField, Edit, NumberField, Pagination, ReferenceManyField, TextField, DeleteButton,} from 'react-admin';

const ApprovalsTab = ({target, ...props}) => {
  return (
    <Edit {...props} title=''>
      <ReferenceManyField
        reference="approvals"
        target={target}
        addLabel={false}
        pagination={<Pagination />}
        fullWidth
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
      </ReferenceManyField>
    </Edit>
  )
}

export default ApprovalsTab;
