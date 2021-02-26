import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';
import SignedInMenu from './SignedInMenu';
import SignedOutMenu from './SignedOutMenu';

const Navbar = ({ setFormOpen }) => {
  const history = useHistory();
  const [authenticated, setAuthenticated] = useState(false);

  const signoutHandler = () => {
    setAuthenticated(false);
    history.push('/');
  };

  return (
    <>
      <Menu inverted fixed='top'>
        <Container>
          <Menu.Item as={NavLink} exact to='/' header>
            <img
              src='/assets/logo.png'
              alt='logo'
              style={{ marginRight: '15px' }}
            />
            SNP-RRFB
          </Menu.Item>

          <Menu.Item as={NavLink} to='/events' name='Events' />
          {authenticated && (
            <Menu.Item as={NavLink} to='/createEvent'>
              <Button positive inverted content='Create an event' />
            </Menu.Item>
          )}

          {authenticated ? (
            <SignedInMenu signOut={signoutHandler} />
          ) : (
            <SignedOutMenu setAuthenticated={setAuthenticated} />
          )}
        </Container>
      </Menu>
    </>
  );
};

export default Navbar;
