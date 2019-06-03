import React from 'react';
import './App.css';
import TopBar from './components/topBar/TopBar';

export default ({ children }) => {

  return (
    <div>
      <TopBar />
      {children}
    </div>
  )
}

