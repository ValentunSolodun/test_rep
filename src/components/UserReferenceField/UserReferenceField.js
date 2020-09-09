import React from 'react';
import {ReferenceField} from 'react-admin';

const UserReferenceField = props => (
  <ReferenceField source="user_id" reference="users" {...props}>
    TEST
  </ReferenceField>
);

export default UserReferenceField;
