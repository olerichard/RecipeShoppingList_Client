import React from 'react';
import { Link } from 'react-router-dom'
import TopAppBar, {
  TopAppBarFixedAdjust,
  TopAppBarIcon,
  TopAppBarRow,
  TopAppBarSection,
  TopAppBarTitle,
} from '@material/react-top-app-bar';
import MaterialIcon from '@material/react-material-icon';
import '@material/react-top-app-bar/dist/top-app-bar.css';
import '@material/react-material-icon/dist/material-icon.css';
import { useUser } from '../../context/user-context';

const style = {
  List: {
    listStyle: "none",
    textDecoration: "none"
  },
  Link: {
    textDecoration: "none",
    color: "white"
  }
};

export default function TopBar({ title }) {

  const user = useUser();

  return (
    <div style={{ gridArea: "TopBar" }}>
      <TopAppBar>
        <TopAppBarRow>
          <TopAppBarSection align='start'>
            <TopAppBarIcon navIcon tabIndex={0}>
              <MaterialIcon hasRipple icon='menu' onClick={() => console.log('click')} />
            </TopAppBarIcon>
            <TopAppBarTitle>{title}</TopAppBarTitle>
          </TopAppBarSection>
          <TopAppBarSection align='end' role='toolbar'>
            <ul style={style.List}>
              {user.loggedIn
                ? <React.Fragment>
                  <li>{user.name}</li>
                  <li><Link style={style.Link} to="/logout">Log Out</Link></li>
                </React.Fragment>
                : <li><Link style={style.Link} to="/login">Log In</Link></li>
              }

            </ul>
          </TopAppBarSection>
        </TopAppBarRow>
      </TopAppBar>
      <TopAppBarFixedAdjust>
      </TopAppBarFixedAdjust>
    </div>
  );
}