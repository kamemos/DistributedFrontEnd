import React, { Component } from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Header from './components/Header';
//import HomePage from './pages/HomePage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/"/>
            <Route path="/chat"/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
