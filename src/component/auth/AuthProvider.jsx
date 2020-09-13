import React, {useEffect, useState} from 'react'
import {auth} from '../../appConfig'
import {config} from '../../config'
import {liff} from '@line/liff'
import axios from 'axios'

export const AuthContext = React.createContext()

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)

  const liffId = config.line.login.liffId

  const liffLogin = async () => {
    liff.init({liffId})
      .catch(error => console.log(error))

    if (!liff.isLoggedIn()) {
      console.log("Not Logged In LIFF!!")
      await liff.login()
      console.log("Logged in LIFF Success")
    } else {
      console.log("Logged in LIFF Success")
    }
    
    auth.onAuthStateChanged(async user => {
      if (user) {
        console.log("Already logged in firebase")
        setCurrentUser(user)
      } else {
        console.log("Not logged in firebase")
        
        const accessToken = liff.getAccessToken()
        const url = `${config.functions.hostName}/login`
        const body = {
          accessToken: accessToken
        }
        axios.post(url, body).then(res => {
          const customToken = res.data.firebase_token
          auth.signInWithCustomToken(customToken).then(res => {
            setCurrentUser(res.user)
          })
        })
      }
    })
  }

  
  useEffect(() => {
    liffLogin()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        currentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}


export default AuthProvider
