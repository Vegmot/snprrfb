import React from 'react';
import { Header, Segment, Button } from 'semantic-ui-react';
import cuid from 'cuid';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateEvent, createEvent } from '../eventActions';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MySelectInput from '../../../app/common/form/MySelectInput';
import MyDateInput from '../../../app/common/form/MyDateInput';
import MyTextArea from '../../../app/common/form/MyTextArea';

import { categoryOptions } from '../../../app/api/categoryOptions';

const EventForm = ({ match, history }) => {
  const dispatch = useDispatch();

  const selectedEvent = useSelector(state =>
    state.event.events?.find(e => e.id.toString() === match.params.id)
  );

  const initialValues = selectedEvent ?? {
    title: '',
    category: '',
    description: '',
    city: '',
    venue: '',
    date: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Please provide the title of the event'),
    category: Yup.string().required('Please specify the category of the event'),
    description: Yup.string().required('Please breifly describe the event'),
    city: Yup.string().required('In which city will this event be held?'),
    venue: Yup.string().required(
      'At which place in the city will this event be held?'
    ),
    date: Yup.string().required('When will the event be held?'),
  });

  return (
    <>
      <Segment clearing>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={values => {
            selectedEvent
              ? dispatch(updateEvent({ ...selectedEvent, ...values }))
              : dispatch(
                  createEvent({
                    ...values,
                    id: cuid(),
                    hostedBy: 'A',
                    attendees: [],
                    hostPhotoURL: '/assets/user.png',
                  })
                );
            history.push('/events');
          }}
        >
          {({ isSubmitting, dirty, isValid }) => (
            <Form className='ui form'>
              <Header content='Event details' sub color='teal' />
              <MyTextInput name='title' placeholder='Event title' />
              <MySelectInput
                name='category'
                placeholder='Event category'
                options={categoryOptions}
              />
              <MyTextArea
                name='description'
                placeholder='Event description'
                rows={3}
              />

              <Header content='Event location details' sub color='teal' />
              <MyTextInput name='city' placeholder='Event city' />
              <MyTextInput name='venue' placeholder='Event venue' />
              <MyDateInput
                name='date'
                placeholderText='Date/Time (click here)'
                timeFormat='HH:mm'
                showTimeSelect
                timeCaption='time'
                dateFormat='MMMM d, yyyy h:mm a'
              />

              <Button
                loading={isSubmitting}
                disabled={!isValid || !dirty || isSubmitting}
                type='submit'
                floated='right'
                positive
                content='Submit'
              />
              <Button
                as={Link}
                to='/events'
                type='submit'
                floated='right'
                content='Cancel'
                disabled={isSubmitting}
              />
            </Form>
          )}
        </Formik>
      </Segment>
    </>
  );
};

export default EventForm;
