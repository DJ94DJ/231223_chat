// UserList.js
import React, { useState } from 'react';
import "../styles/chat.css";

function UserList({ userList, userId, dmTo, setDmTo }) {
  // 드롭다운이 열렸는지 상태 관리
  const [isOpen, setIsOpen] = useState(false);

  // 사용자 목록을 필터링하고 매핑
  const userListOptions = Object.keys(userList)
    .filter(key => key !== userId)
    .map(key => (
      <li key={key} className="optionItem" onClick={() => handleSelect(key)}>
        {userList[key]}
      </li>
    ));

  // 선택 항목 처리
  const handleSelect = (key) => {
    setDmTo(key); // 선택된 사용자 ID를 상태로 설정
    setIsOpen(false); // 드롭다운 닫기
  };

  // 선택된 사용자의 이름 표시 (기본값: '전체')
  const selectedUserName = dmTo === "all" ? "전체" : userList[dmTo] || "전체";

  return (
    <div className="selectBox">
      <button className="label" onClick={() => setIsOpen(!isOpen)}>
        {selectedUserName}
      </button>
      {isOpen && (
        <ul className="optionList">
          <li className="optionItem" onClick={() => handleSelect('all')}>전체</li>
          {userListOptions}
        </ul>
      )}
    </div>
  );
}

export default UserList;