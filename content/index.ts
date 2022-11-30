// @ts-nocheck 
// 上記はのちに消す

// storageを削除する
chrome.storage.local.set({ text: '' }).then(() => {});

// マウスを離した時のイベント
document.addEventListener('mouseup', (e) => {
  // テキストが選択されていればアイコンを表示
  const selectedText = window.getSelection().toString();
  if (!selectedText || selectedText == '' || selectedText.length <= 10) return;
  displayIcon(e.pageX, e.pageY, selectedText);
});

// 選択箇所を変更した時のイベント
document.addEventListener('selectionchange', () => {
  removeIcon()
})

function displayIcon(x, y, text) {
  var image = new Image();
  image = configImage(x, y, text, image)
  document.body.append(image);
}

function configImage(x, y, text, image) {
  image.src = chrome.runtime.getURL('resources/clip.png');
  image.id = "toranoi-icon"
  image.width = 30;
  image.style.position = "absolute";
  image.style.left = x + 3 + "px";
  image.style.top = y + 3 + "px";
  image.style.backgroundColor = "White";
  image.style.border = "1px " + "solid " + "#e0e4e9";
  image.style.borderRadius = "15px";
  image.style.zIndex = "999"; 
  image.style.cursor = "pointer";
  image.addEventListener('mousedown', () => {
    addText(text)
    removeIcon()
  })
  return image
}

function removeIcon() {
  const icon = document.getElementById('toranoi-icon')
  if (icon != null) {
    icon.remove()
  }
}

function addText(text) {
  // テキスト編集
  text.replace(/\r?\n/g, '');
  text = "- " + text + "\n" + "\n";

  // ストレージのテキストを取得
  let storageText = '';
  chrome.storage.local.get(["text"]).then((result) => {
    storageText = result.text
    console.log('取得したテキスト：' + storageText)
  }).then(() => {
    // 取得したテキストを追記して保存
    storageText += text
    chrome.storage.local.set({ text: storageText });
  })
}

function getSelectArea() {
  var rect = { left: 0, top: 0, right: 0, bottom: 0 };
  var selAll = document.getSelection();
  for (var i = 0; i < selAll.rangeCount; ++i) {
    var rect_ = selAll.getRangeAt(i).getBoundingClientRect();
    if (rect_.left  < rect.left)    rect.left   = rect_.left;
    if (rect_.top   < rect.top)     rect.top    = rect_.top;
    if (rect.right  < rect_.right)  rect.right  = rect_.right;
    if (rect.bottom < rect_.bottom) rect.bottom = rect_.bottom;
  }
  rect.width  = rect.right - rect.left;
  rect.height = rect.bottom - rect.top;
  rect.left  += window.pageXOffset;
  rect.top   += window.pageYOffset;
  rect.right += window.pageXOffset;
  rect.bottom+= window.pageYOffset;
  return selAll.rangeCount ? rect : null;
}