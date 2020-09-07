import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Admin, Resource, ListGuesser, fetchUtils} from 'react-admin';
import authProvider from './authProvider';
import jsonServerProvider from 'ra-data-json-server';
import Login from './pages/Login'
import simpleRestProvider from 'ra-data-simple-rest';
import users from './resouces/UsersData';
import customers from './resouces/Customers';
import subscriptions from './resouces/UserSubscription';
import approvals from './resouces/UserApprovals';
import transactions from './resouces/CreditTransactions';
import callLog from './resouces/CallLog';
import dataProvider from './dataProvider';
import videoSystemData from './resouces/VideoSystemData';

const App = () => {
  return (
    <Admin
      authProvider={authProvider}
      loginPage={Login}
      title=''
      dataProvider={dataProvider}
    >
      <Resource name="customers" {...customers}/>
      <Resource name="users" {...users}/>
      <Resource name="user-subscription" {...subscriptions}/>
      <Resource name="user-approvals" {...approvals}/>
      <Resource name="credit-transactions" {...transactions}/>
      <Resource name="call-log" {...callLog}/>
      {/*<Resource name="video-system-data" {...videoSystemData}/>*/}
    </Admin>
  );
}

export default App;
