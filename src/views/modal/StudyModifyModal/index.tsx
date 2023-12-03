import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import './style.css';

import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';
import DatePickerModifyStudyComponent from 'components/DatePickerModifyStudy';
import DropDownModifyStudyCategory from 'components/DropdownModifyStudyCategory';
import { Study, StudyModify } from 'types';
import { accessTokenMock, studyListMock } from 'mocks';
import GetModifyStudyResponseDto from 'apis/dto/response/study/get-modify-study.response.dto';
import ResponseDto from 'apis/dto/response';
import { useStudyStore, useUserStore } from 'stores';
import { PatchStudyRequestDto } from 'apis/dto/request/study';
import { getModifyStudyRequest, patchStudyRequest } from 'apis';
import { Cookies, useCookies } from 'react-cookie';

//          interface: 스터디방 아이템 Props          //
interface Props {
    studyItem: StudyModify | null;
    setStudyItem: (studyItem: StudyModify | null) => void;
    modalCloseHandler: () => void;
    studyNumber: string | number;
}

//          component : 스터디 방 재설정 모달 페이지          //
export default function StudyModifyModal({ studyItem, setStudyItem, modalCloseHandler }: Props) {

    //          state : 스터디 방 번호          //
    const { studyNumber } = useParams();
    //          state: 로그인 유저 상태          //
    const { user } = useUserStore();
    //          state: cookie 상태          //
    const [cookies, setCookies] = useCookies();
    //          state : 스터디 제목 글자 갯수          //
    const [studyNameCount, setStudyNameCount] = useState<number>(0);
    //          state : 스터디 제목 글자 길이 2에러          //
    const [studyNameLengthError, setStudyNameLengthError] = useState<boolean>(false);
    //          state: 스터디 방 인원 에러 메세지 표시 상태          //
    const [showCountErrorMessage, setShowCountErrorMessage] = useState<boolean>(false);

    //          state:  이미지 input ref 상태           //
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    
    //          state:  스터디 방 상태           //
    const [study, setStudy] = useState<StudyModify | null>(null);
    //          state:  스터디 이름 상태           //
    const [studyName, setStudyName] = useState<string>('');
    //          state:  스터디 종료일 상태           //
    const [studyEndDate, setStudyEndDate] = useState<string>('');
    //          state:  스터디 인원 설정 상태           //
    const [studyPersonal, setStudyPersonal] = useState<number>(0);
    //          state:  스터디 카테고리 상태           //
    const [studyCategory1, setStudyCategory1] = useState<string>('');
    //          state:  스터디 공개/비공개 여부 상태           //
    const [studyPublicCheck, setStudyPublicCheck] = useState<boolean>(true);
    //          state:  스터디 비공개 비밀번호 상태           //
    const [studyPrivatePassword, setStudyPrivatePassword] = useState<string | null>('');
    //          state : 스터디 커버 이미지 상태          //
    const [studyCoverImageUrl, setStudyCoverImageUrl] = useState<string | null>('');
    //          state : 스터디 만든 유저 상태          //
    const [isCreater, setIsCreater] = useState<boolean>(false);

    //          function: get modify study response 처리 함수          //
    const getStudyModifyResponse = (responseBody: GetModifyStudyResponseDto | ResponseDto) => {
        const { code } = responseBody;
        if (code === 'NS') alert('존재하지 않는 스터디입니다.');
        if (code === 'DBE') alert('데이터베이스 오류입니다.');
        if (code !== 'SU') {
            return;
        }

        const study: StudyModify = { ...responseBody as GetModifyStudyResponseDto };

        if (!user) return;
        const isCreater = user.email === study.createStudyUserEmail;
        setIsCreater(isCreater);
    };

    //          function: patch modify study response 처리 함수          //
    const patchStudyModifyResponse = (code: string) => {
        if (code === 'NS') alert('존재하지 않는 스터디입니다.');
        if (code === 'DBE') alert('데이터베이스 오류입니다.');
        if (code === 'NP') alert('권한이 없습니다.');
        if (code !== 'SU') {
            return;
        }

        if (!studyNumber) return;
    };

    //          event handler: 스터디 제목 변경 이벤트 처리          //
    const onStudyNameChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const title = event.target.value;
        const length = title.length;
        if (length > 20) {
            return;
        }
        if (length === 1) setStudyNameLengthError(true);
        setStudyName(title);

        setStudyNameCount(length);
    };

    //          state: 초기에 설정된 스터디 인원 숫자 상태          //
    const [initialStudyPersonal, setInitialStudyPersonal] = useState<number>(0);

    //          effect: 초기에 설정된 스터디 인원 값 저장          //
    useEffect(() => {
        setInitialStudyPersonal(studyPersonal);
    }, [])
    
    //          event handler: 참여 인원 추가          //
    const onPlusCountHandler = () => {
        let count = studyPersonal;

        if (count < 20) {
            count++;
            setStudyPersonal(count);
        } else return;

        setShowCountErrorMessage(false);
    };

    //          event handler: 참여 인원 감소 처리          //
    const onMinusCountHandler = () => {
        const minValue = initialStudyPersonal;
    // description: 방참여 인원보다 내려가지 않도록 처리 //
        if (studyPersonal > minValue) {
            let count = studyPersonal;
            count--;
            setStudyPersonal(count);
            
            setShowCountErrorMessage(false);
        } else {
            setShowCountErrorMessage(true);
        }
    };

    //          event handler: 랜덤 코드 이벤트 처리          //
    const onGernerateRandomCode = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const codeLength = 8;
        let code = '';
        for (let i = 0; i < codeLength; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            code += characters.charAt(randomIndex);
        }
        return code;
    };

    //          event handler: 사용자가 수정하면 코드 업데이트 이벤트 처리 / 8글자 까지만 적히게 처리         //
    const onChangeCodeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const newCode = event.target.value;
        if (newCode.length <= 8) {
            setStudyPrivatePassword(newCode);
        }
    };

    //          event handler: 공개방 선택에 따른 비공개방 선택여부 처리          //
    const onOpenRoomClickhandler = () => {
        setStudyPublicCheck(true);
        setStudyPrivatePassword(null);
    };

    //          event handler: 비공개방 선택에 따른 공개방 선택여부 처리          //
    const onCloseRoomClickhandler = () => {
        setStudyPublicCheck(false);
        const code = onGernerateRandomCode();
        setStudyPrivatePassword(code);
    };
    
    //          event handler: 스터디 커버 이미지 클릭 이벤트 처리          //
    const onStudyCoverImageClickHandler = () => {
        if (!fileInputRef.current) return;
        fileInputRef.current.click();
    };

    //          event handler: 스터디 커버 이미지 변경 이벤트 처리          //
    const onStudyCoverImageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || !event.target.files.length) return;
        const imageUrl = URL.createObjectURL(event.target.files[0]);
        setStudyCoverImageUrl(imageUrl);
    };

    //           event handler: 아이콘 클릭 코드 복사 이벤트 처리           //
    const onClickCopyCodeHandler = () => {
        if (studyPrivatePassword)
        navigator.clipboard.writeText(studyPrivatePassword);
    };
    
    //           event handler: 스터디 종료일 이벤트 처리           //
    const onEndDateChangeHandler = (date: string) => {
        setStudyEndDate(date);
    };

    //           event handler: 스터디 카테고리 변경 이벤트 처리           //
    const onStudyCategory1Change = (category: string) => {
        setStudyCategory1(category);
    };

    //           event handler: 스터디 재설정 이벤트 처리           //
    const onSaveChangesClickHandler = () => {
        if (!studyNumber) return;

        const accessToken = cookies.accessToken;
        if (!accessToken) return;

        const checkedTitle = studyName.trim().length < 2;
        if (checkedTitle) {
            return;
        }

        const requestBody: PatchStudyRequestDto = {
            studyName, studyEndDate, studyPersonal, studyCategory1, 
            studyPublicCheck, studyPrivatePassword, studyCoverImageUrl
        }
        patchStudyRequest(requestBody, studyNumber, accessToken).then(patchStudyModifyResponse);

        alert('스터디 재설정 완료!');
    };

    //           effect : 스터디 제목 길이 변경될때 마다 실행되는 함수           //
    useEffect(() => {
        const length = studyName ? studyName.length : 0;
        if (length < 1) {
            setStudyNameLengthError(false);
        }
        
        if (length === 1) {
            setStudyNameLengthError(true);
        }
        
        if (length >= 2 && length <= 20) {
            setStudyNameLengthError(false);
        }
        
        setStudyNameCount(length);
    }, [studyName]);
    
    //           effect : studyItem이 바뀔 때마다 값 참조           //
    useEffect(() => {
        if (!studyItem) return;
        const { studyName, studyEndDate, studyPersonal, studyCategory1, studyPublicCheck, studyPrivatePassword, studyCoverImageUrl } = studyItem;
        setStudyName(studyName);
        setStudyEndDate(studyEndDate);
        setStudyPersonal(studyPersonal);
        setStudyCategory1(studyCategory1);
        setStudyPublicCheck(studyPublicCheck);
        setStudyPrivatePassword(studyPrivatePassword);
        setStudyCoverImageUrl(studyCoverImageUrl);
    }, [studyItem]);

    if (!studyItem) return (<></>)

    //          render : 스터디 재설정 페이지 렌더링          //
    return (
        <div id='reset-wrapper'>
            <div className='reset-card'>
                <div className='reset-button-box'>
                    <button type='button' className='modal-close-button' onClick={modalCloseHandler}>X</button>
                </div>
                <div className='reset-control-box'>
                    <div className='study-title-container'>
                        <div className='study-title'>{'*스터디 제목'}</div>
                        <div className='study-title-write-container'>
                            <input type='text' className='study-title-write' value={studyName} onChange={onStudyNameChangeHandler} />
                            <span className='study-title-write-count'>{`${studyNameCount}/20`}</span>
                        </div>
                    </div>
                    <div className='study-title-write-error-box'>{studyNameLengthError && <div className='study-title-write-error-message'>{'최소 2글자 이상 입력해주세요'}</div>}</div>
                    <div className='study-period-container'>
                        <div className='study-period-title'>{'*스터디 기간'}</div>
                        <div className='study-period-end-date-title-box'>
                            <div className='study-peroid-end-date-text'>{'종료일'}</div>
                            <DatePickerModifyStudyComponent value={studyEndDate} onChange={onEndDateChangeHandler} />
                        </div>
                    </div>
                    <div className='study-count-setting'>
                        <div className='study-count-title'>{'*스터디 인원 설정'}</div>
                        <div className='study-count-add-icon' onClick={onPlusCountHandler}></div>
                        <div className='study-count-contents'>{studyPersonal}</div>
                        <div className='study-count-minus-icon' onClick={onMinusCountHandler}></div>
                        <div className='study-count-error-message'>{showCountErrorMessage && '방참여 인원보다 내려갈 수 없습니다.'}</div>
                    </div>
                    <div className='study-modify-category-container'>
                        <div className='study-modify-category-title'>{'*스터디 카테고리'}</div>
                        <DropDownModifyStudyCategory value={studyCategory1} onChange={onStudyCategory1Change} />
                    </div>
                    <div className='study-open-container'>
                        <div className='study-open-title'>{'*스터디 공개방, 비공개방'}</div>
                        {studyPublicCheck ? (
                            <button className='study-open-select'>{'공개'}</button>
                            ) : (
                            <button className='study-open' onClick={onOpenRoomClickhandler}>{'공개'}</button>
                        )}
                        <div className='study-close-box'>
                            {!studyPublicCheck ? (
                                <button className='study-close-select'>{'비공개'}</button>
                                ) : (
                                <button className='study-close' onClick={onCloseRoomClickhandler}>{'비공개'}</button>
                            )}
                            {!studyPublicCheck && studyPrivatePassword !== null && (
                                <div className='study-close-password'>
                                    <input className='study-close-password-write' type='text' value={studyPrivatePassword} onChange={onChangeCodeHandler} />
                                    <div className='password-icon' onClick={onClickCopyCodeHandler}></div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='study-cover-modify-image-box'>
                        <div className='study-cover-image-title'>{'스터디 커버 이미지'}</div>
                        <div className='study-cover-image-contents' onChange={onStudyCoverImageChangeHandler}>
                            <input ref={fileInputRef} type='file' accept='image/*' style={{ display: 'none' }} />
                            {studyCoverImageUrl || studyItem.studyCoverImageUrl ? (
                                <div className='study-cover-profile-image' style={{ backgroundImage: `url(${studyCoverImageUrl || studyItem.studyCoverImageUrl})` }}></div>
                            ) : (
                                <div className='study-cover-profile-default-image'></div>
                            )}
                            <div className='change-controll' onClick={onStudyCoverImageClickHandler}>{'변경'}</div>
                        </div>
                    </div>
                </div>
                <div className='study-reset-buttton-box' onClick={onSaveChangesClickHandler}>
                    <div className='reset-reset-button-title'>{'스터디 재설정'}</div>
                </div>
            </div>
        </div>
    );
}