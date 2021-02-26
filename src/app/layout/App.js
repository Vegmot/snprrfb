import React, { useState } from 'react';
import Navbar from '../../features/nav/Navbar';
import EventDashboard from '../../features/events/eventDashboard/EventDashboard';
import { Container } from 'semantic-ui-react';

const App = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const selectEventHandler = event => {
    setSelectedEvent(event);
    setFormOpen(true);
  };

  const createFormOpenHandler = () => {
    setSelectedEvent(null);
    setFormOpen(true);
  };

  return (
    <>
      <Navbar setFormOpen={createFormOpenHandler} />
      <Container className='main'>
        <EventDashboard
          formOpen={formOpen}
          setFormOpen={setFormOpen}
          selectEvent={selectEventHandler}
          selectedEvent={selectedEvent}
        />
      </Container>
    </>
  );
};

export default App;
