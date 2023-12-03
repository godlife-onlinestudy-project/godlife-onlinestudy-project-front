
import './style.css';

import { StudyNoticeListItem } from 'types';
import { cutString } from 'utils';

interface Props {
    noticeItem: StudyNoticeListItem;
}

export default function ServiceNoticeItem({noticeItem} : Props){

  //          state: Properties                               //
  const {studyNumber, studyNoticeNumber,studyNoticeContent} = noticeItem;

  

  


  //          render: 공지사항 리스트 아이템 컴포넌트 렌더링          //  
  return (
    <div className='notice-list-item-box'>
      <div className='notice-list-item-top'>
        <div className='notice-list-item-icon-box'>
          <div className="notice-list-item-icon"></div>
        </div>
        <input type="text" className='notice-list-item-contents' value = {cutString(studyNoticeContent,40) } readOnly/>
      </div>
      <div className='notice-list-item-bottom'>
        <div className="notice-list-item-bottom-line"></div>
      </div>
    </div>
    );
}