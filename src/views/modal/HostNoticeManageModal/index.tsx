import { StudyNoticeMock } from 'mocks';
import './style.css';

import React, { useState, forwardRef, MouseEvent, ChangeEvent, useRef } from 'react';
import HostNoticeItem from 'components/HostNoticeItem';
import Scrollbars from 'react-custom-scrollbars-2';

//          component: 방장 공지사항 관리 페이지          //
export default function HostNoticeManageModal() {
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
        const container = document.querySelector('.list');
        if (container === null) return;
        container.innerHTML += newContent;

        // 상태를 업데이트합니다.
        setContents('');
    };

    //          render : 공지사항 페이지 렌더링          //
    return (
        <div id='notice-wrapper'>
            <div className='notice-card'>
                <div className='notice-button-box'>
                    <button type='button' className='modal-close-button'>X</button>
                </div>
                <div className='notice-title-box'>
                    <div className='notice-title'>{'공지사항'}</div>
                </div>
                <div className='notice-write-box'>
                    <div className='notice-write-name'>{'공지사항'}</div>
                    <div className='notice-write-input-box'>
                        <textarea className='notice-write-input' placeholder='공지사항을 입력해주세요.' />
                    </div>
                    <button className='notice-write-plus-box' onClick={handleAddButtonClick}>{'추가'}</button>
                </div>
                <div className='notice-content-box'>
                    <div className='notice-contents-left-box'>
                    <Scrollbars
                            renderTrackVertical={(props) => <div {...props} className='notice-track-vertical' />} 
                            renderThumbVertical={(props) => <div {...props} className='notice-thumb-vertical' />}>
                        {StudyNoticeMock.map((noticeItem) => (
                            <HostNoticeItem key={noticeItem.studyNoticeNumber} noticeItem={noticeItem} />
                        ))}
                    </Scrollbars>
                    </div>
                </div>
            </div>
        </div>
    );
}
