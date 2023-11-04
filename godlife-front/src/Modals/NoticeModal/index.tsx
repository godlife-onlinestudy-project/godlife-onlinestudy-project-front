import './style.css';

import React,  { useState, forwardRef, ButtonHTMLAttributes,MouseEvent, ChangeEvent, useRef } from 'react'

// 공지사항 페이지
export default function Main() {

  const [contents, setContents] = useState('');
  const [showButton, setShowButton] = useState(false);

  //          state: 본문 텍스트 영역 ref 상태          //
  const contentsTextAreaRef = useRef<HTMLTextAreaElement | null>(null);
  
  let newContent = '';

  //          event handler: 공지사항 업로드 이벤트 처리          //
  const handleAddButtonClick = () => {
    // 글을 추가합니다.

    const newContent = `
      <li>
        ${contents}
      </li>
    `;

    // DOM에 추가합니다.
    const container = document.querySelector(".list");
    if(container === null) return;
    container.innerHTML += newContent;

    // 상태를 업데이트합니다.
    setContents("");
  };


  
  //          event handler: 공지사항 수정 이벤트 처리          //
  const onContentsChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const contents = event.target.value;
    setContents(contents);
    if (!contentsTextAreaRef.current) return;
    contentsTextAreaRef.current.focus();
    contentsTextAreaRef.current.style.height = 'auto';    
    contentsTextAreaRef.current.style.height = `${contentsTextAreaRef.current.scrollHeight}px`;
  }


  // render : 공지사항 페이지 렌더링 //
  return (
    <div id='notice-wrapper'>
      <div className="notice-card">
        <div className="notice-button-box">
          <button type="button" className="btn btn-primary" disabled data-bs-toggle="button">X</button>        
        </div>
        <div className="notice-title-box"> 
          <div className="notice-title">{'공지사항'}</div>
        </div>
        <div className="notice-write-box">
          <div className="notice-write-name">{'공지사항'}</div>
          <div className="notice-write-input-box">
            <textarea  className = 'notice-write-input'  placeholder='공지사항을 입력해주세요.'  />
          </div>
          <button className="notice-write-plus-box"  onClick={handleAddButtonClick}>추가</button>
        </div>                
        <div className='notice-content-box'>
          <div className="notice-contents-left-box">
          </div>
          <div className='notice-scrollbar-box'>
            <div className="notice-scrollbar"></div>
          </div>
        </div>
      </div>
    </div>
  )
} 
