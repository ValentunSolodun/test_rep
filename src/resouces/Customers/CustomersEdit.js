import React, {useState, Fragment} from 'react';
import {
  Datagrid, DateField, EditButton,
  ReferenceManyField,
  SimpleShowLayout,
  List,
  BooleanField,
  FormTab,
  TabbedForm,
  Edit,
  NumberField,
  Responsive,
  ShowButton,
  SimpleList,
  SimpleForm,
  TextInput,
  TextField
} from 'react-admin';

import {
  Tabs,
  Tab,
} from '@material-ui/core';

const TitleOfCustomer = ({record}) => <span>Customer {record.name}</span>

export const CustomersEdit = (props) => {

  const [currentTab, setCurrentTab] = useState('user-data');

  const tabs = [
    {id: 'user-data', name: 'User Data'},
    {id: 'user-subscription', name: 'User Subscription'},
    {id: 'user-approvals', name: 'User Approvals'},
    {id: 'credit-transactions', name: 'Credit Transactions'},
    {id: 'call-log', name: 'Call Log'},
  ];

  const handleChange = (event, value) => {
    setCurrentTab(value);
  };

  return (
    <Fragment>
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
        {currentTab === 'user-data' && (
          <Edit {...props} title={<TitleOfCustomer/>}>
            <ReferenceManyField
              reference="users"
              target="customer_id"
              addLabel={false}
              fullWidth
            >
              <Datagrid>
                <NumberField source="user_id"/>
                {/*<NumberField source="customer_user_id"/>*/}
                <BooleanField source="is_online" valueLabelTrue="True" valueLabelFalse="False"/>
                <TextField source="x_data.name"/>
                <TextField source="x_data.passion"/>
                <TextField source="x_data.truth"/>
                <TextField source="x_data.img_src"/>
                <DateField source="created_time" showTime/>
                <DateField source="updated_time" showTime/>
                <EditButton/>
              </Datagrid>
            </ReferenceManyField>
          </Edit>
        )}

        {currentTab === 'user-subscription' && (
          <Edit {...props} title={<TitleOfCustomer/>}>
            <ReferenceManyField
              reference="user-subscription"
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

        {currentTab === 'user-approvals' && (
          <Edit {...props} title={<TitleOfCustomer/>}>
            <ReferenceManyField
              reference="user-approvals"
              target="customer_user_id"
              addLabel={false}
              fullWidth
            >
              <Datagrid>
                <NumberField source="id"/>
                <NumberField source="approving_user_id"/>
                <NumberField source="approved_user_id"/>
                <NumberField source="approved_status"/>
                <DateField source="status_change" showTime />
              </Datagrid>
            </ReferenceManyField>
          </Edit>
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
