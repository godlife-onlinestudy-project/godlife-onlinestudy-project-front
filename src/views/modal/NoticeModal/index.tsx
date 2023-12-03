import { StudyNoticeMock } from 'mocks';
import './style.css';

import { useState,  useEffect } from 'react';
import Scrollbars from 'react-custom-scrollbars-2';
import NoticeItem from 'components/NoticeItem';
import { StudyNoticeListItem } from 'types';
import { MAIN_PATH } from 'constant';
import { useNavigate, useParams } from 'react-router-dom';
import { GetStudyNoticeListResponseDto } from 'apis/dto/response/studyService';
import ResponseDto from 'apis/dto/response';
import { getStudyNoticeListRequest } from 'apis';
import { useCookies } from 'react-cookie';

//          component: 일반 유저 공지사항 페이지          //
const  NoticeModal = () => {

    //          state : 일반 Notice 모달 상태                       //
    const [noticeModelOpen, setNoticeModelOpen] = useState<boolean>(true);
    //           state : 공지사항  리스트  상태            //
    const [ noticeList, setNoticeList ] = useState<StudyNoticeListItem[]>([]);
    //          state: 스터디 번호 path variable 상태          //
    const { studyNumber } = useParams();
    //          state: cookie 상태          //
    const [cookies, setCookie]  = useCookies();  
            
    //          event handler: 모달 토글 클릭 이벤트 처리          //
    const toggleModal = () =>{
        setNoticeModelOpen(!noticeModelOpen);
    }
    
    //            function: 네비게이트 함수          //
    const navigator = useNavigate();
    
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

    },[]);

    //          render : 일반 유저 공지사항 페이지 렌더링          //
    return (
        <div id='notice-normal-modal'>
            <div className='notice-card'>
                <div className='notice-button-box'>
                    <button type='button' className='modal-close-button' onClick={toggleModal}>X</button>
                </div>
                <div className='notice-title-box'>
                    <div className='notice-title'>{'공지사항'}</div>
                </div>
                <div className='notice-common-content-box'>
                    <div className='notice-common-contents-left-box'>
                    <Scrollbars
                            renderTrackVertical={(props) => <div {...props} className='notice-track-vertical' />} 
                            renderThumbVertical={(props) => <div {...props} className='notice-thumb-vertical' />}>
                        {noticeList.map((noticeItem) => (
                            <NoticeItem key={noticeItem.studyNoticeNumber} noticeItem={noticeItem} />
                        ))}
                    </Scrollbars>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NoticeModal;