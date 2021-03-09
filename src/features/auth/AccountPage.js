import { Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { Button, Header, Label, Segment } from 'semantic-ui-react';
import MyTextInput from '../../app/common/form/MyTextInput';
import { Link } from 'react-router-dom';

const AccountPage = () => {
  return (
    <>
      <Segment>
        <Header dividing size='large' content='Account' />
        <div>
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
            onSubmit={values => {
              console.log(values);
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
                  type='submit'
                  disabled={!isValid || isSubmitting || !dirty}
                  size='large'
                  positive
                  content='Update password'
                />
              </Form>
            )}
          </Formik>
        </div>

        <div>
          <Header color='teal' sub content='Google account' />
          <p>Please visit Google to update your account</p>
          <Button
            icon='google'
            color='google plus'
            as={Link}
            to='http://www.google.com'
            content='Go to google'
          />
        </div>
      </Segment>
    </>
  );
};

export default AccountPage;
