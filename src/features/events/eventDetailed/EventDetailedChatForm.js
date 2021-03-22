import React from 'react'
import { Formik, Form, Field } from 'formik'
import { toast } from 'react-toastify'
import { Loader } from 'semantic-ui-react'
import { addEventChatComment } from '../../../app/firestore/firebaseService'
import * as Yup from 'yup'

const EventDetailedChatForm = ({ eventId, parentId, closeForm }) => {
  return (
    <Formik
      initialValues={{ comment: '' }}
      validationSchema={Yup.object({
        comment: Yup.string().required(),
      })}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await addEventChatComment(eventId, { ...values, parentId })
          resetForm()
        } catch (error) {
          toast.error(error.message)
        } finally {
          setSubmitting(false)
          closeForm({ open: false, commentId: null })
        }
      }}
    >
      {({ isSubmitting, handleSubmit, isValid }) => (
        <Form className='ui form'>
          <Field name='comment'>
            {({ field }) => (
              <div style={{ position: 'relative' }}>
                <Loader active={isSubmitting} />
                <textarea
                  rows='2'
                  {...field}
                  placeholder='Say something... (press ENTER to submit, SHIFT+ENTER for new line'
                  onKeyPress={e => {
                    if (e.key === 'Enter' && e.shiftKey) {
                      return
                    }

                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      isValid && handleSubmit()
                    }
                  }}
                ></textarea>
              </div>
            )}
          </Field>
        </Form>
      )}
    </Formik>
  )
}

export default EventDetailedChatForm
