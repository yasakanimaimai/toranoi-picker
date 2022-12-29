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

export const Clipboard: React.FC = () => {

  const localUrl = 'http://localhost:3006'
  const renderUrl = 'https://toranoi-list-backend.onrender.com'
  const currentUrl = localUrl
  
  const { isAuthenticated, getAccessTokenWithPopup, getAccessTokenSilently, loginWithRedirect, logout } = useAuth0();

  // csrfトークンをBEから取得してヘッダーにセット
  const getCsrfToken = async () => {
    const { data } = await axios.get(`${currentUrl}/auth/csrf`)
    const csrfToken = data.csrfToken
    console.log('csrfToken:' + csrfToken)
    return csrfToken
  }

  // popupを開くたびにストレージに保存したテキストを取得
  let storageText = ''
  chrome.storage.local.get(["text"]).then((result) => {
    storageText = result.text
    document.getElementById('toranoi-board').value = storageText
  });

  // 開いてるタブを取得する
  const getCurrentTab = async () => {
    let currentTab;
    await chrome.tabs.query({active: true, currentWindow: true})
      .then((tabs) => {
        currentTab = tabs[0]
        console.log('tab:' + JSON.stringify(currentTab))
      })
    return currentTab
  }

  // 保存ボタン
  const manageOnApp = async () => {
    console.log("manageOnApp")

    // csrfトークンセット
    const csrfToken = await getCsrfToken()
    axios.defaults.headers.common['csrf-token'] = csrfToken
    console.log('header.csrf:' + axios.defaults.headers.common['csrf-token'])

    const board = document.getElementById('toranoi-board')

    // アクセストークン取得
    const accessToken = await getAccessTokenSilently()
    // const accessToken = await getAccessTokenWithPopup()
    console.log("accessToken:" + accessToken)
  
    const currentTab = await getCurrentTab()
    const siteTitle = currentTab.title
    const siteUrl = currentTab.url
    let abstractText = board.value
  
    // post通信
    const res = await axios.post(
      `${currentUrl}/article/create`,
      {
        siteTitle: siteTitle,
        siteUrl: siteUrl,
        abstractText: abstractText,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      }
    )
    console.log("create res:" + res)
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

      {/* クリップボード */}
      <textarea id="toranoi-board" style={{width:"600px", height:"400px", resize:"none"}}></textarea>

      {/* コピーボタン */}
      <button id="copy-button" style={{width:"600px", height:"50px"}}>コピーする</button>

      {/* アプリ登録ボタン */}
      <button
        style={{height: "50px", width: "200px"}}
        onClick={manageOnApp}
      >
        アプリに登録
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
