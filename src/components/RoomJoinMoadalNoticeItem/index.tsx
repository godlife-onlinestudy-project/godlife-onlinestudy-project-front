
import { StudyNoticeListItem } from '../../types';
import './style.css';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

//          interface: 공지사항 리스트 아이템 컴포넌트 Props          //
interface Props {
    noticeItem: StudyNoticeListItem;
}

//          component: 일반 유저 공지사항 리스트 아이템 컴포넌트          //
export default function RoomJoinModalNoticeItem({noticeItem} : Props){

  //          state: Properties          //
  const {studyNumber, studyNoticeNumber,studyNoticeContent} = noticeItem;
  //          state: 공지사항 리스트 textarea 참조 상태          //
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  //          state: 공지사항 리스트 상태          //
  const [notice, setNotice] = useState<string>('');

  //          effect: textarea의 높이를 동적으로 조절          //
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 스크롤 높이로 설정
    }
  }, [notice]);

  //          event handler: textarea 내용 변경 이벤트 처리          //
  const onNoticeChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const comment = event.target.value;
    setNotice(comment);
  };

  //          render: 공지사항 리스트 아이템 컴포넌트 렌더링          //  
  return (
    <div className='room-join-notice-list-item-box'>
        <div className='room-join-notice-list-item-icon-box'>
          <div className='room-join-notice-list-item-icon'></div>
        </div>
        <textarea 
         className='room-join-notice-common-list-item-contents'
         value = {notice}
         onChange={onNoticeChangeHandler}
         ref={textareaRef}
         rows={1}
         ></textarea>
    </div>
    );
}