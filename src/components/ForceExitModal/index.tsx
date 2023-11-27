import React from 'react';
import './style.css';

//          interface: 강제 퇴장 확인 모달 컴포넌트 Props          //
interface ForceExitModalProps {
    onForceExit: () => void;
    onClose: () => void;
    userName: string;
}

//          component: 강제 퇴장 확인 모달 컴포넌트          //
export default function ForceExitModal ({ onForceExit, onClose, userName }: ForceExitModalProps) {

    //          render: 강제 퇴장 확인 모달 컴포넌트 렌더링          //
    return (
        <div className='force-exit-modal-card'>
            <div className='force-exit-modal-box'>
                <div className='force-exit-modal-title'>{`'${userName}' 님을 퇴장시키겠습니까?`}</div>
                <div className='force-exit-modal-description-box'>
                    <div className='force-exit-modal-notify-box'>
                        <div className='warning-icon'></div>
                        <div className='force-exit-modal-notify-text'>{'강제 퇴장 시 다시 돌어올 수 없습니다.'}</div>
                    </div>
                    <div className='force-exit-select'>
                        <div className='force-exit-button' onClick={onForceExit}>{'강제 퇴장 확인'}</div>
                        <div className='force-exit-cancel' onClick={onClose}>{'취소'}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}