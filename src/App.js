import React from 'react';
import logo from './logo.svg';
import './App.css';
import _ from 'lodash';
import {Admin, Resource, ListGuesser, fetchUtils} from 'react-admin';
import authProvider from './authProvider';
import jsonServerProvider from 'ra-data-json-server';
import Login from './pages/Login'
import simpleRestProvider from 'ra-data-simple-rest';
import users from './resouces/Users';
import customers from './resouces/Customers';
import subscriptions from './resouces/Subscriptions';
import approvals from './resouces/Approvals';
import transactions from './resouces/Credits';
import callLog from './resouces/CallLog';
import dataProvider from './dataProvider';

const App = () => {
  return (
    <Admin
      authProvider={authProvider}
      loginPage={Login}
      dataProvider={dataProvider}
    >
      <Resource name="customers" {...customers}/>
      <Resource name="users" {...users}/>
      {/*<Resource name="subscription" {...subscriptions}/>*/}
      <Resource name="approvals" {...approvals}/>
      <Resource name="credits" {...transactions}/>
      {/*<Resource name="call-log" {...callLog}/>*/}
    </Admin>
  );
}

const generateQueryWithOrder = (query, order) => {
  if (_.isEmpty(order)) return query;
  if (!query) return '';
  const createdOrderPartOfQuery =
    _.join(order, ' ');
  return `${query} order by ${createdOrderPartOfQuery}`;
};

window.test = generateQueryWithOrder

export default App;
