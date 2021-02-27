import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';
import EventList from './EventList';

import { sampleData } from '../../../app/api/sampleData';

const EventDashboard = () => {
  const [events, setEvents] = useState(sampleData);

  /*   const createEventHandler = event => {
    setEvents([...events, event]);
  };

  const updateEventHandler = updatedEvent => {
    setEvents(
      events.map(event => (event.id === updatedEvent.id ? updatedEvent : event))
    );
  }; */

  const deleteEventHandler = eventId => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  return (
    <>
      <Grid>
        <Grid.Column width={10}>
          <EventList events={events} deleteEvent={deleteEventHandler} />
        </Grid.Column>

        <Grid.Column width={6}>
          <h2>Event filters</h2>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default EventDashboard;
