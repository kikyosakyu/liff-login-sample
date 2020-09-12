const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios')


const serviceAccount = functions.config().service_account;
if (!serviceAccount) {
  throw new Error('Please set SERVICE ACCOUNT before you deploy')
}
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const axiosInstance = axios.create({
  baseURL: 'https://api.line.me',
  responceType: 'json'
})

const verifyToken = async accessToken => {
  const responce = await axiosInstance
        .get('/oauth2/v2.1/verify', {params: {accessToken: accessToken}})
  if (responce.status !== 200) {
    console.error(responce.data.error_description)
    throw new Error(responce.data.error)
  }

  if (responce.data.client_id !== functions.config().line.login.channel_id) {
    throw new Error('client_id does not match.')
  }

  if (responce.data.expires_in < 0) {
    throw new Error('access token is expired')
  }
}

const getProfile = async accessToken => {
  const responce = await axiosInstance.get('/v2/profile', {
    headers: {
      'Authorization' : `Bearer ${accessToken}`
    },
    data: {}
  })
  if (responce.status !== 200) {
    console.error(responce.data.error_description)
    throw new Error(responce.data.error)
  }
  return responce.data
}

exports.login = functions
  .region('asia-northeast1')
  .https
  .onRequest(async (req, res) => {
    const accessToken = req.body.accessToken
    console.log(accessToken)
    try {
      await verifyToken(accessToken)
      const profile = await getProfile(accessToken)

      const createRequest = {}
      createRequest["uid"] = 'line:' + profile.userId
      createRequest["displayName"] = profile.displayName
      createRequest["photoURL"] = profile.pictureUrl

      await admin.auth().getUser(createRequest.uid).then(()=>{
        console.log(`user ${createRequest.uid} was found`)
      }).catch(async error => {
        if (error.code === 'auth/user-not-found'){
          await admin.auth().createUser(createRequest).then(() => {
            console.log('created user succesfully.')
          })
        }
      })

      const claims = {
        provider: 'LINE'
      }
      console.log(claims)
      await admin.auth().setCustomUserClaims(createRequest.uid, claims)
      
      const firebaseCustomToken = await admin.auth().createCustomToken(createRequest.uid)
      
      res.status(200).send({
        firebase_token: firebaseCustomToken
      })
      
    } catch (e) {
      
    }
  })
