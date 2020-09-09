import React, {useState, Fragment} from 'react';
import {
  Datagrid, DateField, EditButton,
  ReferenceManyField,
  SimpleShowLayout,
  List,
  BooleanInput,
  BooleanField,
  FormTab,
  TabbedForm,
  Edit,
  NumberField,
  Responsive,
  ShowButton,
  SimpleList,
  SimpleForm,
  DateTimeInput,
  TextInput,
  TextField
} from 'react-admin';

import {
  Tabs,
  Tab,
} from '@material-ui/core';
import UsersTab from './UsersTab';
import ApprovalsTab from './ApprovalsTab';
import CreditsTab from './CreditsTab';
import EditTitle from '../../components/EditTitle';

export const CustomersEdit = (props) => {

  const [currentTab, setCurrentTab] = useState('users');

  const tabs = [
    {id: 'users', name: 'User Data'},
    // {id: 'subscriptions', name: 'User Subscription'},
    {id: 'approvals', name: 'User Approvals'},
    {id: 'credits', name: 'Credit Transactions'},
    // {id: 'call-log', name: 'Call Log'},
  ];

  const handleChange = (event, value) => {
    setCurrentTab(value);
  };

  return (
    <Fragment>
      <Edit title={<EditTitle />} {...props}>
        <SimpleForm>
          <TextField label='Customer ID' source='customer_id' />
          <TextInput source="api_key"/>
          <TextInput source="api_secret"/>
          <BooleanInput label="Enabled" source="enabled" />
        </SimpleForm>
      </Edit>
      <Tabs
        variant="fullWidth"
        centered
        value={currentTab}
        indicatorColor="primary"
        onChange={handleChange}
      >
        {tabs.map(choice => (
          <Tab
            key={choice.id}
            label={choice.name}
            value={choice.id}
          />
        ))}
      </Tabs>
      <div>
        {currentTab === 'users' && (
          <UsersTab target='customer_id' {...props} />
        )}

        {currentTab === 'approvals' && (
          <ApprovalsTab target='customer_id' {...props} />
        )}

        {currentTab === 'credits' && (
          <CreditsTab target='customer_id' {...props} />
        )}
      </div>
    </Fragment>)
};
