import { StudyToDoListMock } from 'mocks';
import './style.css';
import React, { useState, forwardRef, ButtonHTMLAttributes, MouseEvent, ChangeEvent, useRef } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import ToDoItem from 'components/ToDoListItem';

//          component: 일반 유저 투두 리스트 페이지          //
export default function ToDoListModal() {

    //          render : 일반 유저 투두 리스트 페이지          //
    return (
        <div id='todo-wrapper'>
            <div className='todo-card'>
                <div className='todo-button-box'>
                <button type='button' className='modal-close-button'>X</button>
                </div>
                <div className='todo-title-box'>
                    <div className='todo-title'>{'Study\nTo Do List'}</div>
                </div>
                <div className='todo-common-content-box'>
                    <div className='todo-common-contents-left-box'>
                    <Scrollbars
                            renderTrackVertical={(props) => <div {...props} className='track-vertical' />} 
                            renderThumbVertical={(props) => <div {...props} className='thumb-vertical' />}>
                        {StudyToDoListMock.map((todoItem) => (
                            <ToDoItem key={todoItem.studyListNumber} studyToDoItem={todoItem} />
                        ))}
                    </Scrollbars>
                    </div>
                </div>
            </div>
        </div>
    );
}
