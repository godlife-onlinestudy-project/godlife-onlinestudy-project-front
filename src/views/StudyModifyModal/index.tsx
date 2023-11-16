import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import './style.css';

import ModalSideMenu from 'components/ModalSideMenu';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';
import DatePickerModifyStudyComponent from 'components/DatePickerModifyStudy';
import DropDownModifyStudyCategory from 'components/DropdownModifyStudyCategory';
import { StudyListItem } from 'types';
import { studyListMock } from 'mocks';

// //          interface: 스터디방 리스트 아이템 Props          //
// interface Props {
//     studyListItem: StudyListItem;
// }

//          component : 스터디 방 재설정 모달 페이지          //
export default function StudyModifyModal() {

    // //          state: Properties          //
    // const { studyNumber, studyName, studyStartDate, studyPersonNumber, studyEndDate } = studyListItem;
    // const { studyCategory1, studyCategory2, studyCategory3, studyPublicCheck, studyPrivatePassword  } = studyListItem;
    // const { studyCoverImageUrl, studyNextStartTime, studyNextEndTime, studyTotalDay } = studyListItem;

    //          state : 스터디 방 번호          //
    const { studyNumber } = useParams();
    //          state : 스터디 제목 글자 갯수          //
    const [studyTitleCount, setStudyTitleCount] = useState<number>(0);
    //          state : 스터디 제목 글자 길이 2에러          //
    const [studyTitleLengthError, setStudyTitleLenghtError] = useState<boolean>(false);
    //          state: 스터디 제목 변경 상태           //
    const [showChangeStudyTitle, setShowChangeStudyTitle] = useState<boolean>(false);

    //          state: 스터디 방 인원 에러 메세지 표시 상태          //
    const [showCountErrorMessage, setShowCountErrorMessage] = useState<boolean>(false);

    //          state:  이미지 input ref 상태           //
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    //          state : 공개방 선택 여부 상태       //
    const [openRoomSelectionCheck, setOpenRoomSelectionCheck] = useState<boolean>(false);
    //          state : 비공개방 선택 여부 상태       //
    const [closeRoomSelectionCheck, setCloseRoomSelectionCheck] = useState<boolean>(false);

    //          state : 스터디 커버 이미지 상태          //
    const [studyCoverImage, setStudyCoverImage] = useState<string | null>('');


    // const initialStudyData: StudyListItem | undefined = studyListMock.find(
    //     (study) => study.studyNumber === studyListItem.studyNumber
    // );
    // // const [studyNumber, setStudyNumber] = useState<number>(initialStudyData?.studyNumber || 0);
    // const [studyTitle, setStudyTitle] = useState<string>(initialStudyData?.studyName || '');
    // const [studyPersonNumber, setStudyPersonNumber] = useState<number>(initialStudyData?.studyPersonNumber || 0);
    // const [studyEndDate, setStudyEndDate] = useState<string>(initialStudyData?.studyEndDate || '');
    // const [studyCategory1, setStudyCategory1] = useState<string>(initialStudyData?.studyCategory1 || '');

    //          event handler: 스터디 제목 변경 버튼 클릭 이벤트 처리          //
    const onChangenStudyTitleButtonClickHandler = () => {
        setShowChangeStudyTitle(!showChangeStudyTitle);
    };

    //          event handler: 스터디 제목 변경 이벤트 처리          //
    const onStudyTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const title = event.target.value;
        const length = title.length;
        if (length > 20) {
            return;
        }
        if (length === 1) setStudyTitleLenghtError(true);
        setStudyTitle(title);

        setStudyTitleCount(length);
    };

    //          event handler: 참여 인원 추가          //
    const onPlusCountHandler = () => {
        let count = studyPersonNumber;

        if (count < 20) {
            count++;
            setStudyPersonNumber(count);
        } else return;

        setShowCountErrorMessage(false);
    };

    //          event handler: 참여 인원 감소 처리          //
    const onMinusCountHandler = () => {
        const minValue = initialStudyData?.studyPersonNumber || 0;
    // description: 방참여 인원보다 내려가지 않도록 처리 //
        if (studyPersonNumber > minValue) {
            let count = studyPersonNumber;
            count--;
            setStudyPersonNumber(count);

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

    //          state: 코드 상태          //
    const [code, setCode] = useState(onGernerateRandomCode());

    //          event handler: 사용자가 수정하면 코드 업데이트 이벤트 처리 / 8글자 까지만 적히게 처리         //
    const onChangeCodeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const newCode = event.target.value;
        if (newCode.length <= 8) {
            setCode(newCode);
        }
    };

    // event handler : 공개방 선택에 따른 비공개방 선택여부  처리 //
    const onOpenRoomClickhandler = () => {
        if (closeRoomSelectionCheck === true) {
            setCloseRoomSelectionCheck(false);
        }
        setOpenRoomSelectionCheck(true);
        return;
    };

    // event handler : 공개방 선택에 따른 비공개방 선택여부  처리 //
    const onCloseRoomClickhandler = () => {
        if (openRoomSelectionCheck === true) {
            setOpenRoomSelectionCheck(false);
        }
        setCloseRoomSelectionCheck(true);
        setCode(onGernerateRandomCode());
        return;
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
        setStudyCoverImage(imageUrl); // 이미지 업데이트 추가
    };

    //           event handler: 아이콘 클릭 코드 복사 이벤트 처리           //
    const onClickCopyCodeHandler = () => {
        navigator.clipboard.writeText(code);
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
        alert('스터디 재설정 완료');
    };

    //           effect : 스터디 제목 길이 변경될때 마다 실행되는 함수           //
    useEffect(() => {
        const length = studyTitle.length;

        if (length < 1) {
            setStudyTitleLenghtError(false);
        }

        if (length === 1) {
            setStudyTitleLenghtError(true);
        }

        if (length >= 2 && length <= 20) {
            setStudyTitleLenghtError(false);
        }

        setStudyTitleCount(length);
    }, [studyTitle]);

    //          render : 스터디 재설정 페이지 렌더링          //
    return (
        <div id='reset-wrapper'>
            <div className='reset-card'>
                <ModalSideMenu />
                <div className='reset-button-box'>
                    <button type='button' className='modal-close-button'>X</button>
                </div>
                <div className='reset-control-box'>
                    <div className='study-title-container'>
                        <div className='study-title'>{'*스터디 제목'}</div>
                        <div className='study-title-write-container'>
                            <input type='text' className='study-title-write' value={studyTitle} onChange={onStudyTitleChangeHandler} />
                            <span className='study-title-write-count'>{`${studyTitleCount}/20`}</span>
                        </div>
                    </div>
                    <div className='study-title-write-error-box'>{studyTitleLengthError && <div className='study-title-write-error-message'>{'최소 2글자 이상 입력해주세요'}</div>}</div>
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
                        <div className='study-count-contents'>{studyPersonNumber}</div>
                        <div className='study-count-minus-icon' onClick={onMinusCountHandler}></div>
                        <div className='study-count-error-message'>{showCountErrorMessage && '방참여 인원보다 내려갈 수 없습니다.'}</div>
                    </div>
                    <div className='study-modify-category-container'>
                        <div className='study-modify-category-title'>{'*스터디 카테고리'}</div>
                        <DropDownModifyStudyCategory value={studyCategory1} onChange={onStudyCategory1Change} />
                    </div>
                    <div className='study-open-container'>
                        <div className='study-open-title'>{'*스터디 공개방, 비공개방'}</div>
                        {openRoomSelectionCheck ? (
                            <button className='study-open-select'>{'공개'}</button>
                        ) : (
                            <button className='study-open' onClick={onOpenRoomClickhandler}>{'공개'}</button>
                        )}
                        <div className='study-close-box'>
                            {closeRoomSelectionCheck ? (
                                <button className='study-close-select'>{'비공개'}</button>
                            ) : (
                                <button className='study-close' onClick={onCloseRoomClickhandler}>{'비공개'}</button>
                            )}
                            {closeRoomSelectionCheck && (
                                <div className='study-close-password'>
                                    <input className='study-close-password-write' type='text' value={code} onChange={onChangeCodeHandler} />
                                    <div className='password-icon' onClick={onClickCopyCodeHandler}></div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='study-cover-image-box'>
                        <div className='study-cover-image-title'>{'스터디 커버 이미지'}</div>
                        <div className='study-cover-image-contents' onChange={onStudyCoverImageChangeHandler}>
                            <input ref={fileInputRef} type='file' accept='image/*' style={{ display: 'none' }} />
                            {studyCoverImage || studyListItem.studyCoverImageUrl ? (
                                <div className='study-cover-profile-image' style={{ backgroundImage: `url(${studyCoverImage || studyListItem.studyCoverImageUrl})` }}></div>
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