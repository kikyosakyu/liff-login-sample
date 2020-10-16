import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import { useLoginStore } from '../../hooks/loginContext'

const PrivateRoute = ({ children, ...rest }) => {
  const state = useLoginStore()
  return (
    <Route
      {...rest}
      render={({ location }) =>
              (state.user) ? (
                children
              ) : (
                <Redirect
                  to={{
                    pathname: "/",
                    state: {from: location}
                  }}
                />
              )}
    />
  )
}

export default PrivateRoute
