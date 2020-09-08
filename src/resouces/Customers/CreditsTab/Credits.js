import React from 'react';
import {Datagrid, DateField, Edit, NumberField, Pagination, ReferenceManyField, TextField, Filter} from 'react-admin';
import ColoredNumberField from '../../../components/ColorNumberField';

const TitleOfCustomer = ({record}) => <span>Customer {record.name}</span>

const CreditsTab = (props) => {
  return (
    <Edit {...props} title={<TitleOfCustomer/>}>
      <ReferenceManyField
        reference="credits"
        target="customer_id"
        addLabel={false}
        filer={<Filter />}
        pagination={<Pagination />}
        fullWidth
      >
        <Datagrid>
          <NumberField label='ID' source="payment_id"/>
          <NumberField label='User ID' source="user_id"/>
          {/*<ColoredNumberField*/}
          {/*  options={{style: 'currency', currency: 'USD'}}*/}
          {/*  label='Amount' source="amount"*/}
          {/*/>*/}
          <DateField source="created_time" showTime/>
          <NumberField label='Session ID' source="session_id"/>
          <NumberField label='Payment ID' source="payment_id"/>
          <TextField source='reason'/>
          <NumberField source="duration"/>
          <NumberField label='Customer ID' source="customer_id"/>
          {/*<DateField source="updated_time" showTime/>*/}
          {/*<TextField source='status'/>*/}
          {/*<TextField source='approval'/>*/}
          {/*<TextField source='user_approval'/>*/}
          {/*<TextField source='target_approval'/>*/}
        </Datagrid>
      </ReferenceManyField>
    </Edit>
  )
};

export default CreditsTab;
