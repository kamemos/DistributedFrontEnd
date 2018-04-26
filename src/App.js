import React, { Component } from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
<<<<<<< HEAD
import ChatPage from './pages/ChatPage';
=======

>>>>>>> origin/master

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/login" component={LoginPage}/>
            <Route exact path="/signup" component={SignupPage}/>
<<<<<<< HEAD
            <Route exact path="/chat" component={ChatPage}/>
=======
>>>>>>> origin/master
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
