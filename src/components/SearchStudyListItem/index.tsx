import React from "react";
import './style.css';
import { SearchStudyRoomItem } from "../../types";
import DefaultStudyCoverImage from "../../assets/study-default-icon.png";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { STUDYROOM_DETAIL_PATH } from "../../constant";

//        interface: 스터디 리스트 아이템 컴포넌트 Props        //
interface Props {
  searchStudyRoomItem: SearchStudyRoomItem;
}

//        component: 스터디 리스트 아이템 컴포넌트        //
export default function SearchStudyListItem({ searchStudyRoomItem }: Props) {

  //        state: Properties       //
  const { studyNumber, studyName, studyEndDate, studyPublicCheck, studyPersonal, studyCoverImageUrl, userCount } = searchStudyRoomItem;

  //          description: 날짜 변환          //
  const formattedDate = format(new Date(studyEndDate), 'yyyy년 MM월 dd일');

  //        function: 네비게이트 함수       //
  const navigator = useNavigate();

  //        event handler: 스터디 클릭 이벤트 처리 함수       //
  const onStudyClickHandler = () => {
    // navigator(STUDYROOM_DETAIL_PATH(studyNumber));
  }

  //        render: 스터디 리스트 아이템 컴포넌트 렌더링        //
  return (
    <div className='main-bottom-box-studyroom-data' onClick={onStudyClickHandler}>
      <div className='main-bottom-box-studyroom-deadline-time'>{`스터디 마감 시간 : ${formattedDate}`}</div>
      <div className='main-bottom-box-studyroom-picture-box'>
        <div className='main-bottom-box-studyroom-picture' style={{backgroundImage: `url(${studyCoverImageUrl ? studyCoverImageUrl : DefaultStudyCoverImage})` }}></div>
      </div>
      <div className="main-bottom-box-studyroom-box">

        <div className='main-bottom-box-studyroom-public-check'>{studyPublicCheck ? '공개' : '비공개'}</div>
        <div className='main-bottom-box-studyroom-participation-number'>{`스터디 참여자 수 : ${userCount} / ${studyPersonal}명`}</div>

      </div>
      <div className='main-bottom-box-studyroom-title'>{studyName}</div>
    </div>
  );
}