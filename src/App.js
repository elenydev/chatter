import React from 'react';
import './App.css'
import Sidebar from './components/Sidebar/Sidebar'
import Main from './components/Main/Main'
import Login from './components/Login/Login'
import {useSelector} from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { selectUser } from './features/user/userSlice';
function App() {
  const currentUser = useSelector(selectUser);

  const PrivateRoute = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          currentUser ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }
  return (
    <div className="App">
      <div className="App__wrapper">
        <Router>
        <Switch>
          <Route path="/" exact>
            <Login/>
          </Route>
          <PrivateRoute path="/rooms">
            <Sidebar/>
            <Main/>
          </PrivateRoute>
        </Switch>
          
        </Router>
      </div>
    </div>
  );
}

export default App;
