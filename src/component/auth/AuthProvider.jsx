import React, {useEffect, useState} from 'react'
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
  console.log(liffId)
  
  useEffect(() => {
    liffInit()
    
    auth.onAuthStateChanged(async user => {
      if (user) {
        console.log("Already logged in firebase")
        dispatch({type: 'USER', payload: user})
        history.push("/home")
      } else {
        console.log("Not logged in firebase")
        
        if (state.client) {
          liffLogin()
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
    }) 
  }, [])

  const liffInit = async () => {
    await liff
      .init({liffId})
      .catch(error => console.log(error))

    const client = liff.isInClient()
    dispatch({type: 'CLIENT', payload: client})
    console.log(state)
    console.log(client)
  }

  const liffLogin = async () => {
    if (!liff.isLoggedIn()) {
      console.log("Not Logged In LIFF!!")
      await liff.login()
      console.log("Logged in LIFF Success")
    } else {
      console.log("Logged in LIFF Success")
    }
  }
  
  return (
    <AuthContext.Provider value={liffLogin}>
        { children }
    </AuthContext.Provider>
  )
}

export default AuthProvider
