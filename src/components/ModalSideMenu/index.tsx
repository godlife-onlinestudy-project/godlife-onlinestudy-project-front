import React, { useState, useEffect } from 'react';
import './style.css';
import StudyModifyModal from 'views/modal/StudyModifyModal';
import MemberManageModal from 'views/modal/MemberManageModal';
import StudyDate from 'views/modal/StudyDateModal';
import MaterialManageModal from 'views/modal/MaterialManageModal';
import { StudyListItem, StudyModify } from 'types';
import { useModalSideManageStore } from 'stores';
import { GetModifyStudyResponseDto } from 'apis/dto/response/study';
import ResponseDto from 'apis/dto/response';
import StudyServiceMaterialManageModal from 'views/StudyServiceMaterialManageModal';
import { getModifyStudyRequest } from 'apis';
import { accessTokenMock } from 'mocks';
import { useCookies } from 'react-cookie';

interface Props {
    studyItem: StudyModify;
}

//           component: 사이드 모달 메뉴 컴포넌트           //
function ModalSideMenu({modalCloseHandler}: {modalCloseHandler: () => void}) {
    //           state: SideMenu 방 선택 상태           //
    const { selectedOption, setSelectedOption } = useModalSideManageStore();
    //           state: StudyModify 방 상태           //
    const [studyListItem, setStudyListItem] = useState<StudyModify | null>(null
        // studyNumber: 4,
        // studyName: 'sadads',
        // studyEndDate: '',
        // studyPersonal: 0,
        // studyCategory1: '',
        // studyPublicCheck: false,
        // studyPrivatePassword: null,
        // studyCoverImageUrl: null,
        // createStudyUserEmail: '',
    );
    //           state: 방 번호 상태           //
    const [studyNumber, setStudyNumber] = useState<string>('4');

    const [study, setStudy] = useState<StudyModify | null>(null);

    //          state: cookie 상태          //
    const [cookies, setCookies] = useCookies();

    const getModifyStudyResponse = (responseBody: any) => {

          setStudy({...responseBody})
      
    }
    
    useEffect(() => {
        const accessToken = cookies.accessToken;
        if (!accessToken) return;
        getModifyStudyRequest(4, accessToken).then(getModifyStudyResponse);
      }, []);
      
    //           event handler: 사이드바 menu click 이벤트 처리           //
    const onMenuClickHandler = (event: string) => {
        setSelectedOption(event);
    };

    //           render: 사이드 모달 메뉴 컴포넌트 렌더링           //
    return (
        <div id='menu-sidebar-container'>

            <div className='menu-sidebar'>
                <div className={`menu-room ${selectedOption === 'study' ? 'selected-menu-room' : ''}`} onClick={() => onMenuClickHandler('study')}>{'방 설정'}</div>
                <div className={`menu-member ${selectedOption === 'member' ? 'selected-menu-member' : ''}`} onClick={() => onMenuClickHandler('member')}>{'멤버 관리'}</div>
                <div className={`menu-study ${selectedOption === 'studyDate' ? 'selected-menu-study' : ''}`} onClick={() => onMenuClickHandler('studyDate')}>{'다음 스터디 설정'}</div>
                <div className={`menu-material ${selectedOption === 'material' ? 'selected-menu-material' : ''}`} onClick={() => onMenuClickHandler('material')}>{'자료관리'}</div>
            </div>

            <div className='menu-bar'>
                {selectedOption === 'study' && <StudyModifyModal studyItem={study} setStudyItem={setStudyListItem} modalCloseHandler={modalCloseHandler} studyNumber={studyNumber} />}
                {selectedOption === 'member' && <MemberManageModal modalCloseHandler={modalCloseHandler} studyNumber={studyNumber} />}
                {selectedOption === 'studyDate' && <StudyDate />}
                {selectedOption === 'material' && <StudyServiceMaterialManageModal modalCloseHandler={modalCloseHandler} />}
            </div>

        </div>
    );
}

export default ModalSideMenu;
