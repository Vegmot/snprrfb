import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import EventList from './EventList';
import { useSelector } from 'react-redux';
import EventListItemPlaceholder from './EventListItemPlaceholder';
import EventFilters from './EventFilters';
import { getEventsFromFireStore } from '../../../app/firestore/firestoreService';

const EventDashboard = () => {
  const { events } = useSelector(state => state.event);
  const { loading } = useSelector(state => state.async);

  useEffect(() => {
    const unsubscribe = getEventsFromFireStore({
      next: snapshot => console.log(snapshot.docs.map(doc => doc.data())),
      error: error => console.log(error),
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <Grid>
        <Grid.Column width={10}>
          {loading && (
            <>
              <EventListItemPlaceholder />
              <EventListItemPlaceholder />
            </>
          )}
          <EventList events={events} />
        </Grid.Column>

        <Grid.Column width={6}>
          <EventFilters />
        </Grid.Column>
      </Grid>
    </>
  );
};

export default EventDashboard;
