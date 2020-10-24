import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useLoginStore } from '../../hooks/loginContext'
import { Loading } from '../template'

const PrivateRoute = (props) => {
  const state = useLoginStore()

  return (
    (state.isListening) ? (
      state.user ? <Route {...props} /> : <Redirect to="/" />
    ) : (
      <Loading />
    )
  )
}

export default PrivateRoute
