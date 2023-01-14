// @ts-nocheck 
// 上記はのちに消す

const minimumTextLengh = 10
const iconResourcePath = 'resources/clip.png'
// const currentSiteUrl = location.href
// const tostring = location.tostring
// const pathname = location.pathname
// console.log("currentSiteUrl:" + currentSiteUrl)
// console.log("tostring:" + tostring)
// console.log("pathname:" + pathname)

// テキスト選択時にアイコンを表示する
document.addEventListener('mouseup', (e) => {
  const selectText = window.getSelection().toString();
  if (!selectText || selectText == '' || selectText.length <= minimumTextLengh) return;
  addIcon(e.pageX, e.pageY, selectText);
});

// 選択箇所を変更したらアイコンを削除する
document.addEventListener('selectionchange', () => {
  removeIcon()
})

const addIcon = (x, y, text) => {
  var icon = new Image();
  icon = configIcon(icon, x, y, text)
  document.body.append(icon);
}

const configIcon = (icon, x, y, text) => {
  icon.src = chrome.runtime.getURL(iconResourcePath);
  icon.id = "toranoi-icon"
  icon.width = 30;
  icon.style.position = "absolute";
  icon.style.left = x + 3 + "px";
  icon.style.top = y + 3 + "px";
  icon.style.backgroundColor = "White";
  icon.style.border = "1px " + "solid " + "#e0e4e9";
  icon.style.borderRadius = "15px";
  icon.style.zIndex = "999"; 
  icon.style.cursor = "pointer";
  icon.addEventListener('mousedown', () => {
    addText(text)
    removeIcon()
  })
  return icon
}

const removeIcon = () => {
  const icon = document.getElementById('toranoi-icon')
  if (icon != null) {
    icon.remove()
  }
}

const addText = async (addText) => {
  addText = addText.replace(/(^\r\n|^\n|^\r)/gm, '')
  addText = "- " + addText + "\n" + "\n";

  const storage = await chrome.storage.local.get()
  console.log("storage:" + JSON.stringify(storage))

  const currentSiteUrl = location.href
  const storageText = storage[currentSiteUrl] || ''
  console.log('取得したテキスト：' + storageText)

  chrome.storage.local.set({ [currentSiteUrl]: storageText + addText });
}

