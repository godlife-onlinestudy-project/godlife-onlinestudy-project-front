import { StudyNoticeListItem } from 'types';
import './style.css';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { PatchStudyNoticeRequestDto } from 'apis/dto/request/studyService';
import { useCookies } from 'react-cookie';
import { MAIN_PATH } from 'constant';
import { useNavigate } from 'react-router-dom';
import { patchStudyNoticeRequest } from 'apis';

//          interface: 공지사항 리스트 아이템 컴포넌트 Props          //
interface Props {
    noticeItem: StudyNoticeListItem;
}

//          component: 방장 공지사항 리스트 아이템 컴포넌트          //
export default function HostNoticeItem({noticeItem} : Props){

  //          state: Properties          //
  const {studyNumber, studyNoticeNumber,studyNoticeContent} = noticeItem;
  //          state: 공지사항 리스트 textarea 참조 상태          //
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  //          state: 공지사항 리스트 상태              //
  const [notice, setNotice] = useState<string>(studyNoticeContent);
  //          state: 공지사항 textarea 수정 상태          //
  const [textareaEdit, setTextareaEdit] = useState<boolean>(false);
  //          state: cookie 상태          //
  const [cookies, setCookie]  = useCookies();

  //            function: 네비게이트 함수          //
  const navigator  = useNavigate();
  
  //           event handler: 공지사항 리스트 변경 이벤트 처리          //
  const onNoticeChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const comment = event.target.value;
    setNotice(comment);
  };

  //           event handler: 댓글 수정 버튼 클릭 이벤트 처리          //
  const onEditCommentsButtonClickHandler = () => {
    setTextareaEdit(!textareaEdit);
  };
  //           event handler: 댓글 삭제 버튼 클릭 이벤트 처리          //
  const onDeleteCommentsButtonClickHandler = () => {
    alert('삭제');
  };

  //           event handler: 공지사항 수정 버튼 클릭 이벤트 처리          //
  const onUpdateButtonClickHandler = () => {
    const accessToken = cookies.accessToken;
    if (!accessToken) {
      alert('로그인이 필요합니다.');
      return;
    }
    
    if(!studyNumber) return;
    
    const requestBody : PatchStudyNoticeRequestDto = {
        studyNoticeContent : notice
    }

    // patchStudyNoticeRequest(requestBody,studyNumber,accessToken).then(patchStudyNoticeResponse);

  }

    //           function: patch study notice list response 처리 함수          //
    const patchStudyNoticeResponse = (code : string ) =>{
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
   }
  
  //          effect: 공지사항 textarea의 높이를 동적으로 조절          //
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 스크롤 높이로 설정
    }
  }, [notice]);

  //          render: 공지사항 리스트 아이템 컴포넌트 렌더링          //  
  return (
    <div className='notice-list-item-box'>
      <div className='notice-list-item-top'>
        <div className='notice-list-item-icon-box'>
          <div className="notice-list-item-icon"></div>
        </div>
        {textareaEdit ? ( // 수정 모드일때
              <textarea
                  className={`notice-list-item-contents ${textareaEdit ? 'editing' : ''}`}
                  rows={1}
                  value={notice}
                  onChange={onNoticeChangeHandler}
                  ref={textareaRef}
              />
          ) : ( // 아닐 때
              <textarea
                  className='notice-list-item-contents'
                  rows={1}
                  value={notice}
                  onChange={onNoticeChangeHandler}
                  ref={textareaRef}
                  readOnly
              />
          )}
        <div className='notice-write-edit-icon-box'>
            <button
                className={`notice-write-edit-box ${textareaEdit ? 'editing' : ''}`}
                onClick={onEditCommentsButtonClickHandler}>
                {textareaEdit ? '완료' : '수정'}
            </button>
            <button className='notice-write-delete-box' onClick ={onDeleteCommentsButtonClickHandler}>{'삭제'}</button>
        </div>
      </div>
      <div className='notice-list-item-bottom'>
        <div className="notice-list-item-bottom-line"></div>
      </div>
    </div>
    );
}