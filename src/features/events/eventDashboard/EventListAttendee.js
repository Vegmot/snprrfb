import React from 'react';
import { Image, List } from 'semantic-ui-react';

const EventListAttendee = () => {
  return (
    <>
      <List.Item>
        <Image size='mini' circular src='/assets/user.png' />
      </List.Item>
    </>
  );
};

export default EventListAttendee;
