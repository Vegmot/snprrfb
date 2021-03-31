import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Divider, Modal } from 'semantic-ui-react'
import { openModal } from '../../app/common/modals/modalReducer'

const UnauthModal = ({ history }) => {
  const [open, setOpen] = useState(true)
  const { prevLocation } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const closeHandler = () => {
    if (history && prevLocation) {
      history.push(prevLocation.pathname)
    } else {
      history.push('/events')
    }
    setOpen(false)
  }

  return (
    <>
      <Modal open={open} size="mini" onClose={closeHandler}>
        <Modal.Header content="You need to sign in" />
        <Modal.Content>
          <p>Please either log in or sign up to see this content</p>
          <Button.Group widths={4}>
            <Button
              fluid
              color="teal"
              content="Login"
              onClick={() => dispatch(openModal({ modalType: 'LoginForm' }))}
            />

            <Button.Or />

            <Button
              fluid
              color="green"
              content="Register"
              onClick={() => dispatch(openModal({ modalType: 'RegisterForm' }))}
            />
          </Button.Group>

          <Divider />

          <div style={{ textAlign: 'center' }}>
            <p>Or click cancel to continue as a guest</p>
            <Button onClick={closeHandler} content="Cancel" />
          </div>
        </Modal.Content>
      </Modal>
    </>
  )
}

export default UnauthModal
