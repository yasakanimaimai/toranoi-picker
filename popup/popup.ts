// @ts-nocheck 
import axios from 'axios';

const localUrl = 'http://localhost:3006'
const renderUrl = 'https://toranoi-list-backend.onrender.com'
const currentUrl = renderUrl

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

// csrfトークンをBEから取得してヘッダーにセット
const getCsrfToken = async () => {
  const { data } = await axios.get(`${currentUrl}/auth/csrf`)
  const csrfToken = data.csrfToken
  console.log('csrfToken:' + csrfToken)
  axios.defaults.headers.common['csrf-token'] = csrfToken
  console.log('header.csrf:' + axios.defaults.headers.common['csrf-token'])
}
getCsrfToken()

// ログインボタンにログイン処理を追加
const loginBtn = document.getElementById('login-button')
loginBtn?.addEventListener('click', async () => {
  const userName = document.getElementById('user-name').value
  const password = document.getElementById('password').value

  await axios.post(`${currentUrl}/auth/login`, {
    userName: userName,
    password: password,
  })
})

// saveボタンに保存処理を追加
const saveBtn = document.getElementById('save-button')
saveBtn?.addEventListener('click', async () => {
  const board = document.getElementById('toranoi-board')
  let abstractText = board.value

  const currentTab = await getCurrentTab()
  const siteTitle = currentTab.title
  const siteUrl = currentTab.url

  await axios.post(`${currentUrl}/article/create`, {
    siteTitle: siteTitle,
    siteUrl: siteUrl,
    abstractText: abstractText,
  }).then((response) => console.log('レスポンス：' + response.data))
})

// popupを開くたびにストレージに保存したテキストを取得
let storageText = ''
chrome.storage.local.get(["text"]).then((result) => {
  storageText = result.text
  document.getElementById('toranoi-board').value = storageText
});

// コピーボタンの処理
const copyBtn = document.getElementById('copy-button')
copyBtn.addEventListener('click', async () => {
  const currentTab = await getCurrentTab()
  const markdownSiteTitle = `[${currentTab.title}](${currentTab.url}) \n`
  const board = document.getElementById('toranoi-board')
  const copyText = markdownSiteTitle + board.value

  navigator.clipboard.writeText(copyText)
})