import React, { useState } from 'react'
import { toast } from 'react-toastify'
import {
  Button,
  Divider,
  Grid,
  Header,
  Item,
  Reveal,
  Segment,
  Statistic,
} from 'semantic-ui-react'
import {
  followUser,
  unfollowUser,
} from '../../../app/firestore/firestoreService'

const ProfileHeader = ({ profile, isCurrentUser }) => {
  const [loading, setLoading] = useState(false)

  const followUserHandler = async () => {
    setLoading(true)
    try {
      await followUser(profile)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const unfollowUserHandler = async () => {
    setLoading(true)
    try {
      await unfollowUser(profile)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Segment>
        <Grid>
          <Grid.Column width={12}>
            <Item>
              <Item.Image
                avatar
                size='small'
                src={profile?.photoURL || `/assets/user.png`}
              />

              <Item.Content verticalAlign='middle'>
                <Header
                  as='h1'
                  style={{ display: 'block', marginBottom: 10 }}
                  content={profile?.displayName}
                />
              </Item.Content>
            </Item>
          </Grid.Column>

          <Grid.Column width={4}>
            <Statistic.Group>
              <Statistic label='Followers' value={10} />
              <Statistic label='Following' value={5} />
            </Statistic.Group>

            {!isCurrentUser && (
              <>
                <Divider />

                <Reveal animated='move'>
                  <Reveal.Content visible style={{ width: '100%' }}>
                    <Button fluid color='teal' content='Following' />
                  </Reveal.Content>

                  <Reveal.Content hidden style={{ width: '100%' }}>
                    <Button
                      onClick={followUserHandler}
                      loading={loading}
                      basic
                      color='green'
                      content='Follow'
                    />
                    <Button
                      onClick={unfollowUserHandler}
                      loading={loading}
                      basic
                      color='red'
                      content='Unfollow'
                    />
                  </Reveal.Content>
                </Reveal>
              </>
            )}
          </Grid.Column>
        </Grid>
      </Segment>
    </>
  )
}

export default ProfileHeader
