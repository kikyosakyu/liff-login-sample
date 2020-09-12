import React, {useEffect, useState} from 'react'
import {auth} from '../../appConfig'
import liff from '@line/liff'
import {config} from '../../config'
import axios from 'axios'


const SignIn = () => {
  const [currentUser, setCurrentUser] = useState(null)
  
  const liffId = config.line.login.liffId
  console.log(liffId)
  
  useEffect(() => {
    const liffLogin = async () => {
      await liff
        .init({liffId})
        .catch(error => console.log(error))
      if (!liff.isLoggedIn()) {
        console.log("Not Logged In!!")
        await liff.login()
      } else {
        console.log("Loggin Success")
      }

      auth.onAuthStateChanged(async user => {
        if (user) {
          setCurrentUser(user)
        } else {
          const accessToken = liff.getAccessToken()
          console.log(accessToken)
          const url = `${config.functions.hostName}/login`
          const body = {
            accessToken: accessToken
          }
          console.log(url)
          axios.post(url, body).then(res => {
            console.log(res)
            const customToken = res.data.firebase_token
            auth.signInWithCustomToken(customToken).then(res => {
              setCurrentUser(res.user)
            })
          })
          
          
        }
      })
    }
    
    liffLogin()
  }, [])
  
  return (
    <>
      {currentUser}
    </>
  )
}

export default SignIn
