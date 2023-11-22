import React, { useState } from 'react'
import './style.css';
import StudyModifyModal from 'views/StudyModifyModal';
import MemberManageModal from 'views/MemberManageModal';
import StudyDate from 'views/StudyDateModal';
import MaterialManageModal from 'views/MaterialManageModal';
import { StudyListItem, StudyModify } from 'types';
function ModalSideMenu() {

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [studyListItem, setStudyListItem] = useState<StudyModify | null>(null);
  const [studyNumber, setStudyNumber] = useState<string>('');

  const onMenuClickHandler = (event: string) => {
    setSelectedOption(event);
  };

  //           event handler: modalCloseHandler를 가져와서 이벤트 처리           //
  const modalCloseHandler = () => {
    modalCloseHandler();
}

  return (
    <div className='menu-sidebar'>
    {
        <div className='menu-room' onClick={() => onMenuClickHandler('study')}>{'방 설정'}</div>
    }
    {
        <div className='menu-member-default' onClick={() => onMenuClickHandler('member')}>{'멤버 관리'}</div>   
    }
    {
        <div className='menu-study-default' onClick={() => onMenuClickHandler('studyDate')}>{'다음 스터디 설정'}</div>
    }
    {
        <div className='menu-material-default' onClick={() => onMenuClickHandler('material')}>{'자료관리'}</div>
    }

    {selectedOption === 'study' && studyListItem && <StudyModifyModal studyItem={studyListItem} />}
    {selectedOption === 'member' && <MemberManageModal modalCloseHandler={modalCloseHandler} studyNumber={studyNumber}/>}
    {selectedOption === 'studyDate' && <StudyDate />}
    {selectedOption === 'material' && <MaterialManageModal modalCloseHandler={modalCloseHandler}/>}
    </div>
  )
}

export default ModalSideMenu;