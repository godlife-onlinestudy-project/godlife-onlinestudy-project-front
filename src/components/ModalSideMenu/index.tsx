import React, { useState, useEffect } from 'react';
import './style.css';
import StudyModifyModal from 'views/StudyModifyModal';
import MemberManageModal from 'views/MemberManageModal';
import StudyDate from 'views/StudyDateModal';
import MaterialManageModal from 'views/MaterialManageModal';
import { StudyListItem, StudyModify } from 'types';
import { useModalSideManageStore } from 'stores';
import { GetModifyStudyResponseDto } from 'apis/response/study';
import ResponseDto from 'apis/response';
import StudyServiceMaterialManageModal from 'views/StudyServiceMaterialManageModal';

//           component: 사이드 모달 메뉴 컴포넌트           //
function ModalSideMenu() {
    //           state: SideMenu 방 선택 상태           //
    const { selectedOption, setSelectedOption } = useModalSideManageStore();
    //           state: StudyModify 방 상태           //
    const [studyListItem, setStudyListItem] = useState<StudyModify>({
        studyNumber: 4,
        studyName: 'sadads',
        studyEndDate: '',
        studyPersonal: 0,
        studyCategory1: '',
        studyPublicCheck: false,
        studyPrivatePassword: null,
        studyCoverImageUrl: null,
        createStudyUserEmail: '',
    });
    //           state: 방 번호 상태           //
    const [studyNumber, setStudyNumber] = useState<string>('');

    //           event handler: 사이드바 menu click 이벤트 처리           //
    const onMenuClickHandler = (event: string) => {
        setSelectedOption(event);
    };

    //           event handler: modalCloseHandler를 가져와서 이벤트 처리           //
    const modalCloseHandler = () => {
        modalCloseHandler();
    };

    //           render: 사이드 모달 메뉴 컴포넌트 렌더링           //
    return (
        <div id='menu-sidebar-container'>

            <div className='menu-sidebar'>
                <div className='menu-room' onClick={() => onMenuClickHandler('study')}>{'방 설정'}</div>
                <div className='menu-member' onClick={() => onMenuClickHandler('member')}>{'멤버 관리'}</div>
                <div className='menu-study' onClick={() => onMenuClickHandler('studyDate')}>{'다음 스터디 설정'}</div>
                <div className='menu-material' onClick={() => onMenuClickHandler('material')}>{'자료관리'}</div>
            </div>

            <div className='menu-bar'>
                {selectedOption === 'study' && <StudyModifyModal studyItem={studyListItem} />}
                {selectedOption === 'member' && <MemberManageModal modalCloseHandler={modalCloseHandler} studyNumber={studyNumber} />}
                {selectedOption === 'studyDate' && <StudyDate />}
                {selectedOption === 'material' && <StudyServiceMaterialManageModal modalCloseHandler={modalCloseHandler} />}
            </div>

        </div>
    );
}

export default ModalSideMenu;
