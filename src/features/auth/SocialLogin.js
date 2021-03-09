import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { closeModal } from '../../app/common/modals/modalReducer';
import { socialLogin } from '../../app/firestore/firebaseService';

const SocialLogin = () => {
  const dispatch = useDispatch();

  const socialLoginHandler = provider => {
    dispatch(closeModal());
    socialLogin(provider);
  };

  return (
    <>
      <Button
        icon='facebook'
        fluid
        color='facebook'
        style={{ marginBottom: 10 }}
        disabled
        content='Login with Facebook (not available)'
      />

      <Button
        icon='twitter'
        fluid
        color='twitter'
        style={{ marginBottom: 10 }}
        disabled
        content='Login with Twitter (not available)'
      />

      <Button
        icon='google'
        fluid
        color='google plus'
        content='Login with Google'
        onClick={() => socialLoginHandler('google')}
      />
    </>
  );
};

export default SocialLogin;
