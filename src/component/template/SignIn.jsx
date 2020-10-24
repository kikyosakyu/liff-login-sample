import React, {useContext, useEffect} from 'react'
import {useLoginStore} from '../../hooks/loginContext'
import {AuthContext} from '../auth/AuthProvider'
import {useHistory} from 'react-router-dom'
import {Loading} from './index'

const SignIn = () => {
  const state = useLoginStore()
  const history = useHistory()

  const liffLogin = useContext(AuthContext)[0]

  useEffect(() => {
    if (state.user) {
      history.push("/home")
    }
  }, [state.user])

  return (
    <>
      {state.isLoading ? (
        <Loading />
      ) : (
        (state.client === "EXT" && !state.user && state.isListening) ? (
          <button type="button" onClick={() => liffLogin()}>
            SIGN IN
          </button>
        ) : (
          <Loading />
        )
      )}
    </>
  )
}

export default SignIn
