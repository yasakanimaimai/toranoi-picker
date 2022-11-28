// @ts-nocheck 
// 上記はのちに消す

// contentが動いていることを確認
console.log('aaaaaaaaaaaaaaaaaaaaaaaaa')
document.body.style.backgroundColor = 'orange'
displayTextField()

document.addEventListener('mouseup', (e) => {

  console.log('target:' + e.target.id);
  if (e.target.id == 'toranoi-text-field') {
    return
  }

  let select_text = window.getSelection().toString();
  if (!select_text || select_text == '') {
    return;
  }

  displayIcon(e.pageX, e.pageY, select_text);
});

document.addEventListener('selectionchange', () => {
  removeIcon()
})

function displayIcon(x, y, text) {
  console.log('dispIcon起動')
  var image = new Image();
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
    displayTextField()
    addText(text)
    removeIcon()
  })
  document.body.append(image);
}

function removeIcon() {
  const icon = document.getElementById('toranoi-icon')
  if (icon != null) {
    icon.remove()
  }
}

function displayTextField() {
  if (document.getElementById('toranoi-text-field') != null) {
    return
  }

  const textField = document.createElement("textarea");
  textField.setAttribute("id", "toranoi-text-field");
  textField.setAttribute("rows", "5");
  textField.setAttribute("cols", "33");
  textField.style.width = "80%";
  textField.style.height = "80%";
  textField.style.fontSize = "13px";
  textField.style.letterSpacing = "1px";
  textField.style.margin = "auto";
  textField.style.padding = "10px";
  textField.style.maxWidth = "100%";
  textField.style.lineHeight = "1.5";
  textField.style.borderRadius = "5px";
  textField.style.border = "1px solid #ccc";
  textField.style.boxShadow = "1px 1px 1px #999";
  textField.style.overflowAnchor = "none";
  textField.onchange = () => {
    console.log('text onchange')
    textField.scrollTop = textField.scrollHeight;
  }
  textField.onclick = () => {
    textField.scrollTop = textField.scrollHeight;
  }
  

  const textFlame = document.createElement("div");
  textFlame.appendChild(textField)
  textFlame.style.display = "flex";
  textFlame.style.justifyContent = "center";
  textFlame.style.zIndex = "999";
  textFlame.style.position = "fixed";
  textFlame.style.top = "30px";
  textFlame.style.left = "1100px";
  textFlame.style.height = "200px";
  textFlame.style.width = "300px";
  textFlame.style.borderRadius = "5px";
  textFlame.style.border = "1px solid #ccc";
  textFlame.style.boxShadow = "1px 1px 1px #999";
  textFlame.style.backgroundColor = "orange";


  // textFlame.onmousedown = (event) => {
  //   console.log('onmousedown')
  //   textFlame.style.position = 'absolute';
  //   document.body.append(textFlame);
    
  //   let shiftX = event.clientX - textFlame.getBoundingClientRect().left;
  //   let shiftY = event.clientY - textFlame.getBoundingClientRect().top;
    
  //   moveAt(event.pageX, event.pageY);

  //   // ボールを（pageX、pageY）座標の中心に置く
  //   function moveAt(pageX, pageY) {
  //     console.log('moveAt')
  //     textFlame.style.left = pageX - shiftX + 'px';
  //     textFlame.style.top = pageY - shiftY + 'px';
  //   }
  
  //   function onMouseMove(event) {
  //     console.log('onMouseMove')
  //     moveAt(event.pageX, event.pageY);
  //   }
  
  //   document.addEventListener('mousemove', onMouseMove);
  
  //   textFlame.onmouseup = function() {
  //     console.log('onmouseup')
  //     document.removeEventListener('mousemove', onMouseMove);
  //     textFlame.onmouseup = null;
  //   };

  //   textFlame.ondragstart = function() {
  //     console.log('ondragstart')
  //     return false;
  //   };

  //   textFlame.style.position = 'fixed';
  // }


  const copyBtn = document.createElement("button");
  copyBtn.id = "copy-btn";
  copyBtn.textContent = "コピー";
  copyBtn.style.color = "white";
  copyBtn.style.backgroundColor = "red";
  copyBtn.style.width = "50%";
  copyBtn.style.height = "30px";

  copyBtn.onclick = (event) => {
    console.log('click')
    const siteTitle = `[${document.title}](${document.URL}) \n`
    const clipboadText = siteTitle + event.target.previousElementSibling.value
    navigator.clipboard.writeText(clipboadText)
  }
  textFlame.appendChild(copyBtn)

  document.body.append(textFlame);  
}

function addText(text) {
  const textField = document.getElementById('toranoi-text-field')
  if (textField == null) {
    return
  }
  text.replace(/\r?\n/g, '');
  textField.value += "- " + text + "\n" + "\n";
  textField.scrollTop = textField.scrollHeight;
}

function getSelectArea() {
  console.log('getSelectArea起動')
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