import React from 'react'
import { Tab } from 'semantic-ui-react'
import AboutTab from './AboutTab'
import EventsTab from './EventsTab'
import FollowingTab from './FollowingTab'
import PhotosTab from './PhotosTab'

const ProfileContent = ({ profile, isCurrentUser }) => {
  const panes = [
    {
      menuItem: 'About',
      render: () => (
        <AboutTab profile={profile} isCurrentUser={isCurrentUser} />
      ),
    },
    {
      menuItem: 'Photos',
      render: () => (
        <PhotosTab profile={profile} isCurrentUser={isCurrentUser} />
      ),
    },
    { menuItem: 'Events', render: () => <EventsTab profile={profile} /> },
    { menuItem: 'Followers', render: () => <FollowingTab profile={profile} /> },
    { menuItem: 'Following', render: () => <FollowingTab profile={profile} /> },
  ]

  return (
    <>
      <Tab
        menu={{ fluid: true, vertical: true }}
        menuPosition='right'
        panes={panes}
      />
    </>
  )
}

export default ProfileContent
