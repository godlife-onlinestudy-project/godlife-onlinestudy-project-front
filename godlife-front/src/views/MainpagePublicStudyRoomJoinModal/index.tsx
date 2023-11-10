import { tab } from '@testing-library/user-event/dist/tab';
import ProgressBar from '../../components/ProgressBar';
import './style.css';
import { useEffect, useState } from 'react';
import { StudyNoticeMock, studyRoomInfoListMock } from '../../mocks';
import { MyStudyRoomInfoItem } from '../../types';
import Scrollbars from 'react-custom-scrollbars-2';
import NoticeItem from '../../components/RoomJoinMoadalNoticeItem';


export default function ManinpagePublicStudyRoomJoinModal() {

    //        state: 참여한 스터디 방 정보        //
    const [ studyRoomInfoList, setStudyRoomInfoList ] = useState<MyStudyRoomInfoItem>(studyRoomInfoListMock);


    //          effect: 컴포넌트 마운트 시 참여한 스터디 방 정보 리스트 불러오기          //
    useEffect(() => {
    // TODO: API 호출로 변경
    setStudyRoomInfoList(studyRoomInfoListMock);
    }, []);


    //        render : 계정인증 메인 랜더링        //
    return(
        <div id='studyroom-join-modal-wrapper'>
            <div className='studyroom-join-modal-card'>
                <div className='studyroom-join-modal-card-close-button-box'>
                    <div className='studyroom-join-modal-card-close-button'></div>
                </div>
                <div className='studyroom-join-modal-header'>
                    <div className='studyroom-image-box'>
                        <div className='studyroom-default-image'></div>
                    </div>
                    <div className='studyroom-join-modal-header-content'>
                        <div className='studyroom-title'>{'스터디 방 이름1'}</div>
                        <div className='studyroom-disclosure'>{'공개'}</div>
                        <div className='studyroom-category'>{'스터디 카테고리'}</div>
                        <div className='studyroom-master-info-box'>
                            <div className='studyroom-master-profile-image-box'>
                                <div className='studyroom-master-grade-image'></div>
                            </div>
                            <div className='studyroom-master-nickname'>{'방장닉네임'}</div>
                        </div>
                    </div>
                </div>
                <div className='studyroom-join-modal-main'>
                    <div className='studyroom-info-container'>
                        <div className='studyroom-info-box'>
                            <div className='studyroom-info-state-box'>
                                <div className='studyroom-participation-personnel-box'>
                                    <div className='studyroom-participation-personnel-title-box'>
                                        <div className='studyroom-participation-personnel-title'>{'참여인원'}</div>
                                    </div>
                                    <div className='studyroom-participation-personnel-text-box'>
                                        <div className='studyroom-participation-personnel-text'>{'참여인원 : 00명 /  00명'}</div>
                                    </div>
                                </div>
                                <div className='studyroom-next-class-date'>
                                    <div className='studyroom-next-class-date-title-box'>
                                        <div className='studyroom-next-class-date-title'>{'다음 스터디 모임 날짜'}</div>
                                    </div>
                                    <div className='studyroom-next-class-date-text-box'>
                                        <div className='studyroom-participation-personnel-text'>{'2023년 12월 10일 목요일'}</div>
                                    </div>
                                </div>
                            </div>
                            <div className='studyroom-progress-rate-box'>
                                <div className='studyroom-progress-rate-title'>{'스터디 진행률'}</div>
                                <div className='studyroom-progress-rate-progressbar-box'>
                                    {<ProgressBar percentage={((studyRoomInfoList.studyProgressRate  / studyRoomInfoListMock.studyPeriod) * 100)}/>}
                                    <div className='studyroom-progress-rate-progressbar'></div>
                                    <div className='studyroom-progress-rate-date'>
                                        <div className='studyroom-start-date-box'>
                                            <div className='studyroom-start-date'>{`시작일 : ${studyRoomInfoListMock.studyStartDate}`}</div>
                                        </div>
                                        <div className='studyroom-end-date-box'>
                                            <div className='studyroom-end-date'>{`종료일 : ${studyRoomInfoListMock.studyEndDate}`}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='studyroom-info-notice-container'>
                        <div className='studyroom-info-notice-box'>
                            <div className='studyroom-info-notice-title-box'>
                                <div className='studyroom-info-notice-title-icon-box'>
                                    <div className='studyroom-info-notice-title-icon'></div>
                                </div>
                                <div className='studyroom-info-notice-title'>{'공지사항'}</div>
                            </div>
                            <div className='studyroom-info-notice-content'>
                                <div className='studyroom-info-notice-content-box'>
                                    <div className='studyroom-info-notice-icon'></div>
                                    <div className='studyroom-info-notice-text'>{'공지사항 내용입니다..블라블라블라입니다.'}</div>
                                </div>
                                <div className='studyroom-info-notice-content-box'>
                                    <div className='studyroom-info-notice-icon'></div>
                                    <div className='studyroom-info-notice-text'>{'공지사항 내용입니다..블라블라블라입니다.'}</div>
                                </div>
                            </div>
                        </div>
                        <div className='notice-contents-left-box'>
                        {/* <Scrollbars
                                renderTrackVertical={(props) => <div {...props} className='track-vertical' />} 
                                renderThumbVertical={(props) => <div {...props} className='thumb-vertical' />}>
                            {StudyNoticeMock.map((noticeItem) => (
                                <NoticeItem  key={noticeItem.studyNoticeNumber} noticeItem={noticeItem} />
                            ))}
                        </Scrollbars> */}
                        </div>
                    </div>
                    <div className='studyroom-info-todo-list-container'>
                        <div className='studyroom-info-todo-list-box'>
                            <div className='studyroom-info-todo-list-title-box'>
                                <div className='studyroom-info-todo-list-icon-box'>
                                    <div className='studyroom-info-todo-list-title-icon'></div>
                                </div>
                                <div className='studyroom-info-todo-list-title'>{'Study To Do List'}</div>
                            </div>
                            <div className='studyroom-info-todo-list-content'>
                                <div className='studyroom-info-todo-list-content-box'>
                                    <div className='studyroom-info-todo-list-icon'></div>
                                    <div className='studyroom-info-todo-list-text'>{'블라블라블라입니다~~~~~'}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='studyroom-info-button-box'>
                        <div className='studyroom-join-button-text'>{'참가하기'}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}