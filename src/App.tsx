import React, { useRef, useState, useEffect }  from 'react';
import { Outlet, Route, Router, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import StudyListItem from 'types/study.inteface';
import StudyCreate from 'views/StudyCreate';
import { useUserStore } from 'stores';
import { useCookies } from 'react-cookie';
import GetSignInUserResponseDto from 'apis/dto/response/user/get-sign-in-user.response.dto';
import ResponseDto from 'apis/dto/response';
import { AUTH_PATH, MAIN_PATH, MY_PAGE_PATH, SERVICE_PATH, STUDYROOM_DETAIL_PATH, STUDY_CREATE_PATH } from 'constant';
import { getSignInUserRequest } from 'apis';
import Container from 'layouts/Container';
import Authentication from 'views/Authentication';
import Main from 'views/Main';
import Service from 'views/Service';
import MyPage from 'views/MyPage';
import OAuth from 'views/OAuth';

function App() {
  
  //          state: 현재 페이지 url 상태          //
  const { pathname } = useLocation();
  //          state: 로그인 유저 상태          //
  const { user, setUser } = useUserStore();
  //          state: cookie 상태          //
  const [cookies, setCookie] = useCookies();

  const navigator = useNavigate();

  //        description: 검색 버튼 Ref        //
  const searchDivRef = useRef<HTMLDivElement | null>(null);

  const onSearchMoveClickHandler = () => {
    if (!searchDivRef.current) return;
    searchDivRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  //          function: get sign in user response 처리 함수          //
  const getSignInUserResponse = (responseBody: GetSignInUserResponseDto | ResponseDto) => {
    const { code } = responseBody;
    if (code !== 'SU') {
      setCookie('accessToken', '', { expires: new Date(), path: MAIN_PATH });
      setUser(null);
      return;
    }

    setUser({ ...responseBody as GetSignInUserResponseDto });
  }

  //          effect: 현재 path가 변경될 때마다 실행될 함수          //
  useEffect(() => {

    const accessToken = cookies.accessToken;
    if (!accessToken) setUser(null);
    else getSignInUserRequest(accessToken).then(getSignInUserResponse);

    if (pathname === "/") navigator(AUTH_PATH);
  }, [pathname]);
  
  return (
    <Routes>
      <Route element={<Container />}>
        <Route path={AUTH_PATH} element={<Authentication />} /> 
        <Route path={MAIN_PATH} element={<Main />} />  
        
        <Route path={STUDY_CREATE_PATH} element ={<StudyCreate />} />
        <Route path={MY_PAGE_PATH} element={<MyPage />} />
      </Route>
      <Route path={SERVICE_PATH(':studyNumber')} element={<Service />} /> 
      <Route path='/oauth/:token/:expirationTime' element={<OAuth />} />
      <Route path='*' element={<h1>404 Not Found</h1>} />  
    </Routes>

    // <div>
    //   {/* // <HostNoticeManageModal/>
    // // <StudyCreate />
    // //   <HostNoticeManageModal /> */}
    //       {/* <Service/> */}
    // {/* //   <NoticeModal />
    // //   <HostToDoListManageModal />
    // //   <ToDoListModal />
    // //   <StudyDateModal />
    // //   <StudyModifyModal studyListItem={studyItem} /> */}
    //  {/* <ManinpagePriavateStudyRoomJoinModal/>
    //  <Main ref={searchDivRef} /> */}
    
    // <Header onSearchMoveClickHandler={onSearchMoveClickHandler} />
    //   <Main ref={searchDivRef} />
    //   <Footer />
    // // </div>
  );
}

export default App;

// ! 네비게이션 설계
// ! 메인 화면 : '/' - Main
// ! 로그인 화면 + 회원가입 화면 : /auth - Authentication
// ! 스터디 서비스페이지 : <Service/>
// ! 스터디 생성 페이지 : '/board/write' - BoardWrite
// ! 마이페이지 : '/user/:email' - User