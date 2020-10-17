import React, {useEffect} from 'react'
import {auth} from '../../appConfig'
import {config} from '../../config'
import axios from 'axios'
import liff from '@line/liff'
import {useLoginStore, useLoginDispatch} from '../../hooks/loginContext'
import {useHistory} from 'react-router-dom'

export const AuthContext = React.createContext()

const AuthProvider = ({ children }) => {
  const state = useLoginStore()
  const dispatch = useLoginDispatch()
  const history = useHistory()

  const liffId = config.line.login.liffId
  
  useEffect(() => {
    liffInit()
    
    auth.onAuthStateChanged(async user => {
      if (user) {
        console.log("Already logged in firebase")
        dispatch({type: 'USER', payload: user})
        history.push("/home")
      } else {
        console.log("Not logged in firebase")
      }
    }) 
  }, [])

  useEffect(() => {
    if (state.client) {
      liffLogin()
    }
  }, [state.client])

  const liffInit = async () => {
    dispatch({type: 'CLIENT', payload: liff.isInClient()})
    await liff
      .init({liffId})
      .catch(error => console.log(error))
  }

  const liffLogin = async () => {
    if (!liff.isLoggedIn()) {
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
    axios.post(url, body).then(res => {
      const customToken = res.data.firebase_token
      auth.signInWithCustomToken(customToken).then(res => {
        dispatch({type: 'USER', payload: res.user})
      })
    })
  }

  const liffLogout = async () => {
    auth.signOut().then(() => {
      dispatch({type: 'USER', payload: null})
    }).catch((error) => console.log(error))
  }

  return (
    <AuthContext.Provider value={[liffLogin, liffLogout]}>
        { children }
    </AuthContext.Provider>
  )
}

export default AuthProvider
