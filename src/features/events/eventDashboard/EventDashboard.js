import React, { useState } from 'react';
import { Grid } from 'semantic-ui-react';
import EventForm from '../eventForm/EventForm';
import EventList from './EventList';

import { sampleData } from '../../../app/api/sampleData';

const EventDashboard = ({
  formOpen,
  setFormOpen,
  selectEvent,
  selectedEvent,
}) => {
  const [events, setEvents] = useState(sampleData);

  const createEventHandler = event => {
    setEvents([...events, event]);
  };

  const updateEventHandler = updatedEvent => {
    setEvents(
      events.map(event => (event.id === updatedEvent.id ? updatedEvent : event))
    );
    selectEvent(null);
  };

  const deleteEventHandler = eventId => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  return (
    <>
      <Grid>
        <Grid.Column width={10}>
          <EventList
            events={events}
            selectEvent={selectEvent}
            deleteEvent={deleteEventHandler}
          />
        </Grid.Column>

        <Grid.Column width={6}>
          {formOpen && (
            <EventForm
              setFormOpen={setFormOpen}
              setEvents={setEvents}
              createEvent={createEventHandler}
              selectedEvent={selectedEvent}
              updateEvent={updateEventHandler}
              key={selectedEvent ? selectedEvent.id : null}
            />
          )}
        </Grid.Column>
      </Grid>
    </>
  );
};

export default EventDashboard;
