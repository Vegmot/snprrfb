import React from 'react';
import { Form, Header, Segment, Button } from 'semantic-ui-react';

const EventForm = () => {
  return (
    <>
      <Segment clearing>
        <Header content='Create a new event' />

        <Form>
          <Form.Field>
            <input type='text' placeholder='Event title' />
          </Form.Field>

          <Form.Field>
            <input type='text' placeholder='Category' />
          </Form.Field>

          <Form.Field>
            <input type='text' placeholder='Description' />
          </Form.Field>

          <Form.Field>
            <input type='text' placeholder='City' />
          </Form.Field>

          <Form.Field>
            <input type='text' placeholder='Venue' />
          </Form.Field>

          <Form.Field>
            <input type='date' placeholder='Date' />
          </Form.Field>

          <Button type='submit' floated='right' positive content='Submit' />
          <Button type='submit' floated='right' content='Cancel' />
        </Form>
      </Segment>
    </>
  );
};

export default EventForm;
