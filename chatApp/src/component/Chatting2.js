import "../styles/chat.css";
import { useEffect, useState } from "react";
import Chat from "./tools/Chat";
import Notice from "./tools/Notice";
import io from "socket.io-client";

const socket = io.connect("http://localhost:8000", { autoConnect: false });
export default function Chatting2() {
  const [msgInput, setMsgInput] = useState("");
  const [userIdInput, setUserIdInput] = useState("");
  const [duplicateId, setDuplicateId] = useState(false);
  const [duplicateIdInput, setDuplicateIdInput] = useState("");

  const [chatList, setChatList] = useState([
    {
      type: "my",
      content: "안녕?",
    },
    {
      type: "other",
      content: "응 안녕?",
    },
    {
      type: "notice",
      content: "~~~~~~님이 입장하셨습니다.",
    },
  ]);

  const [userId, setUserId] = useState(null);

  const initSocketConnect = () => {
    console.log("connected", socket.connected);
    if (!socket.connected) socket.connect();
  };

  useEffect(() => {
    // initSocketConnect();
    // [이슈 1] mount 시에만 한 번 읽고 말아요.
    // newChatList를 만들 때, mount 시점에 chatList만 이용하게 된다.
    // socket.on("notice", (res) => {
    //   const newChatList = [...chatList, { type: "notice", content: res.msg }];
    //   setChatList(newChatList);
    // });
    socket.on("entry-failed", (res) => {
      alert(res.msg);
    });
  }, []);

  useEffect(() => {
    // [해결 1] chatList가 변경될 때마다 event를 다시 만들도록 함.

    // [이슈 2] notice이벤트가 chatList가 변경될 때마다 누적됨.
    // socket.on("notice", (res) => {
    //   console.log("notice");
    //   const newChatList = [...chatList, { type: "notice", content: res.msg }];
    //   setChatList(newChatList);
    // });

    // [해결 2] return 이용해 notice 이벤트를 제거 후, 다시 생성할 수 이도록 함.
    const notice = (res) => {
      // console.log("notice");
      const newChatList = [...chatList, { type: "notice", content: res.msg }];

      setChatList(newChatList);
      console.log("connected", socket.connected);
    };

    socket.on("notice", notice);

    return () => socket.off("notice", notice);
    // 커넥션 확인하면 이건 트루로 나온다.
  }, [chatList]);

  const sendMsg = () => {};

  const entryChat = () => {
    initSocketConnect();
    socket.emit("entry", { userId: userIdInput });

    // **실습 [3-2] 바로 userid의 값을 할당하지 않고 (성공실패에 따라 다르게 진행)
    socket.on("entry-success", (data) => {
      console.log(data.msg); // 입장 성공 메시지 출력
      setDuplicateId(false); // 입장 성공에 따른 동작 수행

      setUserId(userIdInput);
    });

    socket.on("entry-failed", (data) => {
      console.log(data.msg); // 입장 실패 메시지 출력
      setDuplicateId(true); // 중복된 아이디가 있다는 상태를 설정
      setDuplicateIdInput(userIdInput);
    });

    socket.on("notice", (data) => {
      console.log(data.msg); // 입장 공지 메시지 출력
    });

    // setUserId(userIdInput);
  };

  return (
    <>
      <h3>실습 3-1, 3-2, 3-3번</h3>
      <ul>
        <li>입력받고 입장 시키기</li>
        <li>닉네임 중복 방지</li>
        <li>퇴장 시키기</li>
        {duplicateId && (
          <li className="entry-test">
            '{duplicateIdInput}'은(는) 중복된 아이디입니다.
          </li>
        )}
      </ul>

      {userId ? (
        <>
          <div>{userId}님 환영합니다</div>
          <div className="chat-container">
            {chatList.map((chat, i) => {
              if (chat.type === "notice") return <Notice key={i} chat={chat} />;
              else return <Chat key={i} chat={chat} />;
            })}
          </div>

          <div className="input-container">
            <input
              type="text"
              value={msgInput}
              onChange={(e) => setMsgInput(e.target.value)}
            />
            <button onClick={sendMsg}>전송</button>
          </div>
        </>
      ) : (
        <>
          <div className="input-container">
            <input
              type="text"
              value={userIdInput}
              onChange={(e) => {
                setUserIdInput(e.target.value);
              }}
            />
            <button onClick={entryChat}>입장</button>
          </div>
        </>
      )}
    </>
  );
}
