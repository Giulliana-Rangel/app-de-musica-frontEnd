import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Login from './pages/Login';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <>
        <p>TrybeTunes</p>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/search" component={ Search } />
          <Route
            path="/album/:id"
            component={ Album }
          />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route exact path="/page/not/found" component={ NotFound } />
        </Switch>
      </>
    );
  }
}

export default App;
