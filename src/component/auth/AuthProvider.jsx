import React, {useEffect} from 'react'
import {auth} from '../../appConfig'
import {config} from '../../config'
import axios from 'axios'
import liff from '@line/liff'
import {useLoginStore, useLoginDispatch} from '../../hooks/loginContext'

export const AuthContext = React.createContext()

const AuthProvider = ({ children }) => {
  const state = useLoginStore()
  const dispatch = useLoginDispatch()
  const liffId = config.line.login.liffId
  
  useEffect(() => {
    dispatch({ type: "LOADING" })
    liffInit()

    liff.ready.then(()=>{
      auth.onAuthStateChanged(user => {
        if (user) {
          console.log("Already logged in firebase")
          dispatch({type: 'USER', payload: user})
        } else {
          console.log("Not logged in firebase")
          dispatch({ type: "LOADED" })
        }
        if (!state.isListening) {
          dispatch({type: 'LISTENING'})
        }
      }) 
    })
  }, [])

  useEffect(() => {
    dispatch({ type: "LOADED" })
  }, [state.user])
  

  useEffect(() => {
    const query = window.location.search
    const isSecondRedirectURL = /liffClientId=/.test(query) ? true : false

    if (state.client === "LIFF" || isSecondRedirectURL) {
      console.log("Client is LIFF.")
      if (!state.user && state.isListening) {
        console.log("Client is LIFF and not logged in, login start")
        liffLogin()
      }
    }
  }, [state.client, state.isListening])

  const liffInit = async () => {
    console.log("liff init start")
    console.log(liffId)
    await liff
      .init({liffId})
      .then(() => {
        console.log("liff init finished")
        dispatch({type: 'CLIENT', payload: liff.isInClient()})
      })
      .catch(error => console.log("error:" + error))
  }

  const liffLogin = async () => {
    dispatch({ type: "LOADING" })
    if (!liff.isLoggedIn()) {
      console.log("Not logged in LIFF")
      await liff.login()
      console.log("Logged in LIFF Success")
    } else {
      console.log("Already logged in LIFF")
    }

    const accessToken = liff.getAccessToken()
    const url = `${config.functions.hostName}/login`
    const body = {
      accessToken: accessToken
    }
    await axios.post(url, body).then(res => {
      const customToken = res.data.firebase_token
      auth.signInWithCustomToken(customToken).then(res => {
        dispatch({type: 'USER', payload: res.user})
      })
    })
  }

  const liffLogout = async () => {
    dispatch({ type: "LOADING" })
    auth.signOut().then(() => {
      dispatch({type: 'USER', payload: null})
    }).catch((error) => console.log(error))
  }

  const liffClose = async () => {
    await liff.closeWindow()
  }

  return (
    <AuthContext.Provider value={[liffLogin, liffLogout, liffClose]}>
        { children }
    </AuthContext.Provider>
  )
}

export default AuthProvider
