import { StudyNoticeMock } from 'mocks';
import './style.css';

import React, { useState, forwardRef, ButtonHTMLAttributes, MouseEvent, ChangeEvent, useRef } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import NoticeItem from 'components/NoticeItem';

//          component: 일반 유저 공지사항 페이지          //
export default function NoticeModal() {

    //          render : 일반 유저 공지사항 페이지 렌더링          //
    return (
        <div id='notice-wrapper'>
            <div className='notice-card'>
                <div className='notice-button-box'>
                <button type='button' className='modal-close-button'>X</button>
                </div>
                <div className='notice-title-box'>
                    <div className='notice-title'>{'공지사항'}</div>
                </div>
                <div className='notice-common-content-box'>
                    <div className='notice-common-contents-left-box'>
                    <Scrollbars
                            renderTrackVertical={(props) => <div {...props} className='notice-track-vertical' />} 
                            renderThumbVertical={(props) => <div {...props} className='notice-thumb-vertical' />}>
                        {StudyNoticeMock.map((noticeItem) => (
                            <NoticeItem key={noticeItem.studyNoticeNumber} noticeItem={noticeItem} />
                        ))}
                    </Scrollbars>
                    </div>
                </div>
            </div>
        </div>
    );
}
