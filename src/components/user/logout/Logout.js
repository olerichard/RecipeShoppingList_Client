import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import { LogOut } from '../../../actions/user/User'
import { UseUser } from '../../../context/user-context';

export default function Logout() {
  const user = UseUser();

  useEffect(() => {
    LogOut()
    user.LogOut();
  }, [])

  return (
    <React.Fragment>
      <Redirect to="/" />
    </React.Fragment>
  )
}