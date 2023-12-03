import { StudyNoticeMock } from 'mocks';
import './style.css';

import React, { useState,  useRef, useEffect, ChangeEvent } from 'react';
import HostNoticeItem from 'components/HostNoticeItem';
import Scrollbars from 'react-custom-scrollbars-2';
import { useNavigate, useParams } from 'react-router-dom';
import { GetStudyNoticeListResponseDto } from 'apis/dto/response/studyService';
import { MAIN_PATH } from 'constant';
import { StudyNoticeListItem } from 'types';
import ResponseDto from 'apis/dto/response';
import { useCookies } from 'react-cookie';
import { getStudyNoticeListRequest, postStudyNoticeRequest } from 'apis';
import {  PostStudyNoticeRequestDto } from 'apis/dto/request/studyService';

//          component: 방장 공지사항 관리 페이지          //
export default function HostNoticeManageModal() {


    //          state: 스터디 번호 path variable 상태          //
    const { studyNumber } = useParams();
    //           state : 공지사항  리스트  상태            //
    const [ noticeList, setNoticeList ] = useState<StudyNoticeListItem[]>([]);
    //          state: cookie 상태          //
    const [cookies, setCookie]  = useCookies();  
    //          state: 공지사항 글 상태          //
    const [notice, setNotice] = useState<string>('');
    //          state: 공지사항 textarea 참조 상태          //
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    //          state : Host Notice 모달 상태                       //
    const [hostNoticeModelOpen, setHostNoticeModelOpen] = useState(false);

    //            function: 네비게이트 함수          //
    const navigator  = useNavigate();

    //           function: get study notice list response 처리 함수          //
      const getStudyNoticeListResponse = ( responseBody : GetStudyNoticeListResponseDto | ResponseDto) =>{
        const { code } = responseBody;
        if(code === 'NU') alert('존재하지 않는 유저입니다.');
        if(code === 'NS') alert('존재하지 않는 스터디입니다.');
        if(code === 'DBE') alert('데이터베이스 오류입니다.');
        if(code !== 'SU'){ 
          navigator(MAIN_PATH);
          return;      
        }

        const {noticeList}  = responseBody as GetStudyNoticeListResponseDto;
        setNoticeList(noticeList);
      }

    //           function: post study notice list response 처리 함수          //
    const postStudyNoticeResponse = ( code: string) =>{
        if(code === 'NU') alert('존재하지 않는 유저입니다.');
        if(code === 'NS') alert('존재하지 않는 스터디입니다.');
        if(code === 'DBE') alert('데이터베이스 오류입니다.');
        if(code !== 'SU'){ 
          navigator(MAIN_PATH);
          return;      
        }

        const accessToken = cookies.accessToken;
        if (!accessToken) {
          alert('로그인이 필요합니다.');
          return;
        }
        setNotice('');
        if(!studyNumber) return;
        getStudyNoticeListRequest(studyNumber,accessToken).then(getStudyNoticeListResponse);
    }   
    


    //           event handler: 공지사항 작성 버튼 클릭 이벤트 처리          //
    const onCommentButtonClickHandler = () =>{
        const accessToken = cookies.accessToken;
        if (!accessToken) {
          alert('로그인이 필요합니다.');
          return;
        }
        
        if(!studyNumber) return;

        const requestBody :PostStudyNoticeRequestDto = {
            studyNoticeContent : notice
        };
        
        postStudyNoticeRequest(requestBody,studyNumber,accessToken).then(postStudyNoticeResponse);
    }



    //           event handler: 공지사항 글 변경 이벤트 처리          //
    const onNoticeChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const notice = event.target.value;
        setNotice(notice);
        // description: textarea 내용이 바뀔때마다 높이 변경 //
        if (!textareaRef.current) return;
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    } 
    
    //          event handler: 모달 토글 클릭 이벤트 처리          //
    const toggleModal = () =>{
        setHostNoticeModelOpen(!hostNoticeModelOpen);
    }


    
    //           effect : 방 번호  path variable이 바뀔때 마다 공지사항 및 투두리스트 및 자료 코멘트 불러오기             //
    useEffect(()=>{
        const accessToken = cookies.accessToken;
        if (!accessToken) {
        alert('존재하지 않는 유저입니다.');
        return;
        }

        if(!studyNumber){
        alert('잘못된 접근입니다.');
        navigator(MAIN_PATH);
        return;
        }
        getStudyNoticeListRequest(studyNumber,accessToken).then(getStudyNoticeListResponse);
        
    },[])    

    //          render : 방장 공지사항  모달 렌더링          //
    return (
        <div id='notice-host-modal'>
            <div className='notice-card'>
                <div className='notice-button-box'>
                    <button type='button' className='modal-close-button' onClick={toggleModal}>X</button>
                </div>
                <div className='notice-title-box'>
                    <div className='notice-title'>{'공지사항'}</div>
                </div>
                <div className='notice-write-box'>
                    <div className='notice-write-name'>{'공지사항'}</div>
                    <div className='notice-write-input-box'>
                        <textarea ref={textareaRef}  className='notice-write-input' placeholder='공지사항을 입력해주세요.' value={notice} onChange={onNoticeChangeHandler}/>
                    </div>
                    <button className='notice-write-plus-box' onClick={onCommentButtonClickHandler}>{'추가'}</button>
                </div>
                <div className='notice-content-box'>
                    <div className='notice-contents-left-box'>
                    <Scrollbars
                            renderTrackVertical={(props) => <div {...props} className='notice-track-vertical' />} 
                            renderThumbVertical={(props) => <div {...props} className='notice-thumb-vertical' />}>
                        {noticeList.map((noticeItem, index) => (
                            <HostNoticeItem key={noticeItem.studyNoticeNumber} noticeItem={noticeItem}  />
                        ))}
                    </Scrollbars>
                    </div>
                </div>
            </div>
        </div>
    );
}
