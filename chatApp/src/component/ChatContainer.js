// ChatContainer.js
import React from 'react';
import Chat from "./tools/Chat";
import Notice from "./tools/Notice";

const ChatContainer = ({ chatList, scrollRef }) => {
  return (
    <>
    <div ref={scrollRef} className="chat-container">
      {chatList.map((chat, i) => {
        if (chat.type === "notice")
          return <Notice key={i} chat={chat} />;
        else return <Chat key={i} chat={chat} />;
      })}
      <div ref={scrollRef} /> {/* 추가된 부분 */}
    </div>
    <br/>
    </>
  );
};

export default ChatContainer;