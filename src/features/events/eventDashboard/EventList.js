import React from 'react';
import EventListItem from './EventListItem';

const EventList = ({ events, selectEvent }) => {
  return (
    <>
      {events.map(event => (
        <EventListItem event={event} key={event.id} selectEvent={selectEvent} />
      ))}
    </>
  );
};

export default EventList;
