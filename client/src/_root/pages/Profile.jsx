import React from 'react'
import ProfileInfo from '../../components/shared/profile/ProfileInfo'
import Posts from '../../components/shared/Posts'

const Profile = () => {
  return (
    <div className='Profile'>
      <ProfileInfo />
      <Posts />
    </div>
  )
}

export default Profile