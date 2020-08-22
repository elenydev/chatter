import React from 'react';
import './App.css'
import Sidebar from './components/Sidebar/Sidebar'
import Main from './components/Main/Main'
import Login from './components/Login/Login'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <div className="App__wrapper">
        <Router>
        <Switch>
          <Route path="/" exact>
            <Login/>
          </Route>
          <Route path="/rooms">
            <Sidebar/>
            <Main/>
          </Route>
        </Switch>
          
        </Router>
      </div>
    </div>
  );
}

export default App;
