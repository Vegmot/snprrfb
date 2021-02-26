import React, { useState } from 'react';
import Navbar from '../../features/nav/Navbar';
import EventDashboard from '../../features/events/eventDashboard/EventDashboard';
import { Container } from 'semantic-ui-react';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import EventDetailedPage from '../../features/events/eventDetailed/EventDetailedPage';
import EventForm from '../../features/events/eventForm/EventForm';

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
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <Navbar setFormOpen={createFormOpenHandler} />
            <Container className='main'>
              <Switch>
                <Route exact path='/events' component={EventDashboard} />
                <Route path='/events/:id' component={EventDetailedPage} />
                <Route path='/createEvent' component={EventForm} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
};

export default App;
