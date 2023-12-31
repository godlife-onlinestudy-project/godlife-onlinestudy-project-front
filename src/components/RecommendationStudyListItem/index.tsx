import React, {useState} from "react";
import './style.css';
import { RecommendationStudyRoomItem, SearchStudyRoomItem } from "../../types";
import DefaultStudyCoverImage from "../../assets/study-default-icon.png";
import { useNavigate } from "react-router-dom";
import { STUDYROOM_DETAIL_PATH } from "../../constant";
import { format } from "date-fns";
import ManinpagePublicStudyRoomJoinModal from "views/modal/MainpagePublicStudyRoomJoinModal";

//              interface: 추천 스터디 Top5 리스트 아이템 컴포넌트 Props               //
interface Props {
    recommendationStudyRoomItem: RecommendationStudyRoomItem
}

//              component: 추천 스터디 Top5 리스트 아이템 컴포넌트             //
export default function RecommendationStudyListItem({ recommendationStudyRoomItem }: Props) {

    //              state: Properties               //
    const { studyNumber, studyName, studyEndDate, studyPublicCheck, studyPersonal, studyCoverImageUrl, userCount } = recommendationStudyRoomItem;

    //          description: 날짜 변환          //
    const formattedDate = format(new Date(studyEndDate), 'yyyy년 MM월 dd일');
    
    //              state: 모달 오픈 상태               //
    const [showModal, setShowModal] = useState<boolean>(false);

    //              function: 네비게이트 함수               //
    const navigator = useNavigate();

    //        event handler: 추천 스터디 클릭 이벤트 처리 함수       //
    const onRecommendationStudyClickHandler = () => {
        setShowModal(true);
        // navigator(STUDYROOM_DETAIL_PATH(studyNumber));
    }

    //              render: 추천 스터디 Top5 리스트 아이템 컴포넌트 렌더링             //
    return (
      <>
      <div className='main-middle-box-studyroom-data' onClick={onRecommendationStudyClickHandler}>
        <div className='main-middle-box-studyroom-deadline-time'>{`스터디 마감 시간 : ${formattedDate}`}</div>
        <div className='main-middle-box-studyroom-picture-box'>
          <div className='main-middle-box-studyroom-picture' style={{backgroundImage: `url(${studyCoverImageUrl ? studyCoverImageUrl : DefaultStudyCoverImage})` }}></div>
        </div>
        <div className="main-middle-box-studyroom-box">
          <div className='main-middle-box-studyroom-public-check'>{studyPublicCheck ? '공개' : '비공개'}</div>
          <div className='main-middle-box-studyroom-participation-number'>{`스터디 참여자 수 : ${userCount} / ${studyPersonal}명`}</div>
        </div>
        <div className='main-middle-box-studyroom-title'>{studyName}</div>
      </div>
      {showModal && <ManinpagePublicStudyRoomJoinModal setShowModal={setShowModal} item={recommendationStudyRoomItem} />}
      </>
    );
}