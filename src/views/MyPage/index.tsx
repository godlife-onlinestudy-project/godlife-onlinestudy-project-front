import DropDownFirstCategory from 'components/Dropdown1Category';
import DropDownOtherCategory from 'components/DropdownOtherCategory';
import JoinListItem from 'components/JoinStudyItem';
import JoinedListItem from 'components/JoinedStudyItem';
import { userMock } from 'mocks';
import joinStudyListMock from 'mocks/join-study-list.mock';
import joinedStudyListMock from 'mocks/joined-study-list.mock';
import React, { ChangeEvent, useState, useRef, useEffect } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useParams } from 'react-router-dom';
import useUserStore from 'stores/user.store';
import MemberManageModal from 'views/MemberManageModal';
import './style.css';

//          component: 마이페이지           //
export default function MyPage() {
    //          state: 조회하는 유저 이메일 path variable 상태          //
    const { searchEmail } = useParams();
    //          state: 로그인 유저 정보 상태          //
    const { user } = useUserStore();

    //        component: 마이페이지 상단 컴포넌트        //
    const MyPageTop = () => {

        //          state: 프로필 이미지 input ref 상태          //
        const fileInputRef = useRef<HTMLInputElement | null>(null);
        //          state: 이메일 상태          //
        const [email, setEmail] = useState<string>('');
        //          state: 프로필 이미지 상태          //
        const [profileImage, setProfileImage] = useState<string | null>('');
        //          state: 닉네임 상태          //
        const [nickname, setNickname] = useState<string>('');
        //          state: 닉네임 변경 상태          //
        const [showChangeNickname, setShowChangeNickname] = useState<boolean>(false);
        //          state: 닉네임 에러 상태          //
        const [nicknameError, setNicknameError] = useState<boolean>(false);
        //          state: 닉네임 에러 메세지 상태          //
        const [nicknameErrorMessage, setNicknameErrorMessage] = useState<string>('');
        //          state: 모달 창 상태          //
        const [show, setShow] = useState<boolean>(false);
        
        //          event handler: 프로필 이미지 변경 클릭 이벤트 처리          //
        const onProfileImageChangeButtonClickHandler = () => {
            if (!fileInputRef.current) return;
            fileInputRef.current.click();
        };
        //          event handler: 프로필 이미지 변경 이벤트 처리          //
        const onProfileImageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            if (!event.target.files || !event.target.files.length) return;
            const imageUrl = URL.createObjectURL(event.target.files[0]);
            setProfileImage(imageUrl);
        };
        
        //          event handler: 닉네임 변경 버튼 클릭 이벤트 처리          //
        const onChangeNicknameButtonClickHander = () => {
            if (nickname.length < 2) {
                setNicknameError(true); // 닉네임이 2글자 미만이면 에러 상태 설정
                setNicknameErrorMessage('닉네임은 2글자 이상이어야 합니다.');
            } else {
                setNicknameError(false); // 닉네임이 2글자 이상이면 에러 상태 해제
                setNicknameErrorMessage('');
                setShowChangeNickname(!showChangeNickname);
            }
        };
        //          event handler: 닉네임 변경 이벤트 처리          //
        const onNicknameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            const nickname = event.target.value;
            setNickname(nickname);
            
            if (nickname.length >= 2) {
                setNicknameError(false); // 닉네임이 2글자 이상이면 에러 상태 해제
                setNicknameErrorMessage('');
            }
        };
        
        //          event handler: 비밀번호 수정하기 버튼 클릭 이벤트 처리          //
        const onChangePasswordButtonClickHander = () => {
            alert('비밀번호 수정 창 띄우기');
        };
        
        //          event handler: 등급기준 보러가기 버튼 클릭 이벤트 처리          //
        const onLookGradeStandardButtonClickHander = () => {
            alert('등급기준 보러가기 창 띄우기');
        };
        
        //          event handler: 모달 Open, Close 이벤트 처리          //
        const modalCloseHandler = () => setShow(false);
        const modalOpenHandler = () => setShow(true);
        
        //          effect: 조회하는 유저의 이메일이 변경될 때마다 실행할 함수          //
        useEffect(() => {
            const { userEmail, userNickname, userProfileImageUrl } = userMock;
            setEmail(userEmail);
            setNickname(userNickname);
            setProfileImage(userProfileImageUrl);
        }, [searchEmail]);
        
        //             render: 마이페이지 상단 렌더링              //
        return (
            <div id='my-page-top'>
                <div className='background-default-color'>
                    <div className='user-info'>
                        <div className='user-info-box'>
                            <div className='user-info-title'>{'회원정보'}</div>
                            <div className='info-detail-box'>
                                <div className='info-detail-box-top'>
                                    <div className='user-profile-box'>
                                        <div className='user-profile-image'>
                                            <input ref={fileInputRef} type='file' accept='image/*' style={{ display: 'none' }} onChange={onProfileImageChangeHandler} />
                                            {profileImage === '' ? <div className='user-profile-default-image'></div> : <div className='user-profile-image' style={{ backgroundImage: `url(${profileImage})` }}></div>}
                                        </div>
                                        <div className='user-profile-image-change-box' onClick={onProfileImageChangeButtonClickHandler}>
                                            <div className='user-profile-image-change-box-text'>{'변경'}</div>
                                        </div>
                                    </div>
                                    <div className='user-basic-info-box'>
                                        <div className='user-nickname-box'>
                                            {showChangeNickname ? <input className='user-info-nickname-input' type='text' size={nickname.length + 3} value={nickname} onChange={onNicknameChangeHandler} /> : <div className='user-nickname-text'>{nickname}</div>}
                                            <div className='user-nickname-icon' onClick={onChangeNicknameButtonClickHander}>
                                            {nicknameError && (
                                                <div className='error-message'>
                                                    {nicknameErrorMessage}
                                                </div>
                                            )}
                                            </div>
                                        </div>
                                        <div className='user-email'>{email}</div>
                                        <div className='password-modify-box' onClick={onChangePasswordButtonClickHander}>{'비밀번호 수정하기'}</div>
                                    </div>
                                </div>
                                <div className='user-category-box'>
                                    <div className='user-category-title'>{'관심 카테고리'}</div>
                                    <div className='user-category-list-box'>
                                        <div className='user-category-1'>
                                            <div className='user-category-1-title'>{'1관심 카테고리'}</div>
                                            {<DropDownFirstCategory />}
                                        </div>
                                        <div className='user-category-2'>
                                            <div className='user-category-2-title'>{'2관심 카테고리'}</div>
                                            {<DropDownOtherCategory />}
                                        </div>
                                        <div className='user-category-3'>
                                            <div className='user-category-3-title'>{'3관심 카테고리'}</div>
                                            {<DropDownOtherCategory />}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='user-grade-box'>
                            <div className='user-grade-icon-box'>
                                <div className='user-grade-icon'></div>
                                <div className='user-grade-icon-text'>{'새싹'}</div>
                            </div>
                            <div className='user-grade-standard'>
                                <div className='user-grade-leaf-box'>
                                    <div className='user-leaf-icon'></div>
                                    <div className='user-leaf-text'>{'댓글 10, 게시물 10'}</div>
                                </div>
                                <div className='user-grade-weeds-box'>
                                    <div className='user-weeds-icon'></div>
                                    <div className='user-weeds-text'>{'댓글 50, 게시물 50'}</div>
                                </div>
                                <div className='user-grade-tree-box'>
                                    <div className='user-tree-icon'></div>
                                    <div className='user-tree-text'>{'댓글 100, 게시물 100'}</div>
                                </div>
                            </div>
                            <div className='user-check-grade-standard'>
                                <div className='user-grade-standard-box' onClick={modalOpenHandler}>
                                    <div className='user-grade-standard-box-text'>{'등급기준 보러가기'}</div>
                                </div>
                                {/* {show && <MemberManageModal modalCloseHandler={modalCloseHandler} />} */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    //      component: 마이페이지 하단 컴포넌트          //
    const MyPageBottom = () => {
        //          render: 마이페이지 하단 렌더링              //
        return (
            <div id='my-page-bottom'>
                <div className='user-activity-histroy-box'>
                    <div className='user-activity-history'>
                        <div className='user-activity-histroy-title'>{'활동 기록'}</div>
                        <div className='user-activity-box'>
                            <div className='user-join-study-box'>
                                <div className='user-join-study-title'>{'참여중인 스터디'}</div>
                                <div className='join-study-box'>
                                    <div className='join-study-box-titles'>
                                        <div className='join-study-title'>{'방 제목'}</div>
                                        <div className='join-study-category'>{'방 카테고리'}</div>
                                        <div className='join-study-authority'>{'내 권한'}</div>
                                        <div className='join-study-progress'>{'스터디 진행률'}</div>
                                        <div className='join-study-total-day'>{'총 스터디 일수'}</div>
                                        <div className='join-study-join-day'>{'참석일수'}</div>
                                        <div className='join-study-absent-day'>{'결석일수'}</div>
                                        <div className='join-study-late-day'>{'지각일수'}</div>
                                    </div>
                                    <div className='join-study-list-box'>
                                        <Scrollbars renderTrackVertical={(props) => <div {...props} className='track-vertical' />} 
                                        renderThumbVertical={(props) => <div {...props} className='thumb-vertical' />}>
                                            {joinStudyListMock.map((joinItem) => (
                                                <JoinListItem joinStudyItem={joinItem} />
                                            ))}
                                        </Scrollbars>
                                    </div>
                                </div>
                            </div>
                            <div className='user-joined-study-box'>
                                <div className='user-joined-study-title'>{'참가한 스터디 기록'}</div>
                                <div className='joined-study-box'>
                                    <div className='joined-study-box-titles'>
                                        <div className='joined-study-title'>{'방 제목'}</div>
                                        <div className='joined-study-category'>{'방 카테고리'}</div>
                                        <div className='joined-study-authority'>{'스터디 내 권한'}</div>
                                        <div className='joined-study-end-day'>{'스터디 종료 날짜'}</div>
                                        <div className='joined-study-total-day'>{'총 스터디 일수'}</div>
                                        <div className='joined-study-join-day'>{'참석일수'}</div>
                                        <div className='joined-study-absent-day'>{'결석일수'}</div>
                                        <div className='joined-study-late-day'>{'지각일수'}</div>
                                    </div>
                                    <div className='joined-study-list-box'>
                                        <Scrollbars renderTrackVertical={(props) => <div {...props} className='track-vertical' />} renderThumbVertical={(props) => <div {...props} className='thumb-vertical' />}>
                                            {joinedStudyListMock.map((joinedItem) => (
                                                <JoinedListItem joinedStudyItem={joinedItem} />
                                            ))}
                                        </Scrollbars>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
    return (
        <>
            <MyPageTop />
            <MyPageBottom />
        </>
    );
}
