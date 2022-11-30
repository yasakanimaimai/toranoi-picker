// @ts-nocheck 
import React from 'react';

// backgroundで受け取った値をコンソールに表示
function logBackgroundValue () {
  var test = chrome.extension.getBackgroundPage().test_value;
  console.log(test);
  return test;
}

export const Clipboard: React.FC = () => {

  return (
    <div>
      <textarea 
        style={{ width: "600px", height: "400px", resize: "none" }}
      >
      </textarea>
    </div>
  )
};
