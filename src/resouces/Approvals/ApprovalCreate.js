import React from 'react';
import {
  BooleanInput,
  Create,
  DateTimeInput,
  Edit,
  NumberField,
  NumberInput, SelectInput,
  SimpleForm,
  TextField,
  TextInput
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';
import {Divider} from '@material-ui/core';
import CustomNumberInput from '../../components/CustomNumberInput';

export const ApprovalCreate = (props) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <NumberInput formClassName='inline' label='Approval ID' source="approval_id"/>
        <NumberInput formClassName='inline' label='User ID' source="user_id"/>
        <NumberInput formClassName='inline' label='Target ID' source="target_id"/>
        <div />
        <SelectInput formClassName='inline' source='status' choices={[
          { id: 'approved', name: 'Approved' },
          { id: 'not_approved', name: 'Not Approved' },
          { id: 'pending', name: 'Pending' },
          { id: 'declined', name: 'Declined' },
        ]}/>
        <SelectInput formClassName='inline' source='approval' choices={[
          { id: 'call', name: 'Call' },
          { id: 'video_call', name: 'Video Call' },
          { id: 'game', name: 'Game' },
        ]}/>
        <div />
        <SelectInput formClassName='inline' source='user_approval' choices={[
          { id: 'call', name: 'Call' },
          { id: 'video_call', name: 'Video Call' },
          { id: 'game', name: 'Game' },
        ]}/>
        <SelectInput formClassName='inline' source='target_approval' choices={[
          { id: 'call', name: 'Call' },
          { id: 'video_call', name: 'Video Call' },
          { id: 'game', name: 'Game' },
        ]}/>
      </SimpleForm>
    </Create>
  )
};
