import { Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { Button, Header, Label, Segment } from 'semantic-ui-react';
import MyTextInput from '../../app/common/form/MyTextInput';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { updateUserPassword } from '../../app/firestore/firebaseService';

const AccountPage = () => {
  const { currentUser } = useSelector(state => state.auth);

  return (
    <>
      <Segment>
        <Header dividing size='large' content='Account' />
        {currentUser.providerId === 'password' && (
          <>
            <Header color='teal' sub content='Change password' />
            <p>Use this form to change your password</p>
            <Formik
              initialValues={{ newPassword1: '', newPassword2: '' }}
              validationSchema={Yup.object({
                newPassword1: Yup.string().required('Password is required'),
                newPassword2: Yup.string().oneOf(
                  [Yup.ref('newPassword1'), null],
                  'Passwords do not match'
                ),
              })}
              onSubmit={async (values, { setSubmitting, setErrors }) => {
                try {
                  await updateUserPassword(values);
                } catch (error) {
                  setErrors({ auth: error.message });
                } finally {
                  // executes regardless of error or no error
                  setSubmitting(false);
                }
              }}
            >
              {({ errors, isSubmitting, isValid, dirty }) => (
                <Form className='ui form'>
                  <MyTextInput
                    name='newPassword1'
                    type='password'
                    placeholder='New password'
                  />

                  <MyTextInput
                    name='newPassword2'
                    type='password'
                    placeholder='Confirm password'
                  />

                  {errors.auth && (
                    <Label
                      basic
                      color='red'
                      style={{ marginBottom: '10' }}
                      content={errors.auth}
                    />
                  )}

                  <Button
                    style={{ display: 'block' }}
                    type='submit'
                    disabled={!isValid || isSubmitting || !dirty}
                    loading={isSubmitting}
                    size='large'
                    positive
                    content='Update password'
                  />
                </Form>
              )}
            </Formik>
          </>
        )}

        {currentUser.providerId === 'google.com' && (
          <>
            <Header color='teal' sub content='Google account' />
            <p>Please visit Google to update your account</p>
            <Button
              icon='google'
              color='google plus'
              as={Link}
              to='http://www.google.com'
              content='Go to google'
            />
          </>
        )}
      </Segment>
    </>
  );
};

export default AccountPage;
