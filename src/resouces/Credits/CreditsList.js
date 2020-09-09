import React from 'react';
import {
  Datagrid, DateField, DeleteButton, EditButton, Filter,
  List,
  NumberField, NumberInput, ReferenceManyField,
  Responsive, SearchInput,
  ShowButton,
  SimpleList,
  TextField
} from 'react-admin';
import CustomNumberInput from '../../components/CustomNumberInput';

const CreditFilter = props => (
  <Filter {...props}>
    {/*<SearchInput source="q" alwaysOn />*/}
    <NumberInput label='Credit ID' source='credit_id' />
    <NumberInput label='User ID' source='user_id' />
    <NumberInput label='Customer ID' source='customer_id' />
    <CustomNumberInput source='amount' />
  </Filter>
);

export const CreditsList = (props) => {
  return (
    <List {...props}
      filters={<CreditFilter/>}
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
    </List>)
};
