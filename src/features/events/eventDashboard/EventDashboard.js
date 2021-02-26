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

  return (
    <>
      <Grid>
        <Grid.Column width={10}>
          <EventList events={events} selectEvent={selectEvent} />
        </Grid.Column>

        <Grid.Column width={6}>
          {formOpen && (
            <EventForm
              setFormOpen={setFormOpen}
              setEvents={setEvents}
              createEvent={createEventHandler}
              selectedEvent={selectedEvent}
              key={selectedEvent ? selectedEvent.id : null}
            />
          )}
        </Grid.Column>
      </Grid>
    </>
  );
};

export default EventDashboard;
