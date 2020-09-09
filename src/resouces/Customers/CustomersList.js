import React from 'react';
import {
  BooleanField,
  BooleanInput,
  Datagrid,
  DateField, Filter,
  List, NumberInput,
  TextField
} from 'react-admin';
import CustomNumberInput from '../../components/CustomNumberInput';

const CustomerFilter = props => (
  <Filter {...props}>
    {/*<SearchInput source="q" alwaysOn />*/}
    <NumberInput label='Customer ID' source='customer_id'/>
    <BooleanInput source='enabled' />
  </Filter>
);

export const CustomersList = (props) => {
  return (
    <List {...props}
          filters={<CustomerFilter/>}
    >
      <Datagrid rowClick="edit">
        <TextField label='Customer ID' source="customer_id"/>
        <DateField source="created_time" showTime/>
        <DateField source="updated_time" showTime/>
        <BooleanField source="enabled" valueLabelTrue="True" valueLabelFalse="False"/>
      </Datagrid>
    </List>)
};
