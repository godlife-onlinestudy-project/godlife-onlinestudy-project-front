import { StudyToDoListMock } from 'mocks';
import './style.css';

import React, { useState, forwardRef, ButtonHTMLAttributes, MouseEvent, ChangeEvent, useRef } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import HostToDoItem from 'components/HostToDoListItem';

//          component: 방장 투두 리스트 관리 페이지          //
export default function HostToDoListManageModal() {
    const [contents, setContents] = useState('');
    const [showButton, setShowButton] = useState(false);

    //          state: 본문 텍스트 영역 ref 상태          //
    const contentsTextAreaRef = useRef<HTMLTextAreaElement | null>(null);

    let newContent = '';

    //          event handler: 투두 리스트 업로드 이벤트 처리          //
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

    //          render : 방장 투두 리스트 관리 페이지 페이지 렌더링          //
    return (
        <div id='todo-wrapper'>
            <div className='todo-card'>
                <div className='todo-button-box'>
                    <button type='button' className='modal-close-button'>X</button>
                </div>
                <div className='todo-title-box'>
                    <div className='todo-title'>{'Study\nTo Do List'}</div>
                </div>
                <div className='todo-write-box'>
                    <div className='todo-write-name'>{'To Do List'}</div>
                    <div className='todo-write-input-box'>
                        <textarea className='todo-write-input' placeholder='To Do List를 입력하세요.' />
                    </div>
                    <button className='todo-write-plus-box' onClick={handleAddButtonClick}>{'추가'}</button>
                </div>
                <div className='todo-content-box'>
                    <div className='todo-contents-left-box'>
                    <Scrollbars
                            renderTrackVertical={(props) => <div {...props} className='track-vertical' />} 
                            renderThumbVertical={(props) => <div {...props} className='thumb-vertical' />}>
                        {StudyToDoListMock.map((todoItem) => (
                            <HostToDoItem key={todoItem.studyListNumber} studyToDoItem={todoItem} />
                        ))}
                    </Scrollbars>
                    </div>
                </div>
            </div>
        </div>
    );
}
