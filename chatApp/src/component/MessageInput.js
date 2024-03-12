// MessageInput.js
import React from 'react';

function MessageInput({ msgInput, setMsgInput, sendMsg }) {
  return (
    <input
      className="input-chatbar"
      type="text"
      placeholder="전하고 싶은 메시지를 입력해주세요."
      value={msgInput}
      onKeyUp={sendMsg}
      onChange={(e) => setMsgInput(e.target.value)}
    />
  );
}

export default MessageInput;