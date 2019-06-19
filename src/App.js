import React from 'react';
import './App.css';
import TopBar from './components/topBar/TopBar';
import { UserProvider } from './context/user-context'

export default ({ children }) => {

  return (
    <div>
      <UserProvider>
        <TopBar />
        {children}
      </UserProvider>
    </div>
  )
}

