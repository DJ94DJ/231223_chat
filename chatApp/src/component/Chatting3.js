//기존 코드
import "../styles/chat.css";
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import io from "socket.io-client";
import useScrollStyle from "./tools/useScrollStyle";
import { getSvgPath } from "figma-squircle";
import Backdrop from './Backdrop';
import ChatContainer from "./ChatContainer"; 
import MessageInput from './MessageInput';
import UserList from './UserList'; 
import { useSocket } from "./hooks/useSocket";


const svgPath = getSvgPath({
  width: 700,
  height: 700,
  cornerRadius: 80,
  cornerSmoothing: 0.85,
  preserveSmoothing: true,
});

export default function Chatting3() {
  const [msgInput, setMsgInput] = useState('');
  const [userIdInput, setUserIdInput] = useState('');
  const [userId, setUserId] = useState(null);
  const [userList, setUserList] = useState({});
  const [chatList, setChatList] = useState([
    { type: 'my', content: '안녕?' },
    { type: 'my', content: '안녕 반가워! 채팅앱이 예쁜걸?' },
    { type: 'other', content: '응 안녕!' },
  ]);
  const [dmTo, setDmTo] = useState("all");
  const scrollRef = useRef(null);

 // 스크롤 스타일링 및 위치 조정을 위한 사용자 정의 훅 (가정)
 const handleScroll = useScrollStyle(scrollRef);
 const socket = useSocket()



 useEffect(() => {

   const eventListeners = {
     error: (res) => alert(res.msg),
     entrySuccess: (res) => setUserId(res.userId),
     userList: (res) => setUserList(res),
     chat: (res) => {
       const type = res.userId === userId ? 'my' : 'other';
       const content = `${res.dm ? '(속닥속닥)' : ''} ${res.userId}: ${res.msg}`;
       setChatList((prevList) => [...prevList, { type, content }]);
     },
     notice: (res) => {
       setChatList((prevList) => [...prevList, { type: 'notice', content: res.msg }]);
     },
   };

   Object.entries(eventListeners).forEach(([event, handler]) => {
     socket.on(event, handler);
   });

   return () => {
     Object.keys(eventListeners).forEach((event) => {
       socket.off(event, eventListeners[event]);
     });
   };
 }, [userId, socket]); // socket은 상위 컴포넌트나 Context API 등을 통해 제공되어야 합니다.

 useEffect(() => {
   if (scrollRef.current) {
     scrollRef.current.scrollIntoView({ behavior: 'smooth' });
   }
 }, [chatList]);

 const userListOption = useMemo(
   () => Object.keys(userList).filter((key) => key !== userId).map((key) => <option key={key} value={key}>{userList[key]}</option>),
   [userList, userId]
 );

 // 뺼수 없다.
 const sendMsg = useCallback((event) => {
  // Enter 키를 눌렀을 때 또는 버튼 클릭 이벤트가 발생했을 때 메시지 전송
  if ((event.key === 'Enter' || event.type === 'click') && msgInput) {
    socket.emit('sendMsg', { userId, msg: msgInput, dm: dmTo });
    setMsgInput('');
  }
}, [msgInput, dmTo, userId]);

 const entryChat = useCallback(() => {
   socket.emit('entry', { userId: userIdInput });
 }, [userIdInput]);
 //

  return (
    <>
      <div className="page">
        <div
          className="center"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            className="backdrop-container"
            style={{
              width: 700,
              height: 700,
            }}
          >
            <div className="app-container">
              {userId ? (
                <>
                  <div>{userId}님 환영합니다.</div>
                  <ChatContainer chatList={chatList} scrollRef={scrollRef} />
                  <div className="input-container">
                  <UserList userList={userList} userId={userId} dmTo={dmTo} setDmTo={setDmTo} />
                    <MessageInput msgInput={msgInput} setMsgInput={setMsgInput} sendMsg={sendMsg} />
                    <button className="input-txt-send-button" onClick={sendMsg}>전송</button>
                  </div>
                </>
              ) : (
                <>
                  <div className="id-input-container">
                    <input
                      className="input-id"
                      type="text"
                      value={userIdInput}
                      placeholder="사용할 대화명를 입력해 주세요."
                      onChange={(e) => setUserIdInput(e.target.value)}
                    />
                    <button className="input-id-button" onClick={entryChat}>
                      입장
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <Backdrop svgPath={svgPath} />
      </div>
    </>
  );
}
