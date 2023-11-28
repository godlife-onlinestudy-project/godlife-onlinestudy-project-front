import React, { ChangeEvent, KeyboardEvent, useState, useEffect, useRef, forwardRef } from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2';
import './style.css';
import { useNavigate, useParams } from 'react-router-dom';
import studyRoomInfoListMock from '../../mocks/my-study-room-info-list.mock';
import { MyStudyRoomInfoItem, MyToDoItem, RecommendationStudyRoomItem, SearchStudyRoomItem } from '../../types';
import { myToDoListMock, recommendationStudyListMock, searchStudyListMock } from '../../mocks';
import RecommendationStudyListItem from '../../components/RecommendationStudyListItem';
import ProgressBar from '../../components/ProgressBar';
import MyToDoListItem from '../../components/MyToDoListItem';
import MyToDoListInputBox from '../../components/MyToDoListInputBox';
import SearchInputBox from '../../components/SearchInputBox';
import SearchStudyListItem from '../../components/SearchStudyListItem';
import { SERVICE_PATH } from 'constant';
import ResponseDto from 'apis/dto/response';
import { GetUserToDoListResponseDto } from 'apis/dto/response/user';
import { deleteUserToDoListRequest, getUserToDoListRequest, postUserToDoListRequest, getTop5StudyListRequest, getSearchStudyListRequest, getSearchWordStudyListRequest } from 'apis';
import { accessTokenMock } from '../../mocks';
import { PostUserToDoListRequestDto } from 'apis/dto/request';
import { GetTop5StudyListResponseDto } from 'apis/dto/response/study';
import GetSearchStudyListResponseDto from 'apis/dto/response/study/get-search-study-list.response.dto';
import GetSearchWordStudyListResponseDto from 'apis/dto/response/study/get-search-word-study-list.response.dto';

