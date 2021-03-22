import React from 'react'
import { Formik, Form } from 'formik'
import { toast } from 'react-toastify'
import { Button } from 'semantic-ui-react'
import { addEventChatComment } from '../../../app/firestore/firebaseService'
import MyTextArea from '../../../app/common/form/MyTextArea'

const EventDetailedChatForm = ({ eventId }) => {
  return (
    <Formik
      initialValues={{ comment: '' }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await addEventChatComment(eventId, values.comment)
          resetForm()
        } catch (error) {
          toast.error(error.message)
        } finally {
          setSubmitting(false)
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className='ui form'>
          <MyTextArea name='comment' placeholder='Say something...' rows={2} />
          <Button
            loading={isSubmitting}
            content='Post'
            icon='edit'
            primary
            type='submit'
          />
        </Form>
      )}
    </Formik>
  )
}

export default EventDetailedChatForm
