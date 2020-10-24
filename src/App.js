import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {SignIn, Home, Profile} from './component/template'
import {AuthProvider,PrivateRoute} from './component/auth'
import {LoginProvider} from './hooks/loginContext'



const App = ()  => {
  return (
    <LoginProvider>
      <Router>
        <AuthProvider>
          <Switch>
            <Route exact path="/" component={SignIn}></Route>
            <PrivateRoute exact path="/home" component={Home}></PrivateRoute>
            <PrivateRoute exact path="/profile" component={Profile}></PrivateRoute>
          </Switch>
        </AuthProvider>
      </Router>
    </LoginProvider>
  );
}

export default App;
