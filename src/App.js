import React from "react";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";
import Login from "./components/Login/Login";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { selectUser } from "./features/user/userSlice";
import { ConfirmProvider } from "material-ui-confirm";
import SimpleReactLightbox from "simple-react-lightbox";
import Policy from "./components/Policy/Policy";

function App() {
  const currentUser = useSelector(selectUser);

  return (
    <ConfirmProvider>
      <Router>
        <div className='App'>
          {!currentUser ? (
            <>
              <div className='App__wrapper'>
                <Route path='/' exact component={Login} />
                <Route path='/policy' exact component={Policy} />
              </div>
            </>
          ) : (
            <div className='App__wrapper'>
              <Sidebar />
              <Switch>
                <Route path='/rooms/:roomId'>
                  <SimpleReactLightbox>
                    <Main />
                  </SimpleReactLightbox>
                </Route>
                <Route path='/rooms'>
                  <Main />
                </Route>
              </Switch>
            </div>
          )}
        </div>
      </Router>
    </ConfirmProvider>
  );
}

export default App;
