import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {SignIn, Home} from './component/template'
import {AuthProvider,PrivateRoute} from './component/auth'
import {LoginProvider} from './hooks/loginContext'



const App = ()  => {
  return (
    <div className="App">
      <LoginProvider>
        <AuthProvider>
          <Router>
            <Switch>
              <Route exact path="/" component={SignIn}></Route>
              <PrivateRoute exact path="/home" component={Home}></PrivateRoute>
            </Switch>
          </Router>
        </AuthProvider>
      </LoginProvider>
    </div>
    
  );
}

export default App;
