// @ts-nocheck 
console.log('popupjs読み込み')

let storageText = ''
chrome.storage.local.get(["text"]).then((result) => {
  storageText = result.text
  document.getElementById('toranoi-board').value = storageText
});

const copyBtn = document.getElementById('copy-button')
copyBtn.addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    const board = document.getElementById('toranoi-board')
    const url = tabs[0].url;
    const siteTitle = tabs[0].title
    const siteTitleMD = `[${siteTitle}](${url}) \n`
    const copyText = siteTitleMD + board.value
    navigator.clipboard.writeText(copyText)
  })
})