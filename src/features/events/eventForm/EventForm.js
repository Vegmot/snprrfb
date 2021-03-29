import React, { useState } from 'react'
import { Header, Segment, Button, Confirm } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listenToSelectedEvent } from '../eventActions'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import MyTextInput from '../../../app/common/form/MyTextInput'
import MySelectInput from '../../../app/common/form/MySelectInput'
import MyDateInput from '../../../app/common/form/MyDateInput'
import MyTextArea from '../../../app/common/form/MyTextArea'

import { categoryOptions } from '../../../app/api/categoryOptions'
import {
  addEventsToFirestore,
  cancelEventToggle,
  listenToEventsFromFirestore,
  updateEventInFirestore,
} from '../../../app/firestore/firestoreService'
import { useFirestoreDoc } from '../../../app/hooks/useFirestoreDoc'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { toast } from 'react-toastify'

const EventForm = ({ match, history }) => {
  const dispatch = useDispatch()
  const [loadingCancel, setLoadingCancel] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const { loading, error } = useSelector(state => state.async)
  const { selectedEvent } = useSelector(state => state.event)

  const initialValues = selectedEvent ?? {
    title: '',
    category: '',
    description: '',
    city: '',
    venue: '',
    date: '',
  }

  const validationSchema = Yup.object({
    title: Yup.string().required('Please provide the title of the event'),
    category: Yup.string().required('Please specify the category of the event'),
    description: Yup.string().required('Please breifly describe the event'),
    city: Yup.string().required('In which city will this event be held?'),
    venue: Yup.string().required(
      'At which place in the city will this event be held?'
    ),
    date: Yup.string().required('When will the event be held?'),
  })

  const cancelToggleHandler = async event => {
    setConfirmOpen(false)
    setLoadingCancel(true)
    try {
      await cancelEventToggle(event)
      setLoadingCancel(false)
    } catch (error) {
      setLoadingCancel(true)
      toast.error(error.message)
    }
  }

  useFirestoreDoc({
    shouldExecute: !!match.params.id,
    query: () => listenToEventsFromFirestore(match.params.id),
    data: event => dispatch(listenToSelectedEvent(event)),
    dependencies: [match, dispatch],
  })

  if (loading) return <LoadingComponent content="Loading event..." />

  if (error) return <Redirect to="/error" />

  return (
    <>
      <Segment clearing>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              selectedEvent
                ? await updateEventInFirestore(values)
                : await addEventsToFirestore(values)
              setSubmitting(false)
              history.push('/events')
            } catch (error) {
              toast.error(error.message)
              setSubmitting(false)
            }
          }}
        >
          {({ isSubmitting, dirty, isValid, values }) => (
            <Form className="ui form">
              <Header content="Event details" sub color="teal" />
              <MyTextInput name="title" placeholder="Event title" />
              <MySelectInput
                name="category"
                placeholder="Event category"
                options={categoryOptions}
              />
              <MyTextArea
                name="description"
                placeholder="Event description"
                rows={3}
              />

              <Header content="Event location details" sub color="teal" />
              <MyTextInput name="city" placeholder="Event city" />
              <MyTextInput name="venue" placeholder="Event venue" />
              <MyDateInput
                name="date"
                placeholderText="Date/Time (click here)"
                timeFormat="HH:mm"
                showTimeSelect
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm a"
              />

              <Button
                loading={isSubmitting}
                disabled={!isValid || !dirty || isSubmitting}
                type="submit"
                floated="right"
                positive
                content="Submit"
              />

              {selectedEvent && (
                <Button
                  loading={loadingCancel}
                  type="button"
                  floated="left"
                  color={selectedEvent.isCancelled ? 'green' : 'red'}
                  content={
                    selectedEvent.isCancelled
                      ? 'Reactivate event'
                      : 'Cancel event'
                  }
                  onClick={() => setConfirmOpen(true)}
                />
              )}

              <Button
                as={Link}
                to="/events"
                type="submit"
                floated="right"
                content="Cancel"
                disabled={isSubmitting}
              />
            </Form>
          )}
        </Formik>

        <Confirm
          content={
            selectedEvent?.isCancelled
              ? 'This will reactivate the event - are you sure?'
              : 'This will cancel the event - are you sure?'
          }
          open={confirmOpen}
          onCancel={() => setConfirmOpen(false)}
          onConfirm={() => cancelToggleHandler(selectedEvent)}
        />
      </Segment>
    </>
  )
}

export default EventForm
