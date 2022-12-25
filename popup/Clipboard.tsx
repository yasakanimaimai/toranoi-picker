// @ts-nocheck 
import React from 'react';
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react"
import axios from 'axios';

// backgroundで受け取った値をコンソールに表示
function logBackgroundValue () {
  var test = chrome.extension.getBackgroundPage().test_value;
  console.log(test);
  return test;
}

// const { isAuthenticated, getAccessTokenWithPopup, getAccessTokenSilently, loginWithRedirect, logout } = useAuth0();

// const manageOnApp = async () => {
//   console.log("manageOnApp")
//   const accessToken = await getAccessTokenWithPopup()

//   console.log("accessToken:" + accessToken)
//   console.log("error:" + error)

//   const { data } = await axios.get(
//     `http://localhost:3006/user/get`,
//     {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       }
//     }
//   )

//   console.log("data:" + JSON.stringify(data))
// }



export const Clipboard: React.FC = () => {

  const { isAuthenticated, getAccessTokenWithPopup, getAccessTokenSilently, loginWithRedirect, logout } = useAuth0();

  const manageOnApp = async () => {
    console.log("manageOnApp")
    // const { data } = await axios.get(
      //   `https://api.zipaddress.net/?zipcode=9071801`
      // )
      // console.log("data:" + data)
      
    const appId = chrome.runtime.id;
    console.log("appId:" + appId)
    // ndhjnbhhijpobdlgbmbmchgilhmanapn



    // 以下認証
    console.log("isAuthenticated:" + isAuthenticated)

    // const accessToken = await getAccessTokenWithPopup()
    // const accessToken = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1qMnpMejhodTNvQkN4Z0M1eWJEdSJ9.eyJpc3MiOiJodHRwczovL2Rldi1xdTVsbnhmbjhsb3BocmNkLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJGRGZtNXVzQTVqMkNCc1htOGlvdll0cXVCUDVuZXg4WkBjbGllbnRzIiwiYXVkIjoidG9yYW5vaS1iYWNrZW5kLWxvY2FsIiwiaWF0IjoxNjcxODAxOTIyLCJleHAiOjE2NzE4ODgzMjIsImF6cCI6IkZEZm01dXNBNWoyQ0JzWG04aW92WXRxdUJQNW5leDhaIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.Qajpw9Si7S4jqxPW1klgIR9M9nbmLyk7Mz8paQCdPkvK3Gcr9T674OFz446ExNMxFpkxn0dBkEV8oAF2GK0xdUO61eG_daedxVp9Xb3_InehwpAI06U6QhwQiMXt61EfuaHNCFZb-oLmHvieqLO0cdTur9vYlLN9bG6wxGj1VkuldbX5Gn9dIMa5w2w0WXuiyu_ghT_nsCNPKyk2WjX4t_hBJo8wZzY7gkJZlnEk66zz9A7lXrRlEyHAkoiILUhQ7gmhsfHF3IG6jLYOPwI8spn7iD45Dmt1dlWZ3IGZc1ofJ8TpN1N9BuVABsoyAiWhid3XeMGjGB0kWzabettEZg"
    const authData = await axios.post(
      'https://dev-qu5lnxfn8lophrcd.us.auth0.com/oauth/token', 
      {
        client_id: 'FDfm5usA5j2CBsXm8iovYtquBP5nex8Z',
        client_secret: "GufQTpchFfncGwFfwKLWyNk7XRrmaCPX14Px0tAXxLWlnSyfnAEar9TrMvm3q2gY",
        audience: "toranoi-backend-local",
        grant_type: "client_credentials",
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    console.log("authData:" + JSON.stringify(authData))

    let accessToken = '';
    if (authData) {
      accessToken = authData.data.access_token
    }

  //   curl --request POST \
  // --url https://dev-qu5lnxfn8lophrcd.us.auth0.com/oauth/token \
  // --header 'content-type: application/json' \
  // --data '{"client_id":"FDfm5usA5j2CBsXm8iovYtquBP5nex8Z",
  //  "client_secret":"GufQTpchFfncGwFfwKLWyNk7XRrmaCPX14Px0tAXxLWlnSyfnAEar9TrMvm3q2gY",
  // "audience":"toranoi-backend-local",
  // "grant_type":"client_credentials"}'

    console.log("isAuthenticated:" + isAuthenticated)
    console.log("accessToken:" + accessToken)
  
    const { data } = await axios.get(
      `http://localhost:3006/user/get`,
      {
        headers: {
          // Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1qMnpMejhodTNvQkN4Z0M1eWJEdSJ9.eyJpc3MiOiJodHRwczovL2Rldi1xdTVsbnhmbjhsb3BocmNkLnVzLmF1dGgwLmNvbS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDEwOTI4MDQwNDI1NzU3NDExNjgzNSIsImF1ZCI6WyJ0b3Jhbm9pLWJhY2tlbmQtbG9jYWwiLCJodHRwczovL2Rldi1xdTVsbnhmbjhsb3BocmNkLnVzLmF1dGgwLmNvbS91c2VyaW5mbyJdLCJpYXQiOjE2NzE3ODMxMDAsImV4cCI6MTY3MTg2OTUwMCwiYXpwIjoiVTRCMlBSWndNdkE2cld0OTBXZExGN25ITnFCaVZINFYiLCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIn0.IdJ7Ak7Bm521CmNOpPDcYD85TPMJ020XC78ADnOrrRIr6Zgv_11Obidni_4_Hn1txJNwqg8Jdw5EbRMhfIPFSP_w1E8i4EfOWoPMk5LNIu7BpZHB9yBgxR9f5A9UqEW6_YvCLepRIjB2fiRnIPohMFJqplm53njwTi0f76LWSokyTzKcJZrLnXjwrPmlzGmK5tDavLtDfSlAKyh4ALQwUJXLYTIh75CMQHhpR8Ym1dreOUdunjpxquNkBGK7uV7YjzqE3kjNS_QEBs6X6rbf7RpZoD8Ibg0JkLRyYvxmX-J5fTq4H2evzdsGcacQ0Ku3tNj-wv180hP00kkk0p9zAw
          // `,
          Authorization: `Bearer ${accessToken}`,
        }
      }
    )
  
    console.log("data:" + JSON.stringify(data))
  }

  return (
    <div>
      {isAuthenticated 
        ?(
          <p>ログイン中</p>
        )
        :(
          <p>ログアウト中</p>)
      } 
        <button
          style={{height: "50px", width: "200px"}}
          onClick={manageOnApp}
        >
          アプリで管理
        </button>
        <button
          style={{height: "50px", width: "200px"}}
          onClick={() => {
            logout();
          }}
        >
          ログアウト
        </button>
    </div>
  )
};
