// @ts-nocheck 
import React from 'react';
import { useAuth0 } from "@auth0/auth0-react"
import axios from 'axios';
import { useState, useEffect } from 'react';
import { 
  IconDatabase,
  IconClipboard,
  IconExternalLink,
  IconQuestionCircle,
} from '@tabler/icons';
import { 
  LoadingOverlay, 
  Button, 
  Group, 
  TextInput, 
  Tooltip,
  Anchor,
  Badge,
} from '@mantine/core';

import RichTextEditor from '@mantine/rte';

export const Clipboard: React.FC = () => {

  const localUrl = 'http://localhost:3006'
  const renderUrl = 'https://toranoi-list-backend.onrender.com'
  const currentUrl = localUrl
  
  const localLoginUrl = 'http://localhost:3000'

  const { isAuthenticated, getAccessTokenSilently, logout } = useAuth0();
  // useStateにしてもうまくいかないので一旦ベタ書き
  let siteUrl = ''

  // state
  const [accessToken, setAccessToken] = useState()
  const [visible, setVisible] = useState(false);
  const [abstractText, setAbstractText] = useState('');
  const [opened, setOpend] = useState(false);

  // レンダリング毎に実行される
  useEffect(() => {

    const setTextAndToken = async () => {

      // ちょい時間かかるのでawaitなし
      getAccessToken()

      // url取得(なぜかsetStateで管理できない)
      const currentTab = await getCurrentTab()
      console.log("currentTab.url:" + currentTab.url)
      siteUrl = currentTab.url

      // テキスト取得
      const storageText = await getStrageText()
      console.log("storageText:" + storageText)

      // テキストセット
      setAbstractText(storageText)
    }
    // useEffect内で同期関数を実行する
    setTextAndToken()
  }, [])

  const getAccessToken = async () => {
    try {
      const token = await getAccessTokenSilently()
      setAccessToken(token)
    } catch (e) {
      console.log(e)
    }
  }

  const getCurrentTab = async () => {
    let currentTab;
    await chrome.tabs.query({active: true, currentWindow: true})
      .then((tabs) => {
        currentTab = tabs[0]
        console.log('tab:' + JSON.stringify(currentTab))
      })
    return currentTab
  }

  const handleChange = async (event) => {
    const text = event.target.value
    chrome.storage.local.set({ [siteUrl]: text })
    setAbstractText(text)
  }

  const getStrageText = async () => {
    console.log("getStrageText")

    const result = await chrome.storage.local.get()
    console.log("result:" + JSON.stringify(result))
    console.log("siteUrl:" + siteUrl)

    const storageText = result[siteUrl]
    console.log("getStrageText chrome strageText:" + storageText)

    return storageText
  }



  // csrfトークンをBEから取得してヘッダーにセット
  const getCsrfToken = async () => {
    const { data } = await axios.get(`${currentUrl}/auth/csrf`)
    const csrfToken = data.csrfToken
    console.log('csrfToken:' + csrfToken)
    return csrfToken
  }

  const showLoginPage = () => {
    chrome.tabs.create({url: localLoginUrl})
  }

  // コピーボタン
  const copy = async () => {
    setOpend(!opened)
    const currentTab = await getCurrentTab()
    const markdownSiteTitle = `[${currentTab.title}](${currentTab.url}) \n`
    console.log("copy title:" + markdownSiteTitle)
    const board = document.getElementById('toranoi-board')
    const copyText = markdownSiteTitle + board.value
  
    navigator.clipboard.writeText(copyText)

    window.setTimeout(() => setOpend(opened), 2000);
  }

  // 保存ボタン
  const manageOnApp = async () => {

    if (!isAuthenticated) {
      showLoginPage()
    }

    // ぐるぐる開始
    setVisible((v) => !v)
    
    // csrfトークンセット
    const csrfToken = await getCsrfToken()
    axios.defaults.headers.common['csrf-token'] = csrfToken
    console.log('header.csrf:' + axios.defaults.headers.common['csrf-token'])

    const board = document.getElementById('toranoi-board')
  
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
    // ぐるぐる終了
    setVisible((v) => !v)
  }


  // Note that position: relative is required
  return (
    <>
      <div style={{width:"600px", height:"500px", position: 'relative'}}>
        <LoadingOverlay visible={visible} overlayBlur={2} />

          <textarea 
            id="toranoi-board"
            value={abstractText}
            onChange={handleChange}
            style={{
              width:"600px", 
              height:"100%",
              resize:"none",
              color:"#333631",
              borderTop:"inherit 0.1 rgba(0, 0, 0, 0.1)",
              // borderBottom:"none",
              borderBottom:"1px solid rgba(0, 0, 0, 0.2)",
              borderRight:"none",
              borderLeft:"none",
              outline:"none",
              padding: "20px",
              lineHeight: 1.7,
              fontFamily: 'Inter',
              letterSpacing: 1.5,
            }}
          >
          </textarea>



        <Group  position={"center"} spacing={100} style={{width:"100%", height:"60px", }}>
          <Tooltip label="コピーしました" opened={opened} transition="fade" withArrow>
            <Button variant="default" onClick={copy} leftIcon={<IconClipboard size={14} />}>コピーする</Button>
          </Tooltip>

          {isAuthenticated ? (
            // ログイン中
            <Button 
              variant="default"  
              onClick={manageOnApp}
              leftIcon={<IconDatabase size={14} />}
            >
              アプリで登録する
            </Button>
          ) 
          :(
            // ログアウト中
            <Tooltip 
              label="ログインすることでアプリに記事を登録することができます"
              withArrow
              transition="fade"
            >
              <Button 
                variant="default"
                onClick={showLoginPage}
                leftIcon={<IconExternalLink size={14} />}
              >
                ログインする
              </Button>
            </Tooltip>
          )}

        </Group>

      </div>
    </>
  );
};
