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
import UserAvatar from '../../components/UserAvatar';

import {
  Tabs,
  Tab,
} from '@material-ui/core';
import UsersTab from './UsersTab';
import ApprovalsTab from './ApprovalsTab';
import CreditsTab from './CreditsTab';

const TitleOfCustomer = ({record}) => <span>Customer {record.name}</span>

export const CustomersEdit = (props) => {

  const [currentTab, setCurrentTab] = useState('users');

  const tabs = [
    {id: 'users', name: 'User Data'},
    {id: 'subscriptions', name: 'User Subscription'},
    {id: 'approvals', name: 'User Approvals'},
    {id: 'credits', name: 'Credit Transactions'},
    {id: 'call-log', name: 'Call Log'},
  ];

  const handleChange = (event, value) => {
    setCurrentTab(value);
  };

  return (
    <Fragment>
      <Edit {...props}>
        <SimpleForm>
          <TextField label='Customer ID' source='customer_id' />
          <DateTimeInput formClassName='inline' source="created_time" />
          <DateTimeInput formClassName='inline'  source="updated_time" />
          <TextInput label='Billing Data' source='billing_data' />
          {/*<TextInput source="api_key" />*/}
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
          <UsersTab {...props} />
        )}

        {currentTab === 'subscriptions' && (
          <Edit {...props} title={<TitleOfCustomer/>}>
            <ReferenceManyField
              reference="subscriptions"
              target="customer_user_id"
              addLabel={false}
              fullWidth
            >
              <Datagrid>
                <NumberField source="id"/>
                <NumberField source="user_id"/>
                <TextField source="subscription_type"/>
                <DateField source="period_start" showTime/>
                <DateField source="period_end" showTime/>
                <NumberField options={{style: 'currency', currency: 'USD'}} source="current_credit_regular"/>
                <NumberField options={{style: 'currency', currency: 'USD'}} source="current_credit_added"/>
                <NumberField source="audio_rate"/>
                <NumberField source="video_rate"/>
                <NumberField options={{style: 'currency', currency: 'USD'}} source="renewal_credit"/>
              </Datagrid>
            </ReferenceManyField>
          </Edit>
        )}

        {currentTab === 'approvals' && (
          <ApprovalsTab {...props} />
        )}

        {currentTab === 'credits' && (
          <CreditsTab {...props} />
        )}
      </div>


      {/*<Tabs*/}
      {/*  variant="fullWidth"*/}
      {/*  centered*/}
      {/*  indicatorColor="primary"*/}
      {/*>*/}
      {/*  <Tab*/}
      {/*    label='User Data'*/}
      {/*  >*/}
      {/*    <ReferenceManyField*/}
      {/*      reference="user-data"*/}
      {/*      target="customer_user_id"*/}
      {/*      addLabel={false}*/}
      {/*      fullWidth*/}
      {/*    >*/}
      {/*      <Datagrid>*/}
      {/*        <NumberField source="id"/>*/}
      {/*        <NumberField source="user_id"/>*/}
      {/*        <NumberField source="customer_user_id"/>*/}
      {/*        <BooleanField source="is_active" valueLabelTrue="True" valueLabelFalse="False"/>*/}
      {/*        <DateField source="created" showTime/>*/}
      {/*        <DateField source="modified" showTime/>*/}
      {/*        <EditButton/>*/}
      {/*      </Datagrid>*/}
      {/*    </ReferenceManyField>*/}
      {/*  </Tab>*/}
      {/*</Tabs>*/}


    </Fragment>)
};