//        component: 메인 페이지        //
const Main = forwardRef<HTMLDivElement>((props, ref) => {

  //        state: 조회하는 유저 이메일 path variable 상태        //
  const { searchEmail } = useParams();
  //        state: 네비게이트 함수 상태        //
  const navigator = useNavigate();

  //        component: 메인 상단 컴포넌트       //
  const MainTop = () => {

    //        description: 오늘 날짜 구하기       //
    const today = new Date('2023-11-15');
    const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

    //        description: 해당 날짜의 요일 구하는 함수       //
    const getInputDayLabel = (calendarChoiceDay: string) => {
      const week: string[] = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
      const today: number = new Date(calendarChoiceDay).getDay();
      const todayLabel: string = week[today];
      return todayLabel;
    };

    //        state: 참여한 스터디 개수 상태        //
    const [ count, setCount ] = useState<number>(0);
    //        state: 탭 인덱스 상태       //
    const [ activeTabIndex, setActiveTabIndex ]=useState<number>(0);
    //        state: 참여한 스터디 방 정보        //
    const [ studyRoomInfoList, setStudyRoomInfoList ] = useState<MyStudyRoomInfoItem[]>([]);
    //        state: 나의 투두리스트 상태       //
    const [ myToDoList, setMyToDoList ] = useState<MyToDoItem[]>([]);
    //        state: 투두리스트 삭제 체크여부 인덱스 리스트 상태          //
    const [todoDeleteCheckIndexList, setTodoDeleteCheckIndexList] = useState<number[]>([]);
    //        state: 투두리스트 삭제 리스트 상태          //
    const [todoDeleteCheckList, setTodoDeleteCheckList] = useState<number[]>([]);
    //        state: 입력한 나의 투두리스트 상태        //
    const [ inputMyToDoList, setInputMyToDoList ] = useState<string>('');
    //        state: 유저 투두리스트 삭제 버튼 on/off 상태       //
    const [ userToDoListDeleteCheck, setUserToDoListDeleteCheck ] = useState<string>('off');
    //        state: 캘린더 선택 일자 상태(hide)        //
    const [ calendarChoiceDay, setCalendarChoiceDay ] = useState<string>(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`);
    //        state: 실제로 보이는 일자 상태        //
    const [ calendarDayText, setCalendarDayText ] = useState<string>(formattedDate + ' ' + getInputDayLabel(`${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`));

    //        function: get user to do list response 처리 함수        //
    const getUserToDoListResponse = (responseBody: GetUserToDoListResponseDto | ResponseDto) => {
      const { code } = responseBody;
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      const { userToDoList } = responseBody as GetUserToDoListResponseDto;
      setMyToDoList(userToDoList);
    }

    //        function: post user to do list response 처리 함수        //
    const postUserToDoListResponse = (code: string) => {
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;
    }

    //        function: delete user to do list response 처리 함수       //
    const deleteUserToDoListResponse = (code: string) => {
      if (code === 'VF') alert('잘못된 접근입니다.');
      if (code === 'NU') alert('존재하지 않는 유저 입니다.');
      if (code === 'NUTDL') alert('존재하지 않는 유저 투두리스트입니다.');
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;
    }

    //        effect: 컴포넌트 마운트 시 참여한 스터디 방 정보 리스트 불러오기        //
    useEffect(() => {
      // TODO: API 호출로 변경
      setStudyRoomInfoList(studyRoomInfoListMock);
    }, []);

    //        effect: 조회하는 유저의 이메일이 변경될 때마다 실행할 함수        //
    useEffect(() => {
      setStudyRoomInfoList(studyRoomInfoListMock);
      setCount(studyRoomInfoListMock.length);
    }, [searchEmail]);

    //        effect: 나의 투두 리스트 불러오기       //
    useEffect(() => {
      getUserToDoListRequest(calendarChoiceDay, accessTokenMock).then(getUserToDoListResponse);
    }, [calendarChoiceDay]);

    //        event handler: 탭 버튼 클릭 이벤트 처리       //
    const tabClickHandler=(index: React.SetStateAction<number>)=>{
      setActiveTabIndex(index);
    };
    
    //        event handler: 스터디 To Do List Check 클릭 이벤트 처리(방장권한)       //
    const onStudyToDoListCheckClickHandler = (studyNumber: number, todoId: number) => {
      const updatedStudyRoomInfoList = studyRoomInfoList.map((study) => {
        if (study.studyNumber === studyNumber) {
          const updatedToDoList = study.studyRoomToDoList.map((todo) => {
            if (todo[0] === todoId) {
              return [todo[0], todo[1], !todo[2]];
            }
            return todo;
          });
          return { ...study, studyRoomToDoList: updatedToDoList };
        }
        return study;
      });
      setStudyRoomInfoList(updatedStudyRoomInfoList);
    };

    //        event handler: 방 퇴장하기 버튼 클릭 이벤트 처리        //
    const onStudyRoomLeaveButtonClickHandler = () => {
      alert('방 퇴장하기 처리');
    }

    //        event handler: 다음 스터디 모임 날짜 수정 버튼 클릭 이벤트 처리       //
    const onNextStudyMeetingDayUpdateButtonClickHandler = () => {
      alert('다음 스터디 모임 날짜 수정 처리');
    }

    //        event handler: 스터디 자료 보기 버튼 클릭 이벤트 처리       //
    const onStudyMaterialViewButtonClickHandler = () => {
      alert('스터디 자료 보기 처리');
    }

    //        event handler: 스터디 시작 하기 버튼 클릭 이벤트 처리       //
    const onStudyStartButtonClickHandler = (studyNumber: number) => {
      navigator(SERVICE_PATH(studyNumber));
    }

    //        event handler: 유저 투두리스트 추가 버튼 클릭 이벤트 처리        //
    const onUserToDoListInsertButtonClickHandler = async () => {
      const requestBody: PostUserToDoListRequestDto = {
        userListDatetime: calendarChoiceDay,
        userListContent: inputMyToDoList
      }

      await postUserToDoListRequest(requestBody, accessTokenMock).then(postUserToDoListResponse);
      const userToDoListResponse = await getUserToDoListRequest(calendarChoiceDay, accessTokenMock);
      getUserToDoListResponse(userToDoListResponse);
      setInputMyToDoList('');
    }

    //        event handler: 나의 투두리스트 삭제하기 버튼 클릭 이벤트 처리       //
    const onUserToDoListDeleteButtonClickHandler = async () => {
      if (userToDoListDeleteCheck === 'off') {
        setUserToDoListDeleteCheck('on');
        return;
      }

      if (todoDeleteCheckList.length === 0) {
        setUserToDoListDeleteCheck('off');
        return;
      }

      await deleteUserToDoListRequest(todoDeleteCheckList, accessTokenMock).then(deleteUserToDoListResponse);
      const userToDoListResponse = await getUserToDoListRequest(calendarChoiceDay, accessTokenMock);
      getUserToDoListResponse(userToDoListResponse);

      setTodoDeleteCheckIndexList([]);
      setTodoDeleteCheckList([]);
      
      setUserToDoListDeleteCheck('off');
    }

    //        event handler: 나의 투두리스트 삭제 체크 버튼 클릭 이벤트 처리       //
    const onTodoItemCheckHandler = (index: number, key: number) => {
      const isExisted = todoDeleteCheckIndexList.includes(index);
      if (isExisted) {
        const newTodoCheckIndexList = todoDeleteCheckIndexList.filter(item => item !== index);
        const newTodoCheckList = todoDeleteCheckList.filter(item => item !== key);
        setTodoDeleteCheckIndexList(newTodoCheckIndexList);
        setTodoDeleteCheckList(newTodoCheckList);
      }
      else {
        const newTodoCheckIndexList = todoDeleteCheckIndexList.map(item => item);
        const newTodoCheckList = todoDeleteCheckList.map(item => item);
        newTodoCheckIndexList.push(index);
        newTodoCheckList.push(key);
        setTodoDeleteCheckIndexList(newTodoCheckIndexList);
        setTodoDeleteCheckList(newTodoCheckList);
      }
    }


    //        description: 내가 참여한 스터디방 정보 탭 렌더링        //
    const tabContArr = studyRoomInfoList.map((tab, index) => (
        {
            tabTitle: (
                <div className={activeTabIndex===index ? "tab-selected" : "tab"} onClick={()=>tabClickHandler(index)}>{tab.studyName}</div>
            ),
            tabCont: (
                <div className='tap-panel'>
                    <div className='my-study-room-info-left-box'>
                        <div className='my-study-room-info-box'>
                            <div className='participation-study-name-box'>
                                <div className='participation-study-name'>{'참여 스터디 이름'}</div>
                                <div className='participation-study-name-text'>{tab.studyName}</div>
                            </div>

                            <div className='study-category-box'>
                                <div className='study-category'>{'스터디 카테고리'}</div>
                                <div className='study-category-text'>{tab.studyCategory1}</div>
                            </div>

                            <div className='participation-personnel-box'>
                                <div className='participation-personnel'>{'참여인원'}</div>
                                <div className='participation-personnel-text'>{tab.studyPersonnel}</div>
                            </div>

                            <div className='my-grade-box'>
                                <div className='my-grade'>{'내 등급'}</div>
                                <div className='my-grade-text'>{tab.myGrade}</div>
                            </div>

                            <div className='study-next-start-datetime-box'>
                                <div className='study-next-start-datetime'>{'다음 스터디 모임 날짜'}</div>
                                <div className='study-next-start-datetime-text'>{tab.studyNextStartDatetime}</div>
                                {tab.myGrade === '방장' && (
                                <div className='study-next-start-datetime-update-button' onClick={onNextStudyMeetingDayUpdateButtonClickHandler}>{'수정'}</div>
                                )}
                            </div>

                            {tab.myGrade === '일반' && (
                                <div className='study-leave-button' onClick={onStudyRoomLeaveButtonClickHandler}>{'방 퇴장하기'}</div>
                            )}
                        </div>
                    </div>

                    <div className='my-study-room-info-middle'>
                        <div className='my-study-room-info-middle-up-box'>
                            <div className='study-progress-rate-box'>
                                <div className='study-progress-rate-title'>{'스터디 진행률'}</div>
                                {<ProgressBar percentage={((tab.studyProgressRate / tab.studyPeriod) * 100)}/>}
                                <div className='study-date-box'>
                                    <div className='study-start-date-text'>{`시작일 : ${tab.studyStartDate}`}</div>
                                    <div className='study-end-date-text'>{`종료일 : ${tab.studyEndDate}`}</div>
                                </div>
                            </div>
                        </div>

                        <div className='my-study-room-info-middle-down-box'>
                            <div className='study-attendance-rate-box'>
                                <div className='study-attendance-rate-title'>{'스터디 내 출석률'}</div>
                                <div className='study-attendance-box'>

                                    <div className='total-study-days-box'>
                                        <div className='total-study-days-title'>{'총 스터디 일수'}</div>
                                        <div className='total-study-days-text'>{`${tab.studyTotalDays}회`}</div>
                                    </div>

                                    <div className='attend-study-days-box'>
                                        <div className='attend-study-days-title'>{'참석일수'}</div>
                                        <div className='attend-study-days-text'>{`${tab.studyAttendDays}회`}</div>
                                    </div>
                                        
                                    <div className='late-study-days-box'>
                                        <div className='late-study-days-title'>{'지각일수'}</div>
                                        <div className='late-study-days-text'>{`${tab.studyLateDays}회`}</div>
                                    </div>

                                    <div className='absent-study-days-box'>
                                        <div className='absent-study-days-title'>{'결석일수'}</div>
                                        <div className='absent-study-days-text'>{`${tab.studyAbsentDays}회`}</div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className='my-study-room-right-box'>
                        <div className='study-todolist-box'>
                            <div className='study-todolist-inner-box'>
                                <div className='study-todolist-title'>{'Study To Do'}</div>
                                <div className='study-todolist-detail-box'>
                                    <Scrollbars
                                        renderTrackVertical={props => <div {...props} className="track-vertical"/>}
                                        renderThumbVertical={props => <div {...props} className="thumb-vertical"/>}>
                                            <div className='study-todolist-blank'></div>
                                            {tab.studyRoomToDoList.map((item, todoIndex) => (
                                                <div className={tab.studyRoomToDoList.length - 1 === todoIndex ? 'study-todolist-detail-rast' : 'study-todolist-detail'} key={item[0]}>

                                                    {tab.myGrade === '방장' ? 
                                                        <div className='study-todolist-check-icon-box' onClick={() => onStudyToDoListCheckClickHandler(tab.studyNumber, item[0])}>
                                                            <div className={item[2] ? 'todolist-check-icon' : 'todolist-non-check-icon'}></div>
                                                        </div>
                                                    : 
                                                        <div className='study-todolist-check-icon-non-hover-box'>
                                                            <div className={item[2] ? 'todolist-check-icon' : 'todolist-non-check-icon'}></div>
                                                        </div>
                                                    }

                                                    <div className={item[2] ? 'study-todolist-detail-text-ok' : 'study-todolist-detail-text'}>
                                                        <div className='study-todolist-detail-textvalue'>{item[1]}</div>
                                                    </div>
                                                </div>
                                            ))}
                                            <div className='study-todolist-blank'></div>
                                    </Scrollbars>
                                </div>
                            </div>
                        </div>
                        <div className='my-study-room-right-button-box'>
                            <div className='study-view-data-button' onClick={onStudyMaterialViewButtonClickHandler}>
                                <div className='study-view-data-button-text'>{'스터디 자료 보기'}</div>
                            </div>
                            <div className='study-start-button' onClick={() => onStudyStartButtonClickHandler(tab.studyNumber)}>
                                <div className='study-start-button-text'>{'스터디 시작 하기'}</div>  
                            </div>
                        </div>
                    </div>
                </div>
            ),
        }
    ));

      //        render: 메인 상단 컴포넌트 렌더링       //
      return (
          <div id='main-top-wrapper'>
              <div className='main-top-container'>
                  <div className='main-top-up-box'>
                      <div className='main-top-up-box-studyroom-text'>{'내가 참여한 스터디방 정보'}</div>
                      {count === 0 ? (
                      <div className='main-top-up-box-studyroom-tab'>
                          <div className='tab-list'>
                              <div className='tab-selected'>{'새로운 스터디 참여하기'}</div>
                          </div>
                          <div className='tap-panel-nothing-box'>
                              <div className='my-study-room-nothing-box'>
                                  <div className='my-study-room-nothing-message'>{'참여한 스터디 방이 없습니다!'}</div>
                                  <div className='my-study-room-nothing-button-box'>
                                      <div className='my-study-room-nothing-button-box-text'>{'스터디 검색하기'}</div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      ) : (
                      <div className='main-top-up-box-studyroom-tab'>
                          <div className='tab-list'>
                              {tabContArr.map((section)=>{
                                      return section.tabTitle
                              })}
                          </div>
                          {tabContArr[activeTabIndex].tabCont}
                      </div>
                      )}
                  </div>
                  <div className='main-top-down-box'>
                      <div className='main-top-down-calendar-box'>
                          <div className='main-top-down-calendar-box-text'>{'내 캘린더'}</div>
                          <div className='main-top-down-calendar'></div>
                      </div>
                      <div className='main-top-down-todolist-box'>
                          <div className='main-top-down-todolist-box-text'>{'MY To Do List'}</div>

                          <div className='main-top-down-todolist'>
                              <div className='main-top-down-todolist-bar'>
                                  <div className='main-top-down-todolist-date'>{calendarDayText}</div>
                                  <div className='main-top-down-todolist-add-button' onClick={userToDoListDeleteCheck === 'off' ? onUserToDoListInsertButtonClickHandler : undefined}>
                                      <div className='main-top-down-todolist-icon-box'>
                                          <div className='todolist-add-icon'></div>
                                      </div>
                                      <div className='main-top-down-todolist-add-button-text' >{'To Do 추가하기'}</div>
                                  </div>
                                  
                                  {userToDoListDeleteCheck === 'off' ? 
                                    <div className='main-top-down-todolist-delete-button' onClick={onUserToDoListDeleteButtonClickHandler}>
                                      <div className='main-top-down-todolist-icon-box'>
                                        <div className='todolist-delete-icon'></div>
                                      </div>
                                      <div className='main-top-down-todolist-delete-button-text'>{'To Do 삭제하기'}</div>
                                    </div> : 
                                    <div className='main-top-down-todolist-delete-button-on' onClick={onUserToDoListDeleteButtonClickHandler}>
                                      <div className='main-top-down-todolist-icon-box'>
                                        <div className='todolist-delete-icon'></div>
                                      </div>
                                      <div className='main-top-down-todolist-delete-button-text'>{'To Do 삭제하기'}</div>
                                    </div>
                                  }
                              </div>

                              <MyToDoListInputBox type={'text'} placeholder='TO DO LIST 입력중입니다....' value={inputMyToDoList} setValue={setInputMyToDoList} disabled={userToDoListDeleteCheck === 'on'} />
                            
                              <div className='main-top-down-todolist-detail-box'>
                                      <Scrollbars
                                          renderTrackVertical={props => <div {...props} className="track-vertical"/>}
                                          renderThumbVertical={props => <div {...props} className="thumb-vertical"/>}>
                                          <div className='main-top-down-todolist-blank'></div>
                                              {myToDoList.map((MyToDoItem, index) => <MyToDoListItem myToDoItem={MyToDoItem} index={index} listNumber={myToDoList.length - 1} listDate={calendarChoiceDay} 
                                              onCheck={onTodoItemCheckHandler} deleteIsChecked={todoDeleteCheckIndexList.includes(index)} deleteButtonCheck={userToDoListDeleteCheck} />)}
                                          <div className='main-top-down-todolist-blank'></div>
                                      </Scrollbars>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      );
    }
    
  //        component: 메인 중단 컴포넌트       //
  const MainMiddle = () => {

    //        state: 추천 스터디 top5 리스트 상태       //
    const [recommendationStudyList, setRecommendationStudyList] = useState<RecommendationStudyRoomItem[]>([]);

    //        function: get top 5 study list response 처리 함수        //
    const getTop5StudyListResponse = (responseBody: GetTop5StudyListResponseDto | ResponseDto) => {
      const { code } = responseBody;
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;

      const { top5List } = responseBody as GetTop5StudyListResponseDto;
      setRecommendationStudyList(top5List);
    }

    //        effect: 컴포넌트 마운트 시 추천 스터디 top5 리스트 불러오기       //
    useEffect(() => {
      getTop5StudyListRequest('회화', accessTokenMock).then(getTop5StudyListResponse);
    }, []);

    //        render: 메인 중단 컴포넌트 렌더링       //
    return (
      <div id='main-middle-wrapper'>
        <div className='main-middle-box'>
          <div className='main-middle-box-recommend-studyroom-text'>{'추천 스터디'}</div>
          <div className='main-middle-box-recommend-studyroom'>
            {recommendationStudyList.map(RecommendationStudyRoomItem => <RecommendationStudyListItem recommendationStudyRoomItem={RecommendationStudyRoomItem} />)}
          </div>
        </div>
      </div>
    )
  }

  //        component: 메인 하단 컴포넌트       //
  const MainBottom = () => {

    //        state: 스터디 카테고리 선택 상태        //
    const [selectedStudyCategory, setSelectedStudyCategory] = useState<string>('전체');
    //        state: 스터디 공개여부 선택 상태        //
    const [selectedStudyPublicCheckCategory, setSelectedStudyPublicCheckCategory] = useState<string>('전체');
    //        state: 검색 값 상태       //
    const [searchValue, setSearchValue] = useState<string>('');
    //        state: 스터디 리스트 원본 상태       //
    const [originalSearchStudyList, setOriginalSearchStudyList] = useState<SearchStudyRoomItem[]>([]);
    //        state: 스터디 리스트 상태       //
    const [searchStudyList, setSearchStudyList] = useState<SearchStudyRoomItem[]>([]);
    //        state: 총 스터디 개수 상태        //
    const [totalStudySum, setTotalStudySum] = useState<number>(0);
    //        state: 검색 후 스터디 방 보여지는 개수 상태       //
    const [visibleItems, setVisibleItems] = useState(15);

    //        function: get search study list response 처리 함수        //
    const getSearchStudyListResponse = (responseBody: GetSearchStudyListResponseDto | ResponseDto) => {
      const { code } = responseBody;
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;
      const { searchList } = responseBody as GetSearchStudyListResponseDto;
      setSearchStudyList(searchList);
      setTotalStudySum(searchList.length);
      setOriginalSearchStudyList(searchList);
    }

    //        function: get search word study list response 처리 함수        //
    const getSearchWordStudyListResponse = (responseBody: GetSearchWordStudyListResponseDto | ResponseDto) => {
      const { code } = responseBody;
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code !== 'SU') return;
      const { searchWordList } = responseBody as GetSearchWordStudyListResponseDto;
      setSearchStudyList(searchWordList);
      setTotalStudySum(searchWordList.length);
      setOriginalSearchStudyList(searchWordList);
    }

    //        effect: 컴포넌트 마운트 시 스터디 리스트 불러오기       //
    useEffect(() => {
      getSearchStudyListRequest(accessTokenMock).then(getSearchStudyListResponse);
    }, []);

    //        effect: 스터디 리스트가 변경될 때 방의 갯수 불러오기       //
    useEffect(() => {
      setTotalStudySum(searchStudyList.length);
    }, [searchStudyList]);

    //        effect: 스터디 카테고리, 스터디 공개여부 버튼 클릭 시 리스트 불러오기       //
    useEffect(() => {

      const filterPublicCategory = selectedStudyPublicCheckCategory === '전체' ? [0, 1] : selectedStudyPublicCheckCategory === '공개' ? 1 : 0;
      const filterStudyCategory = selectedStudyCategory === '전체' ? ['자격증', '학교', '취업', '회화', '어학', '기타'] : selectedStudyCategory;
    
      setSearchStudyList(originalSearchStudyList.filter(item => {
        if (Array.isArray(filterStudyCategory)) {
          return filterStudyCategory.includes(item.studyCategory1) && (Array.isArray(filterPublicCategory) ? filterPublicCategory.includes(item.studyPublicCheck) : item.studyPublicCheck === filterPublicCategory);
        } else {
          return item.studyCategory1 === filterStudyCategory && (Array.isArray(filterPublicCategory) ? filterPublicCategory.includes(item.studyPublicCheck) : item.studyPublicCheck === filterPublicCategory);
        }
      }));

    }, [selectedStudyPublicCheckCategory, selectedStudyCategory]);

    //        event handler: 검색 값 변경 이벤트 처리       //
    const onInputValueChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
      const searchValue = event.target.value;
      setSearchValue(searchValue);
    };

    //        event handler: 검색 인풋 Enter key down 이벤트 처리       //
    const onSearchEnterKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key !== 'Enter') return;
      if (!searchValue) {
        getSearchStudyListRequest(accessTokenMock).then(getSearchStudyListResponse);
        return;
      }
      getSearchWordStudyListRequest(searchValue, accessTokenMock).then(getSearchWordStudyListResponse);
    }

    //        event handler: 검색 버튼 클릭 이벤트 처리       //
    const onSearchButtonClickHandler = () => {
      if (!searchValue) {
        getSearchStudyListRequest(accessTokenMock).then(getSearchStudyListResponse);
        return;
      }
      getSearchWordStudyListRequest(searchValue, accessTokenMock).then(getSearchWordStudyListResponse);
    }

    //        event handler: 스터디 카테고리 버튼 클릭 이벤트 처리        //
    const onStudyCategoryButtonClickHandler = (category: string) => {
      setSelectedStudyCategory(category);
    };

    //        event handler: 스터디 공개여부 카테고리 버튼 클릭 이벤트 처리       //
    const onStudyPublicCheckCategoryButtonClickHandler = (category: string) => {
      setSelectedStudyPublicCheckCategory(category);
    }

    //        event handler: 더보기 버튼 클릭 이벤트 처리       //
    const onMoreDetailButtonClickHandler = () => {
      setVisibleItems(visibleItems + 15)
    }

    //        render: 메인 하단 컴포넌트 렌더링       //
    return (
      <div ref={ref} id='main-bottom-wrapper'>
        <div className='main-bottom-box'>
          <div className='main-bottom-box-studyroom-search-text'>{'스터디 검색'}</div>
          <div className='main-bottom-box-studyroom-search'>
            <div className='main-bottom-box-studyroom-search-box'>
              <div className='main-bottom-box-studyroom-total'>{`총 ${totalStudySum}개 스터디`}</div>
              <SearchInputBox type={'text'} placeholder='검색어를 입력해 주세요' value={searchValue} icon={'search-icon'} 
              onChange={onInputValueChangeHandler} onKeyDown={onSearchEnterKeyDownHandler} onButtonClick={onSearchButtonClickHandler}/>
            </div>
            <div className='main-bottom-box-studyroom-category-box'>
              <div className='main-bottom-box-studyroom-category-title'>{'스터디 카테고리'}</div>
              <div className={selectedStudyCategory === '전체' ? 'main-bottom-box-studyroom-category-button-selected' : 'main-bottom-box-studyroom-category-button'} 
                onClick={() => onStudyCategoryButtonClickHandler('전체')}>{'전체'}</div>
              <div className={selectedStudyCategory === '자격증' ? 'main-bottom-box-studyroom-category-button-selected' : 'main-bottom-box-studyroom-category-button'} 
                onClick={() => onStudyCategoryButtonClickHandler('자격증')}>{'자격증'}</div>
              <div className={selectedStudyCategory === '학교' ? 'main-bottom-box-studyroom-category-button-selected' : 'main-bottom-box-studyroom-category-button'} 
                onClick={() => onStudyCategoryButtonClickHandler('학교')}>{'학교'}</div>
              <div className={selectedStudyCategory === '취업' ? 'main-bottom-box-studyroom-category-button-selected' : 'main-bottom-box-studyroom-category-button'} 
                onClick={() => onStudyCategoryButtonClickHandler('취업')}>{'취업'}</div>
              <div className={selectedStudyCategory === '어학' ? 'main-bottom-box-studyroom-category-button-selected' : 'main-bottom-box-studyroom-category-button'} 
                onClick={() => onStudyCategoryButtonClickHandler('어학')}>{'어학'}</div>
              <div className={selectedStudyCategory === '회화' ? 'main-bottom-box-studyroom-category-button-selected' : 'main-bottom-box-studyroom-category-button'} 
                onClick={() => onStudyCategoryButtonClickHandler('회화')}>{'회화'}</div>
              <div className={selectedStudyCategory === '기타' ? 'main-bottom-box-studyroom-category-button-selected' : 'main-bottom-box-studyroom-category-button'} 
                onClick={() => onStudyCategoryButtonClickHandler('기타')}>{'기타'}</div>
            </div>
            <div className='main-bottom-box-studyroom-pubilc-check-category-box'>
              <div className='main-bottom-box-studyroom-public-check-category-title'>{'스터디 공개여부'}</div>
              <div className={selectedStudyPublicCheckCategory === '전체' ? 'main-bottom-box-studyroom-public-check-category-button-selected' : 'main-bottom-box-studyroom-public-check-category-button'}
                onClick={() => onStudyPublicCheckCategoryButtonClickHandler('전체')}>{'전체'}</div>
              <div className={selectedStudyPublicCheckCategory === '공개' ? 'main-bottom-box-studyroom-public-check-category-button-selected' : 'main-bottom-box-studyroom-public-check-category-button'}
                onClick={() => onStudyPublicCheckCategoryButtonClickHandler('공개')}>{'공개'}</div>
              <div className={selectedStudyPublicCheckCategory === '비공개' ? 'main-bottom-box-studyroom-public-check-category-button-selected' : 'main-bottom-box-studyroom-public-check-category-button'}
                onClick={() => onStudyPublicCheckCategoryButtonClickHandler('비공개')}>{'비공개'}</div>
            </div>
            <div className='main-bottom-box-studyroom'>
                {searchStudyList && searchStudyList.length > 0 && (
                  <div className='main-bottom-box-studyroom-line'>
                    {searchStudyList.slice(0, visibleItems).map(SearchStudyRoomItem => <SearchStudyListItem searchStudyRoomItem={SearchStudyRoomItem} />)}
                  </div>
                )}

              {searchStudyList && searchStudyList.length > 15 && visibleItems < searchStudyList.length && (
                <div className='main-bottom-box-studyroom-more-detail-button' onClick={onMoreDetailButtonClickHandler}>{'더보기'}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  //        render: 메인 페이지 렌더링        //
  return (
    <>
      <MainTop />
      <MainMiddle />
      <MainBottom />
    </>
  )
});

export default Main;
