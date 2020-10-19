import React, {useContext, useEffect} from 'react'
import {useLoginStore, useLoginDispatch} from '../../hooks/loginContext'
import {AuthContext} from '../auth/AuthProvider'
import {useHistory} from 'react-router-dom'

const SignIn = () => {
  const state = useLoginStore()
  const dispatch = useLoginDispatch()
  const history = useHistory()

  const liffLogin = useContext(AuthContext)[0]

  useEffect(() => {
    if (state.user) {
      history.push("/home")
      dispatch({ type: "LOADED" })
    }
  }, [state.user])

  return (
    <>
      {state.isLoading ? (
        "Loading..."
      ) : (
        (state.client === "EXT" && !state.user) ? (
          <button type="button" onClick={() => liffLogin()}>
            SIGN IN
          </button>
        ) : (
          null
        )
      )}
    </>
  )
}

export default SignIn
