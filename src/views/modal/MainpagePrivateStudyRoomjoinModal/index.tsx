import { tab } from '@testing-library/user-event/dist/tab';
import ProgressBar from '../../../components/ProgressBar';
import './style.css';
import { useEffect, useState,KeyboardEvent } from 'react';
import { StudyNoticeMock, studyRoomInfoListMock } from '../../../mocks';
import { MyStudyRoomInfoItem } from '../../../types';
import Scrollbars from 'react-custom-scrollbars-2';
import InputBox from '../../../components/InputBox';
import RoomJoinModalNoticeItem from '../../../components/RoomJoinMoadalNoticeItem';

export default function ManinpagePriavateStudyRoomJoinModal() {

    //        state: 참여한 스터디 방 정보        //
    const [ studyRoomInfoList, setStudyRoomInfoList ] = useState<MyStudyRoomInfoItem[]>(studyRoomInfoListMock);

    //          state: 입력한 비밀번호 상태          //
    const [roompassword, setRoomPassword] = useState<string>('');
    //          state: 비밀번호 인풋 타입 상태          //
    const [roompasswordType, setRoomPasswordType] = useState<'text' | 'password'>('password');
    //          state: 비밀번호 인풋 버튼 아이콘 상태          //
    const [passwordIcon, setPasswordIcon] = useState<'eye-off-icon' | 'eye-on-icon'>('eye-off-icon');
    //          state: 로그인 에러 상태          //
    const [privateRoomJoinError, setPrivateRoomJoinError] = useState<boolean>(false);
    //          state: 비밀번호 에러 메세지 상태          //
    const [privateRoomJoinErrorMessage, setPrivateRoomJoinErrorMessage] = useState<string>('');

    //          effect: 컴포넌트 마운트 시 참여한 스터디 방 정보 리스트 불러오기          //
    useEffect(() => {
    // TODO: API 호출로 변경
    setStudyRoomInfoList(studyRoomInfoListMock);
    }, []);
    
    //          event handler: 비밀번호 인풋 버튼 클릭 이벤트 처리          //
    const onPasswordIconClickHandler = () => {
        if (roompasswordType === 'text') {
        setRoomPasswordType('password');
        setPasswordIcon('eye-off-icon');
        }
        if (roompasswordType === 'password') {
        setRoomPasswordType('text');
        setPasswordIcon('eye-on-icon');
        }
    }
    //          event handler: '가입' 버튼 클릭 이벤트 처리          //
    const onPrivateRoomJoinClickHandler = () => {
        setPrivateRoomJoinError(false);

        // //          description: studyroom 비밀번호 확인 작업           //
        // setPrivateRoomJoinErrorMessage ('비밀번호가 올바르지 않습니다.')

        
        alert('페이지 이동')
    }
    
    //          event handler: 이메일 인풋박스 key down 이벤트 처리          //
    const onPrivateRoomPasswordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return;
        
        onPrivateRoomJoinClickHandler();
    }


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
                                    {<ProgressBar percentage={((studyRoomInfoList[0].studyProgressRate  / studyRoomInfoList[0].studyPeriod) * 100)}/>}
                                    <div className='studyroom-progress-rate-progressbar'></div>
                                    <div className='studyroom-progress-rate-date'>
                                        <div className='studyroom-start-date-box'>
                                            <div className='studyroom-start-date'>{`시작일 : ${studyRoomInfoListMock[0].studyStartDate}`}</div>
                                        </div>
                                        <div className='studyroom-end-date-box'>
                                            <div className='studyroom-end-date'>{`종료일 : ${studyRoomInfoListMock[0].studyEndDate}`}</div>
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
                                <div className='notice-contents-box'>
                                <Scrollbars
                                    renderTrackVertical={(props) => <div {...props} className='studyroom-join-content-track-vertical' />} 
                                    renderThumbVertical={(props) => <div {...props} className='studyroom-join-content-thumb-vertical' />}>
                                {StudyNoticeMock.map((noticeItem) => (
                                    <RoomJoinModalNoticeItem key={noticeItem.studyNoticeNumber} noticeItem={noticeItem} />
                                ))}
                                </Scrollbars>
                                </div>
                            </div>
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
                            <div className='notice-contents-box'>
                                <Scrollbars
                                    renderTrackVertical={(props) => <div {...props} className='studyroom-join-content-track-vertical' />} 
                                    renderThumbVertical={(props) => <div {...props} className='studyroom-join-content-thumb-vertical' />}>
                                {StudyNoticeMock.map((noticeItem) => (
                                    <RoomJoinModalNoticeItem key={noticeItem.studyNoticeNumber} noticeItem={noticeItem} />
                                ))}
                                </Scrollbars>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='studyroom-private-join-container'>
                        <div className='studyroom-password-input-box'>
                            <InputBox label='' type={roompasswordType} placeholder='비밀번호를 입력해주세요.' value={roompassword} setValue={setRoomPassword} icon={passwordIcon} error={privateRoomJoinError} errorMessage={privateRoomJoinErrorMessage} onKeyDown={onPrivateRoomPasswordKeyDownHandler} onButtonClick={onPasswordIconClickHandler} />
                        </div>
                        <div className='studyroom-info-button-box'>
                            <div className='studyroom-join-button-text' onClick={onPrivateRoomJoinClickHandler}>{'참가하기'}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}