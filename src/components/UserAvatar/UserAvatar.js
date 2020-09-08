import React from 'react';
import Avatar from '@material-ui/core/Avatar';

const UserAvatar = ({record, size}) => {
  let {x_data} = record;
  return <Avatar
    src={`${x_data.img_src}`}
    size={size}
    style={{width: size, height: size}}
  />
}

export default UserAvatar;
