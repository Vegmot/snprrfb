import React from 'react';
import ModalWrapper from '../../app/common/modals/ModalManager';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../app/common/form/MyTextInput';
import { Button } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../app/common/modals/modalReducer';
import { signInUser } from '../auth/authActions';

const LoginForm = () => {
  const dispatch = useDispatch();

  return (
    <ModalWrapper size='mini' header='Sign in'>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string().required().email(),
          password: Yup.string().required(),
        })}
        onSubmit={(values, { setSubmitting }) => {
          dispatch(signInUser(values));
          setSubmitting(false);
          dispatch(closeModal());
        }}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form className='ui form'>
            <MyTextInput name='email' placeholder='Email address' />
            <MyTextInput
              name='password'
              placeholder='Password'
              type='password'
            />

            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type='submit'
              fluid
              size='large'
              color='teal'
              content='Login'
            />
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
};

export default LoginForm;
