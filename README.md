This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Configuration

### Create project

`npx create-react-app liff-login-sample`

`firebase init`



`cd functions`

`firebase functions:config:set service_account="$(cat /path/to/your/serviceAccountKey.json)"`

`firebase functions:config:set line.login.channel_id="YOUR_LINE_LOGIN_CHANNEL_ID"`
 

### Install packages

`npm install --save firebase axios react-router-dom @line/liff`

For functions

`cd functions`

`npm install --save axios cors`
