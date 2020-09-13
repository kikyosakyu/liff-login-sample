import React from 'react';
import {Route, Router, Switth} from 'react-router-dom'
import {SignIn} from './component/template'
import {AuthProvider, PrivateRoute} from './component/auth'
import {LiffProvider} from './component/line'

const App = ()  => {
  return (
    <div className="App">
      <AuthProvider>
        <LiffProvider>
          <SignIn/>
        </LiffProvider>
      </AuthProvider>
    </div>
    
  );
}

export default App;
