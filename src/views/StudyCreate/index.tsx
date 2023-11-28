import React, { ChangeEvent, useRef, useState } from 'react';
import './style.css';
import DropDownStudyPeopleSet from 'components/DropdownStudyPeopleSet';
import DropDownFirstCategory from 'components/Dropdown1Category';
import DropDownStudyCreateCategory from 'components/DropdownStudyCreateCategory';
import DatePickerComponent from 'components/DatePicker';

import MaterialManageModal from 'views/MaterialManageModal';

//          component: 스터디 생성 페이지          //
export default function StudyCreate() {
    // const countRef = useRef<HTMLSpanElement | null>(null);

    //          state: 스터디 생성 오류 상태          //
    const[error, setError] = useState<boolean>(false);

    //          state: 스터디 커버 이미지 input ref 상태          //
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    
    //          state: 스터디 제목 상태          //
    const [title, setTitle] = useState<string>('');
    //          state: 스터디 제목 카운트 상태          //
    const [titleCount, setTitleCount] = useState<number>(0);
    //          state: 스터디 제목 에러 상태          //
    const [titleError, setTitleError] = useState<boolean>(false);
    //          state: 스터디 제목 에러 상태 메세지          //
    const [titleErrorMessage,setTitleErrorMessage] = useState<string>('');
    //          state: 공개방 선택 상태          //
    const [isPublic, setIsPublic] = useState(true);
    //          state: 스터디 커버 이미지 상태          //
    const [coverImage, setCoverImage] = useState<string | null>('');
    //          state: 모달 창 상태          //
    const [show, setShow] = useState<boolean>(false);


    //          event handler: 스터디 제목 글자수 20제한 이벤트 처리         //
    const onTitleChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (value.length > 20) return;
        setTitle(value);
        setTitleCount(value.length);
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

    //          event handler: 스터디 만들기 클릭 이벤트 처리          //
    const onClickCreateStudyRoomHandler = () => {
        
        setTitleError(false);
        setTitleErrorMessage('');
        
        // description : 스터디 제목 확인 //
        const checkedTitle = title.trim().length < 2;
        if (checkedTitle) {
            setTitleError(true);
            setTitleErrorMessage('최소 2글자 이상 입력해야 합니다.')
        } else alert('스터디 만들기 완료!');
    };
    //          event handler: 공개방 / 비공개방 이벤트 처리          //
    const onClickPublicHandler = () => {
        setIsPublic(true);
    };
    const onClickPrivateHandler = () => {
        setIsPublic(false);
        setCode(onGernerateRandomCode());
    };
    //          event handler: 사용자가 수정하면 코드 업데이트 이벤트 처리 / 8글자 까지만 적히게 처리         //
    const onChangeCodeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const newCode = (event.target.value);
        if (newCode.length <= 8) {
            setCode(newCode);
        }
    }
    //           event handler: 아이콘 클릭 코드 복사 이벤트 처리           //
    const onClickCopyCodeHandler = () => {
        navigator.clipboard.writeText(code);
    }
    //          event handler: 스터디 커버 이미지 클릭 이벤트 처리          //
    const onStudyCoverImageChangeButtonClickHandler = () => {
        if (!fileInputRef.current) return;
        fileInputRef.current.click();
    };

    //          event handler: 스터디 커버 이미지 변경 이벤트 처리          //
    const onStudyCoverImageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || !event.target.files.length) return;
        const imageUrl = URL.createObjectURL(event.target.files[0]);
        setCoverImage(imageUrl);
    };

    //          event handler: 모달 Open, Close 이벤트 처리          //
    const modalCloseHandler = () => setShow(false);
    const modalOpenHandler = () => setShow(true);

    //            render: 스터디 생성 페이지 렌더링           //
    return (
        <div id='study-create'>
            <div className='study-create-background'>
                <div className='study-create-title'>{'스터디만들기'}</div>
                <div className='study-create-box'>
                    <div className='study-create-main-box'>
                        <div className='study-create-index-box'>
                            <div className='study-title-input'>
                                <div className='study-title-input-box'>
                                    <div className='study-title-input-text'>{'*스터디 제목'}</div>
                                    <div className='input-container'>
                                        <input type='text' className={`input ${titleError ? 'error' : ''}`} placeholder='제목을 입력하세요.' value={title} onChange={onTitleChangeHandler} />
                                        <span id='char-count'>{`${titleCount}  /  20`}</span>
                                        {titleError && <div className='error-message'>{titleErrorMessage}</div>}
                                    </div>
                                </div>
                            </div>

                            <div className='study-period'>
                                <div className='study-period-text'>{'*스터디 기간'}</div>
                                    <DatePickerComponent />
                            </div>

                            <div className='study-people-set'>
                                <div className='study-people-set-text'>{'*스터디 인원 설정'}</div>
                                {<DropDownStudyPeopleSet />}
                            </div>

                            <div className='study-category'>
                                <div className='join-study-category-text'>{'*스터디 카테고리'}</div>
                                {<DropDownStudyCreateCategory />}
                            </div>

                            <div className='study-materials'>
                                <div className='study-materials-text'>{'*스터디 교육자료'}</div>
                                <div className='study-materials-set-box'>
                                    <div className='study-materials-set-box-text'>{'스터디 교육자료를 업로드 해주세요.'}</div>
                                    <div className='file-upload-icon' onClick={modalOpenHandler}></div>
                                        {show && <MaterialManageModal modalCloseHandler={modalCloseHandler} />}
                                </div>
                            </div>

                            <div className='study-disclosure'>
                                <div className='study-disclosure-text'>{'*스터디 공개여부'}</div>
                                <div className='study-disclosure-box'>
                                    <div className={`study-disclosure-public-box ${isPublic ? 'selected' : ''}`} 
                                    onClick={onClickPublicHandler}>
                                        <div className='study-disclosure-public-box-text'>{'공개방'}</div>
                                    </div>
                                    <div className={`study-disclosure-private-box ${!isPublic ? 'selected' : ''}`}
                                    onClick={onClickPrivateHandler}>
                                        <div className='study-disclosure-private-box-text'>{'비공개방'}</div>
                                    </div>
                                    {isPublic || (
                                        <div className='private-code-box'>
                                            <input type='text' className='private-code-input' value={code}
                                            onChange={onChangeCodeHandler} />
                                            <div className='copy-icon' onClick={onClickCopyCodeHandler}></div>
                                        </div>
                                     )}
                                </div>
                            </div>

                            <div className='study-cover-image'>
                                <div className='study-cover-image-text'>{'스터디 커버 이미지'}</div>
                                <div className='study-cover-image-box'>
                                    <input ref={fileInputRef} type='file' accept='image/*' style={{ display: 'none' }} onChange={onStudyCoverImageChangeHandler} />
                                    {coverImage === '' ? <div className='study-cover-image-icon-box'>
                                        <div className='study-cover-image-icon'></div>
                                    </div>
                                    :<div className="study-cover-image-change" style={{backgroundImage : `url(${coverImage})` }}></div>
                                    }
                                    <div className='study-cover-image-upload-icon' onClick={onStudyCoverImageChangeButtonClickHandler}></div>
                                </div>
                            </div>
                        </div>
                        <div className='study-create-button'>
                            <div className='study-create-button-box' onClick={onClickCreateStudyRoomHandler}>
                                <div className='study-create-button-title'>{'스터디 만들기'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
