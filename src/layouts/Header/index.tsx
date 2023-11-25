import React, { useRef, useState } from 'react'
import './style.css';
import { useLocation, useNavigate } from 'react-router-dom';

interface HeaderProps {
  onSearchMoveClickHandler: () => void
}

export default function Header({ onSearchMoveClickHandler }: HeaderProps) {

  //        state: path name 상태       //
  const { pathname } = useLocation();

  //        function: 네비게이트 함수       //
  const navigator = useNavigate();

  //        event handler: 로고 클릭 이벤트 처리        //
  const onLogoClickHandler = () => {
    navigator('/');
  }
  
  //        event handler: 로고 클릭 이벤트 처리        //
  const onStudyCreateNavigatorHandler = () => {
    navigator('/studtcreate');
  }
  //        event handler: 로고 클릭 이벤트 처리        //
  const onMypageNavigatorHandler = () => {
    navigator('/mypage/:email');
  }
    
  //        render: 헤더 컴포넌트 렌더링        //
  return (
    <div id='header'>
      <div className='header-container' >
        <div className='header-left-box'>
          <div className='header-logo-icon-box'>
            <div className='logo-icon'></div>
          </div>
          <div className='header-logo-text' onClick={onLogoClickHandler}>{'갓생살기'}</div>
        </div>

        <div className='header-right-box'>
          <div className='header-study-search-button' onClick={onSearchMoveClickHandler}>{'스터디 검색'}</div>
          <div className='header-study-create-button' onClick={onStudyCreateNavigatorHandler}>{'스터디 생성'}</div>
          <div className='header-study-mypage-button' onClick={onMypageNavigatorHandler}>{'내 정보 관리'}</div>
        </div>
      </div>
    </div>
  )
}
