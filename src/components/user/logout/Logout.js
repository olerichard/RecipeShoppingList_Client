import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import { LogOut } from '../../../actions/user/User'

export default function Logout() {

  useEffect(() => {

    LogOut()
    return window.location.reload()
  }, [])


  return (
    <div><Redirect to="/" /></div>
  )
}