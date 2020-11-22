import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

import EditAlbum from 'screens/EditAlbum';
import EditTrack from 'screens/EditTrack';
import Dashboard from 'screens/Dashboard';

const App = () => {
  return (
    <>
      <Switch>
        <Route path='/edit_album' component={EditAlbum} />
        <Route path='/edit_track' component={EditTrack} />
        <Route path='/dashboard' component={Dashboard} />
        <Redirect to='/dashboard' />
      </Switch>
    </>
  );
};

export default App;
