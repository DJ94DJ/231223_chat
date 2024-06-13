import React, { useEffect, useRef } from 'react';

const CustomScrollDivComponent = () => {
  // div를 참조하기 위한 ref 생성
  const scrollDivRef = useRef(null);

  useEffect(() => {
    // ref를 통해 실제 DOM 요소에 접근
    const scrollDiv = scrollDivRef.current;

    const handleScroll = (event) => {
      event.preventDefault();
      const scrollDirection = event.deltaY > 0 ? 1 : -1;
      const scrollStep = 50; // 스크롤 이동 거리
      // div 내에서 스크롤 이동
      scrollDiv.scrollBy(0, scrollStep * scrollDirection);
    };

    // 특정 div에 스크롤 이벤트 리스너 추가
    scrollDiv.addEventListener('wheel', handleScroll, { passive: false });

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      scrollDiv.removeEventListener('wheel', handleScroll);
    };
  }, []);

  return (
    <div ref={scrollDivRef} style={{ height: '500px', overflowY: 'scroll' }}>
      <div style={{ height: '1500px' }}>
        <h1>Custom Scroll Div Example</h1>
        {/* 여기에 내용 추가 */}
      </div>
    </div>
  );
};

export default CustomScrollDivComponent;
