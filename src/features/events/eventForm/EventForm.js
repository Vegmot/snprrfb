import React, { useState } from 'react';
import { Form, Header, Segment, Button } from 'semantic-ui-react';
import cuid from 'cuid';

const EventForm = ({
  setFormOpen,
  setEvents,
  createEvent,
  selectedEvent,
  updateEvent,
}) => {
  const initialValues = selectedEvent ?? {
    title: '',
    category: '',
    description: '',
    city: '',
    venue: '',
    date: '',
  };

  const [values, setValues] = useState(initialValues);

  const onChangeHandler = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const submitHandler = () => {
    selectedEvent
      ? updateEvent({ ...selectedEvent, ...values })
      : createEvent({
          ...values,
          id: cuid(),
          hostedBy: 'A',
          attendees: [],
          hostPhotoURL: '/assets/user.png',
        });
    setFormOpen(false);
  };

  return (
    <>
      <Segment clearing>
        <Header
          content={selectedEvent ? 'Edit the event' : 'Create a new event'}
        />

        <Form onSubmit={submitHandler}>
          <Form.Field>
            <input
              type='text'
              placeholder='Event title'
              name='title'
              value={values.title}
              onChange={e => onChangeHandler(e)}
            />
          </Form.Field>

          <Form.Field>
            <input
              type='text'
              placeholder='Category'
              name='category'
              value={values.category}
              onChange={e => onChangeHandler(e)}
            />
          </Form.Field>

          <Form.Field>
            <input
              type='text'
              placeholder='Description'
              name='description'
              value={values.description}
              onChange={e => onChangeHandler(e)}
            />
          </Form.Field>

          <Form.Field>
            <input
              type='text'
              placeholder='City'
              name='city'
              value={values.city}
              onChange={e => onChangeHandler(e)}
            />
          </Form.Field>

          <Form.Field>
            <input
              type='text'
              placeholder='Venue'
              name='venue'
              value={values.venue}
              onChange={e => onChangeHandler(e)}
            />
          </Form.Field>

          <Form.Field>
            <input
              type='date'
              placeholder='Date'
              name='date'
              value={values.date}
              onChange={e => onChangeHandler(e)}
            />
          </Form.Field>

          <Button type='submit' floated='right' positive content='Submit' />
          <Button
            onClick={() => setFormOpen(false)}
            type='submit'
            floated='right'
            content='Cancel'
          />
        </Form>
      </Segment>
    </>
  );
};

export default EventForm;
