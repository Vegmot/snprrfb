import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Segment, Comment, Header } from 'semantic-ui-react'
import {
  firebaseObjectToArray,
  getEventChatRef,
} from '../../../app/firestore/firebaseService'
import EventDetailedChatForm from './EventDetailedChatForm'
import { listenToEventChat } from '../eventActions'
import { Link } from 'react-router-dom'
import { formatDistance } from 'date-fns'
import { CLEAR_COMMENTS } from '../eventContstants'
import { createDataTree } from '../../../app/common/util/util'

const EventDetailedChat = ({ eventId }) => {
  const dispatch = useDispatch()
  const { comments } = useSelector(state => state.event)
  const { authenticated } = useSelector(state => state.auth)
  const [showReplyForm, setShowReplyForm] = useState({
    open: false,
    commentId: null,
  })

  const closeReplyFormHandler = () => {
    setShowReplyForm({ open: false, commentId: null })
  }

  useEffect(() => {
    getEventChatRef(eventId).on('value', snapshot => {
      if (!snapshot.exists()) return

      dispatch(
        listenToEventChat(firebaseObjectToArray(snapshot.val()).reverse())
      )
    })

    return () => {
      dispatch({ type: CLEAR_COMMENTS })
      getEventChatRef().off()
    }
  }, [eventId, dispatch])

  return (
    <>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: 'none' }}
      >
        <Header>
          {authenticated
            ? 'Chat about this event'
            : 'Sign in to view and post comments'}
        </Header>
      </Segment>

      {authenticated && (
        <Segment attached>
          <EventDetailedChatForm
            eventId={eventId}
            parentId={0}
            closeForm={setShowReplyForm}
          />
          <Comment.Group>
            {createDataTree(comments).map(comment => (
              <Comment key={comment.id}>
                <Comment.Avatar src={comment.photoURL || '/assets/user.png'} />
                <Comment.Content>
                  <Comment.Author as={Link} to={`/profile/${comment.uid}`}>
                    {comment.displayName}
                  </Comment.Author>
                  <Comment.Metadata>
                    <div>{formatDistance(comment.date, new Date())} ago</div>
                  </Comment.Metadata>
                  <Comment.Text>
                    {comment.text.split('\n').map((txt, index) => (
                      <span key={index}>
                        {txt}
                        <br />
                      </span>
                    ))}
                  </Comment.Text>
                  <Comment.Actions>
                    <Comment.Action
                      onClick={() =>
                        setShowReplyForm({
                          open: !showReplyForm.open,
                          commentId: comment.id,
                        })
                      }
                    >
                      Reply
                    </Comment.Action>
                    {showReplyForm.open &&
                      showReplyForm.commentId === comment.id && (
                        <EventDetailedChatForm
                          eventId={eventId}
                          parentId={comment.id}
                          closeForm={closeReplyFormHandler}
                        />
                      )}
                  </Comment.Actions>
                </Comment.Content>

                {comment.childNodes?.length > 0 && (
                  <Comment.Group>
                    {comment.childNodes.reverse().map(child => (
                      <Comment key={child.id}>
                        <Comment.Avatar
                          src={child.photoURL || '/assets/user.png'}
                        />
                        <Comment.Content>
                          <Comment.Author
                            as={Link}
                            to={`/profile/${child.uid}`}
                          >
                            {child.displayName}
                          </Comment.Author>
                          <Comment.Metadata>
                            <div>
                              {formatDistance(child.date, new Date())} ago
                            </div>
                          </Comment.Metadata>
                          <Comment.Text>
                            {child.text.split('\n').map((txt, index) => (
                              <span key={index}>
                                {txt}
                                <br />
                              </span>
                            ))}
                          </Comment.Text>
                          <Comment.Actions>
                            <Comment.Action
                              onClick={() =>
                                setShowReplyForm({
                                  open: !showReplyForm.open,
                                  commentId: child.id,
                                })
                              }
                            >
                              Reply
                            </Comment.Action>
                            {showReplyForm.open &&
                              showReplyForm.commentId === child.id && (
                                <EventDetailedChatForm
                                  eventId={eventId}
                                  parentId={child.parentId}
                                  closeForm={closeReplyFormHandler}
                                />
                              )}
                          </Comment.Actions>
                        </Comment.Content>
                      </Comment>
                    ))}
                  </Comment.Group>
                )}
              </Comment>
            ))}
          </Comment.Group>
        </Segment>
      )}
    </>
  )
}

export default EventDetailedChat
