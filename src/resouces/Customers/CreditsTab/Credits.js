import React from 'react';
import {Datagrid, DateField, Edit, NumberField, Pagination, ReferenceManyField, TextField, Filter, DeleteButton} from 'react-admin';
import ColoredNumberField from '../../../components/ColorNumberField';

const CreditsTab = ({target, ...props}) => {
  return (
    <Edit {...props} title=''>
      <ReferenceManyField
        reference="credits"
        target={target}
        addLabel={false}
        filer={<Filter />}
        pagination={<Pagination />}
        fullWidth
      >
        <Datagrid rowClick='edit'>
          <NumberField label='Credit ID' source="credit_id"/>
          <NumberField label='User ID' source="user_id"/>
          <NumberField label='Amount' source="amount"/>
          <DateField source="created_time" showTime/>
          <NumberField label='Session ID' source="session_id"/>
          <NumberField label='Payment ID' source="payment_id"/>
          <TextField source='reason'/>
          <NumberField source="duration"/>
          <NumberField label='Customer ID' source="customer_id"/>
          <DeleteButton />
        </Datagrid>
      </ReferenceManyField>
    </Edit>
  )
};

export default CreditsTab;
