import React from 'react';
import {
  Datagrid,
  EditButton,
  List,
  TextField,
  NumberField,
  BooleanField,
  DateField
} from 'react-admin';

import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { stringify } from 'query-string';

// const LinkToRelatedCustomers = ({ record }) => {
//   // const translate = useTranslate();
//   // const classes = useStyles();
//   return (
//     <Button
//       size="small"
//       color="primary"
//       component={Link}
//       to={{
//         pathname: '/customers',
//         search: stringify({
//           page: 1,
//           perPage: 25,
//           sort: 'id',
//           order: 'DESC',
//           filter: JSON.stringify({ user_id: record.id }),
//         }),
//       }}
//     >
//       Customers
//     </Button>
//   );
// };

export const UserList = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id"/>
        <TextField source="user_id"/>
        <TextField source="customer_user_id"/>
        <BooleanField source="is_active" valueLabelTrue="True" valueLabelFalse="False"/>
        <DateField source="created" showTime />
        <DateField source="modified" showTime />
        <EditButton/>
      </Datagrid>
    </List>)
};
