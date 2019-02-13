import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './containers/Home';
import Login from './containers/Login';
import Dirwatch from './containers/Dirwatch';
import Authcomponent from './containers/Authcomponent';

import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <div id="logo_cont">
          <img src='https://cdn1.iconfinder.com/data/icons/unigrid-bluetone-security-vol-1/60/013_045_folder_share_secret_spy_remote_control_bigbrother-512.png' alt="" id='logo'/>
        </div>
        <BrowserRouter>
          <Switch>
            <Route path="/login" exact component={Login} />
            <Authcomponent>
              <Route path="/" exact component={Home} />
            </Authcomponent>
            <Authcomponent>
              <Route path="/folders" exact component={Dirwatch} />
            </Authcomponent>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
