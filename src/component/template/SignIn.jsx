import React, {useEffect, useState, useContext} from 'react'
import {auth} from '../../appConfig'
import {config} from '../../config'
import axios from 'axios'
import liff from '@line/liff'
// import {LiffContext} from '../line/LiffProvider'
import {AuthContext} from '../auth/AuthProvider'



const SignIn = () => {
  // const [currentUser, setCurrentUser] = useState(null)
  const [displayName, setDisplayName] = useState("")
  const [photoURL, setPhotoURL] = useState("")
  // const {liff} = useContext(LiffContext)
  const {currentUser} = useContext(AuthContext)
  
  // const liffId = config.line.login.liffId
  // console.log(liffId)
  // console.log(liff)
  
  useEffect(() => {
    // const liffLogin = async () => {
    //   await liff
    //     .init({liffId})
    //     .catch(error => console.log(error))
    //   if (!liff.isLoggedIn()) {
    //     console.log("Not Logged In!!")
    //     await liff.login()
    //   } else {
    //     console.log("Loggin Success")
    //   }

    //   auth.onAuthStateChanged(async user => {
    //     if (user) {
    //       console.log(user)
    //       setCurrentUser(user)
    //       setDisplayName(user.displayName)
    //       setPhotoURL(user.photoURL)
    //     } else {
    //       const accessToken = liff.getAccessToken()
    //       console.log(accessToken)
    //       const url = `${config.functions.hostName}/login`
    //       const body = {
    //         accessToken: accessToken
    //       }
    //       console.log(url)
    //       axios.post(url, body).then(res => {
    //         console.log(res)
    //         const customToken = res.data.firebase_token
    //         auth.signInWithCustomToken(customToken).then(res => {
    //           console.log(res.user)
    //           setCurrentUser(res.user)
    //           setDisplayName(user.displayName)
    //           setPhotoURL(user.photoURL)
    //         })
    //       })
          
          
    //     }
    //   })
    // }
    // liffLogin()

    if (currentUser!==null) {
      setDisplayName(currentUser.displayName)
      setPhotoURL(currentUser.photoURL)
    }
  }, [currentUser])
  
  return (
    <>
      hello {displayName}
      <img src={photoURL}/>
    </>
  )
}

export default SignIn
