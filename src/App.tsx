import React, { useEffect, useRef, useState }  from 'react';
import { Outlet, Route, Router, Routes, useLocation, useParams } from 'react-router-dom';
import './App.css';
import Header from './layouts/Header';
import Main from './views/Main';
import Footer from './layouts/Footer';
import StudyListItem from 'types/study-list';
import HostToDoListManageModal from 'views/HostToDoListManageModal';
import ToDoListModal from 'views/ToDoListModal';
import NoticeModal from 'views/NoticeModal';
import HostNoticeManageModal from 'views/HostNoticeManageModal';
import StudyCreate from 'views/StudyCreate';
import StudyDateModal from 'views/StudyDateModal';
import StudyModifyModal from 'views/StudyModifyModal';
import { studyListMock } from 'mocks';
import MemberManageModal from 'views/MemberManageModal';
import MyPage from 'views/MyPage';
import { StudyModify, StudyUserListItem } from 'types';
import { getModifyStudyRequest, getStudyUserListRequest } from 'apis';
import ModalSideMenu from 'components/ModalSideMenu';
import Service from 'views/Service';
import PeerJsComponent from 'components/PeerJs';

interface Props {
  studyItem: StudyModify;
}


function App() {
  
  // //        state: 현재 페이지 url 상태       //
  // const { pathname } = useLocation();

  //        description: 검색 버튼 Ref        //
  const searchDivRef = useRef<HTMLDivElement | null>(null);

  const onSearchMoveClickHandler = () => {
    if (!searchDivRef.current) return;
    searchDivRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  // const [study, setStudy] = useState<StudyModify | null>(null);

  // const getModifyStudyResponse = (responseBody: any) => {

  //   setStudy({...responseBody})

  // }

  // useEffect(() => {
  //   getModifyStudyRequest(4).then(getModifyStudyResponse);
  // });
  const [show, setShow] = useState<boolean>(false);
  const modalCloseHandler = () => setShow(false);
  const [studyNumber, setStudyNumber] = useState<string>('4');
  
  return (
    <div>
      {/* <MyPage /> */}
      {/* <MemberManageModal modalCloseHandler={modalCloseHandler}/> */}

      {/* <MemberManageModal modalCloseHandler={modalCloseHandler} studyNumber={studyNumber} /> */}
      {/* <Routes>
        <Route path='/:studyNumber/study-user-list' element={<MemberManageModal modalCloseHandler={modalCloseHandler} studyNumber={studyNumber}/>} />
      </Routes> */}
      {/* <StudyCreate /> */}
      {/* <HostNoticeManageModal /> */}
      {/* <NoticeModal /> */}
      {/* <HostToDoListManageModal /> */}
      {/* <ToDoListModal /> */}
      {/* <ModalSideMenu /> */}
      {/* <Routes>
        <Route path='/:studyNumber' element={<StudyModifyModal studyItem={study}/>}/>
      </Routes> */}
      {/* <ManinpagePriavateStudyRoomJoinModal/> */}
      {/* <Header onSearchMoveClickHandler={onSearchMoveClickHandler} />
      <Main ref={searchDivRef} />
      <Footer /> */}
      {/* <Service /> */}
      <PeerJsComponent />
    </div>
  );
}

export default App;
