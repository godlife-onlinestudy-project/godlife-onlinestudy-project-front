
import './style.css';
import { ChangeEvent, useRef, useState } from 'react';
import StudyNoticeListItem from 'types/study-notice.interface';
import { cutString } from 'utils';

interface Props {
    noticeItem: StudyNoticeListItem;
}

export default function NoticeItem({noticeItem} : Props){

  //          state: Properties                               //
  const {studyNumber, studyNoticeNumber,studyNoticeContent} = noticeItem;
  //          state: 공지사항 리스트 박스 상태         //
  const [showNoticelist, setShowNoticelist] = useState<boolean>(false); 
  //          state: 공지사항 리스트 textarea 참조 상태          //
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  //          state: 공지사항 리스트 상태              //
  const [notice, setNotice] = useState<string>(studyNoticeContent);


  //          render: 공지사항 리스트 아이템 컴포넌트 렌더링          //  
  return (
    <div className='notice-list-item-box'>
      <div className='notice-list-item-top'>
        <div className='notice-list-item-icon-box'>
          <div className="notice-list-item-icon"></div>
        </div>
        <input type="text" className='notice-list-item-contents' value = {cutString(notice,40)}/>
      </div>
      <div className='notice-list-item-bottom'>
        <div className="notice-list-item-bottom-line"></div>
      </div>
    </div>
    );
}