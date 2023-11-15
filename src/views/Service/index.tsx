import { ChangeEvent, useEffect, useRef, useState, MouseEvent } from 'react';
import './style.css';
import { useNavigate, useParams } from 'react-router-dom';
import { ATTEND_CHECK_COMPLETE_MESSAGE, CHAT_INPUT_COMPLETE_MESSAGE, MATERIAL_COMMENT_CHANGE_COMPLETE_MESSAGE, MATERIAL_COMMENT_INPUT_COMPLETE_MESSAGE, SECTION_FIRST_MESSAGE, SECTION_LAST_MESSAGE } from 'constant';
import DefaultProfileImage from 'assets/default-profile-image.png';
import { MaterialListItem, StudyMaterialCommentListItem } from 'types';
import { StudyMaterialCommentListMock, StudyNoticeMock, StudyToDoListMock, StudyMaterialListMock ,StudyUserListMock} from 'mocks';

import CommentItem from 'components/CommentItem';

import ToDoItem from 'components/ServiceToDoListItem';
import NoticeItem from 'components/ServiceNoticeItem';

import { Scrollbars } from 'react-custom-scrollbars-2';
import StudyChatListMock from 'mocks/study-chat.mock';
import { useStudyStore } from 'stores';
import StudyChatItem from 'components/ChatItem';
import { useImagePagination } from 'hooks';




// TODO  사용자 권한, 코멘트유저 접속 유저 일치에 따른 수정아이콘 show  상태 , 코멘트 다중 삭제 가능, 손흔들기(유저 비교)

export default function Service( ) {

    //    state: 사이드 바 상태     //
    const [menu,setMenu] = useState<'notice'|'chat'>('chat');

    //          state:  스터디 이미지  상태           //
    // const fileInputRef = useRef<HTMLInputElement | null>(null);


    const {resetService} =  useStudyStore(); 

    //           state : 모달 상태                       //
    const [modelOpen, setModalOpen] = useState(false);
    // state : 모달 참조 상태  //
    const modalBackground = useRef();  

    //            function: 네비게이트 함수          //
    const navigate = useNavigate();

    //           event handler: 모달 열기 이벤트 처리          //
    const onModalOpenClickHandler = (event: MouseEvent<HTMLDivElement> ) =>{
      if(event.target === modalBackground.current){
        setModalOpen(false);
      }
    }

    //    event handler : 사이드바 메뉴 상태 변경 함수     //
    const onMenuClickHandler = () =>{
      if(menu ==='notice'){
        setMenu('chat');  
      }

      if(menu ==='chat'){
        setMenu('notice');  
      }
    }

    //          effect: 마운트 시 실행할 함수          //
    useEffect(() => {
      resetService();
    }, []);

    //          component: 진행 시간 카드 컴포넌트          //
    const ProgresTimeCard = () =>{

      //      render : 진행 시간 렌더링      //
      return(
        <div className="header-room-date-box">
          <div className='progress-time'>{`진행 시간: ${'00:00:00'}`}</div>
        </div>
      )

    }
    //          component: 헤더 카드 컴포넌트          //
    const Header = () =>{

      //           state : 스터디 방이름 상태            //
      const {studyName, setStudyName} = useStudyStore();

    //     render: 헤더 컴포넌트 렌더링          //
     return(
        <div className="service-header">
          <div className="logo-box">
            <div className="logo-icon-box"></div>
            <div className="logo-title">갓생살기</div>
          </div>
          <div className="header-center">
            <div className="header-room-title-box">
              <div className="header-room-title">{studyName}</div>
            </div>
            <ProgresTimeCard/>
          </div>
          <div className="header-end">
            <div className="header-setting">
              <div className="header-settings-icon"></div>
              <div className="header-setting-contents">설정</div>
            </div>
            <div className="header-exit">
              <div className="header-exit-icon"></div>
              {/* <button className={"header-exit-contents"} >나가기</button> */}
              <div className="header-exit-contents">나가기</div>
            </div>
          </div>
        </div>
      )
    }

    //          component: notice 카드 컴포넌트          //
    const NoticeCard = () =>{

      // state  :       텍스트 상자 참조 상태         //
      const contentsTextAreaRef = useRef<HTMLTextAreaElement | null>(null);
      // state :  스터디 방 번호 //
      const { studyNumber} = useParams();

      // state : 자료 코멘트 유저 글 상태           //
      const [materialCommentContent, setMaterialCommentContent] = useState<string>('');
      //        state: 조회하는 자료 번호 path variable 상태        //
      const [ materialNumber , setMaterialNumber ] = useState<number>(0);
      // state : 자료번호에     댓글 상태 //
      const [materialNumberList, setMaterialNumberList] = useState<StudyMaterialCommentListItem[]>([]); 
      //      state : 코멘트 보여주기 상태    //
      const [showComment, setShowComment] = useState<boolean>(false);
      //        state:  자료 개수 상태        //
      const [ count, setCount ] = useState<number>(0);
      //        state:  자료 댓글 상태        //
      const [materialComment, setMaterialComment] = useState<StudyMaterialCommentListItem[]>([]);


      //          event handler: 자료 댓글  변경 이벤트 처리          //
      const onContentsChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        if(!showComment) return;
        if (!contentsTextAreaRef.current) return;
        const commentContent = event.target.value;
        setMaterialCommentContent(commentContent);
        console.log(contentsTextAreaRef.current.scrollHeight);
        contentsTextAreaRef.current.focus();
        contentsTextAreaRef.current.style.height = 'auto';
        contentsTextAreaRef.current.style.height = `${contentsTextAreaRef.current.scrollHeight}px`;
 
      }

      //          event handler: 자료 댓글  클릭 이벤트 처리          //
      const onContentsClickHandler = () => {
        setShowComment(!showComment);
        
      }

      //          event handler: 댓글  삭제 버튼 클릭 이벤트 처리          //
      const onCommentCloseHandler = (deleteIndex: number) =>{
          // div 박스 삭제
          const newComments = materialComment.filter((url, index) => index !== deleteIndex);
          setMaterialComment(newComments);
      }
  
      //          event handler: 키 프레스 클릭 이벤트 처리          //
      const onKeyPress = (event: any) => {
        if (event.key === "Enter") {
          // 엔터키를 누르면 값을 저장합니다.
          setMaterialCommentContent(materialCommentContent);
          alert(MATERIAL_COMMENT_INPUT_COMPLETE_MESSAGE);
          // 텍스트 박스를 초기화합니다.
          setMaterialCommentContent("");
        }        
      }

      // effect : 컴포넌트 마운트 시 마다 자료번호마다 댓글 리스트 불러오기 // 
      useEffect( ()=>{

        // TODO: API 호출로 변경
        setMaterialNumberList(StudyMaterialCommentListMock);
      },[materialNumber])
      
      // effect : 조회하는 스터디 자료번호 변경될 때 마다 변경되는 함수 // 
      useEffect( ()=>{
        setCount(StudyMaterialCommentListMock.length);
        setMaterialNumberList(StudyMaterialCommentListMock);

      },[materialNumber])
      
      //    render : 알림 화면 렌더링    //
      return(
        <div className="side-bar">
          <div className="alert-box">
            <div className="alert-title-1" onClick={onMenuClickHandler}>알림</div>
            
            <div className="alert-message-1" onClick={onMenuClickHandler}>채팅</div>
          
          </div>  
          <div className="notice-box">
            <div className="notice-contents-box">
              <div className="notice-icon"></div>
              <div className="notice-title">공지사항</div>
            </div>
            <div className="notice-message">
                <Scrollbars renderTrackVertical={(props) => <div {...props} className='track-vertical' />} renderThumbVertical={(props) => <div {...props} className='thumb-vertical' />}> 
                  {StudyNoticeMock.map((noticeListItem,index)=>
                    <NoticeItem  noticeItem = {noticeListItem}/>
                  )}
                </Scrollbars>
            </div>
          </div>
          <div className="list-box">
            <div className="list-contents-box">
              <div className="list-icon"></div>
              <div className="list-title">{'Study TO DO List'}</div>
            </div>
            <div className="list-message" >
              <Scrollbars renderTrackVertical={(props) => <div {...props} className='track-vertical' />} renderThumbVertical={(props) => <div {...props} className='thumb-vertical' />}>
                { StudyToDoListMock.map( (todoListItem,index) =>
                  <ToDoItem studyToDoItem ={todoListItem} />
                )}
              </Scrollbars>
            </div>  
          </div>
          <div className="comment-box">
            <div className="comment-contents-box">
              <div className="comment-icon"></div>
              <div className="comment-title">{`0번 자료 코멘트`}</div>
              {/* host authorization   */}
              <div className="delete-icon" ></div>
              {/* guest */}            
            </div>
            <div className="comment-list">  
              <div className="comment-record-box">
                <Scrollbars 
                renderTrackVertical={(props) => <div {...props} className='comment-track-vertical' />} 
                renderThumbVertical={(props) => <div {...props} className='comment-thumb-vertical' />}>
                  {StudyMaterialCommentListMock.map(( commentListItem, index ) => (
                    <CommentItem key={commentListItem.studyNumber} commentItem={commentListItem} />
                  ))}
                </Scrollbars>
              </div>
            </div>
            <div className='comment-write-box'> 
              <textarea ref={contentsTextAreaRef} className='comment-write' value={materialCommentContent} spellCheck={false} onKeyPress={onKeyPress}   onClick={onContentsClickHandler} onChange={onContentsChangeHandler}></textarea>
            </div> 
          </div>
      </div>
      );
    }

    //          component: chat 카드 컴포넌트          //
    const ChatCard = () =>{

      const contentsTextAreaRef = useRef<HTMLTextAreaElement | null>(null);
      //        state : 채팅 내용 상태        //
      const [chatContents, setChatContents] = useState<string>('');
      //        state : 채팅 보여주기 상태        //
      const [showChat, setShowChat] = useState<boolean>(false);

      //          event handler: 댓글   클릭 이벤트 처리          //Chat
      const onContentsClickhandler = () => {
        setShowChat(!showChat);
        if(showChat || !contentsTextAreaRef.current ){
          return;
        }
        if(!showChat){
          alert(CHAT_INPUT_COMPLETE_MESSAGE);
        }
      }

      //          event handler: 내용 변경 이벤트 처리          //
      const onContentsChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const content = event.target.value;
        setChatContents(content);
        if (!contentsTextAreaRef.current) return;
        console.log(contentsTextAreaRef.current.scrollHeight);
        contentsTextAreaRef.current.focus();
        contentsTextAreaRef.current.style.height = 'auto';
        contentsTextAreaRef.current.style.height = `${contentsTextAreaRef.current.scrollHeight}px`;
        
        // TODO : 엔터 시 수정완료 및 코멘트 상자 활성화 해제
        onContentsClickhandler();
    
      }

      //          event handler: 키 프레스 클릭 이벤트 처리          //
      const onKeyPress = (event: any) => {
        if (event.key === "Enter") {
          // 엔터키를 누르면 값을 저장합니다.
          setChatContents(chatContents);
          alert(CHAT_INPUT_COMPLETE_MESSAGE);
          // 텍스트 박스를 초기화합니다.
          setChatContents("");
        }        
      }

      //        render :  chat 화면 랜더링      //
      return(
        <div className="side-bar">
          <div className="alert-box">
            <div className="alert-title-2" onClick={onMenuClickHandler}>알림</div>
            <div className="alert-message-2 onClick={onMenuClickHandler}">채팅</div>
          </div>  
          <div className="chat-box">
            <div className="comment-chat-box">
              <Scrollbars renderTrackVertical={(props) => <div {...props} className='track-vertical' />} 
              renderThumbVertical={(props) => <div {...props} className='thumb-vertical' />}>
                {StudyChatListMock.map((chatListItem)=> (
                  <StudyChatItem key =  {chatListItem.studyNumber}  studyChatItem = {chatListItem} />
                ))}
              </Scrollbars>
            </div>
            <div className='chat-write-box'>
              <textarea ref={contentsTextAreaRef} className='chat-write'  spellCheck={false} value={chatContents} onKeyPress={onKeyPress} onClick={onContentsClickhandler} onChange={onContentsChangeHandler} />
            </div>
          </div>  
          <div >
          </div>              
        </div>
      );
    }

    //          component: 자료 콘테이너 카드 컴포넌트           //
    const MaterialCard = ( )=>{

      const [viewImage, setViewImage] = useState<string>('');

      //          component: 자료 이미지 내용 컴포넌트           //
      const MaterialContents = () =>{

        //          state: 자료 이미지 상태                 //
        const {materialImageList,setMaterialImageList} = useImagePagination<MaterialListItem>();

        // effect : 컴포넌트 마운트 시 마다 자료 정보 리스트 불러오기 // 
        useEffect(() => {
          const imageMaterialList = StudyMaterialListMock.map(item => item.studyMaterialImageUrl);
          setMaterialImageList(imageMaterialList);
        }, [materialImageList]);

        //   render : 자료 이미지 내용 컴포넌트  렌더링       //
        return(
          <div className="study-image-material-box">
            <div className="study-image-material" >
              {/* <input ref = {fileInputRef} type="file" src={materialImageList[currentPageNumber]} accept='image/*' style={{display : 'none'}}  /> */}
              <img src={viewImage} alt=""className='study-image-material' />
            </div>
          </div>
        )
      } 
    
      //          component: 자료 이미지 리스트  컴포넌트           //
      const MaterialImageList = ( ) =>{

        //          state :       스터디 방 상태          //
        
        //          state: 댓글 리스트 페이지네이션 상태            //
        const {currentPageNumber,materialImageList, setMaterialImageList, setCurrentPageNumber, currentSectionNumber, setCurrentSectionNumber, viewImageList,totalSection } = useImagePagination<MaterialListItem[]>();
        //          state: 이미지 인풋 ref 상태           //
        const imageRef = useRef<HTMLInputElement | null>(null);

        //          event handler: 다음 버튼 클릭 이벤트 처리          //
        const onNextButtonClickHandler = () => {
          if (currentSectionNumber === totalSection) {
            alert(SECTION_LAST_MESSAGE);
            return;
          }
          console.log(currentSectionNumber);
          console.log(totalSection);
          setCurrentPageNumber(currentSectionNumber * 6 + 1);
          setCurrentSectionNumber(currentSectionNumber + 1);
        }
        
        //          event handler: 이전 버튼 클릭 이벤트 처리          //
        const onPreviousButtonClickHandler = () => {
          if (currentSectionNumber === 1) {
              alert(SECTION_FIRST_MESSAGE);
              return;
          }
          console.log(currentSectionNumber);
          console.log(totalSection);
          setCurrentPageNumber((currentSectionNumber - 1) * 6);
          setCurrentSectionNumber(currentSectionNumber - 1);
        }    

        //           event handler: 자료관리 모달  이동 클릭 이벤트 처리          //
        const onMaterialModalClickHandler = () =>{
          // TODO : 자료관리 모달 이동
        }
        
        //          event handler: 자료  클릭 이벤트 처리          //
        const onMaterialClickHandler = (material: string) => {
          // 자료리스트에 리스트의 인덱스 찾기 및 인덱스 
          if(!material) return;
          const imageIndex  = materialImageList.indexOf(material);
          console.log(imageIndex);
          console.log(materialImageList[imageIndex]);
          setCurrentPageNumber(imageIndex);

          setViewImage(materialImageList[imageIndex]);
        }


        //          event handler: 자료  변경 이벤트 처리          //
        const onMaterialChangeHandler = (material: string, index:number) => {
          // 자료리스트에 리스트의 인덱스 찾기 및 인덱스 
          if(!material) return;
          const imageIndex  = materialImageList.indexOf(material);
          console.log(imageIndex);
          console.log(materialImageList[imageIndex]);
          setCurrentPageNumber(imageIndex);
        }

        //          event handler: 자료 이미지 닫기 버튼 클릭 이벤트 처리          //
        const onMaterialImageCloseHandler = ( deleteIndex: number )=>{
          if(!imageRef.current) return;


        }      

        // effect : 컴포넌트 마운트 시 마다 자료 정보 리스트 불러오기 // 
        useEffect(() => {
          const imageMaterialList = StudyMaterialListMock.map(item => item.studyMaterialImageUrl);
          setMaterialImageList(imageMaterialList);
        }, [materialImageList[currentPageNumber]]);

        //  effect : 임시 데이터를 렌더링할 때마다 studyimageUrl 상태 변수의 값을 업데이트 //
        useEffect(()=>{
          StudyMaterialListMock.map((material => material));

        },[]);

        //        render : 자료 이미지 리스트 컴포넌트 렌더링       //
        return(
          <div className="study-list-image-contents">
            <div className="left-arrow-box" onClick={onPreviousButtonClickHandler}>
              <div className="left-arrow"></div>
            </div>
            <div className='study-list-center'>
              <div className="study-list-box">
              {viewImageList.map((viewMaterialImage ,index ) => (

                  <div className= {viewMaterialImage ? 'study-material-image-box' : ''} key={index} onClick={()=>onMaterialClickHandler(viewMaterialImage)} onChange={()=>onMaterialChangeHandler(viewMaterialImage,index)}>
                    <img src={viewMaterialImage} alt="" className='study-material-image-box' />
                    <button className={'delete-button-box'} ></button>
                  </div>                 
              ))}
              </div>
              <div className="study-list-move-icon-box" onClick={onMaterialModalClickHandler} >
                <div className="study-list-move-icon"></div>
              </div>
            </div>
            <div className="right-arrow-box" onClick={onNextButtonClickHandler}>
              <div className="right-arrow"></div>
            </div>
          </div>
        )

      }
      
      //       render : 자료 콘테이너 렌더링          //
      return(
        <div className="study-image-container-info">
          <MaterialContents/>
          <MaterialImageList/>
        </div>
      )
    }

    //          component: 스터디 인원   콘테이너  컴포넌트           //
    const StudyMemberConteiner = () => {

      //       state :  접속 유저의 손 흔들기 상태       //
      const [isHandShake, setIsHandShake] = useState<boolean>(false);

      // TODO : 접속 유저와 일치 여부

      //          event handler: 손 흔들기  클릭 이벤트 처리          //
      const onHandActiveClickHandler = () =>{
        // TODO : 손 흔들기 상태  변경
        setIsHandShake(!isHandShake);

      }

      //          component: 스터디 인원  화면   컴포넌트           //
      const StudyMemberInfo = ( ) =>{


        //        render : 스터디 인원  화면 컴포넌트 렌더링       //
        return(
          <div className="study-info-memeber-info-box">
            <div className="study-info-memeber-info">
              <Scrollbars renderTrackVertical={(props) => <div {...props} className='track-vertical' />} renderThumbVertical={(props) => <div {...props} className='thumb-vertical' />}> 
              {StudyUserListMock.map((studyUserListItem, index) =>
                // <UserListItem userListItem = {studyUserListItem} /> 
                <div className='user-wrapper'>
                  { isHandShake &&
                    <div className='user-hand-position'>
                      <div className='user-hand-box'>
                        <div className='user-hand'></div>
                      </div>
                    </div>
                  }
                  <div className='user-top'>
                    <div>
                      <div className='user-top-image-default-box'></div>
                    </div>
                  </div>
                  <div className='user-bottom'>
                    <div className='user-bottom-grade-box'>
                      {
                        studyUserListItem.studyGrade === '방장'?
                        (<div className='user-bottom-grade-king-image'></div>)
                        :
                        (<div className='user-bottom-grade-normal-image'></div>)
                      }
                    </div>
                    <div className='user-bottom-profile-box'>
                        <div className='comment-list-profile-image' style={{ backgroundImage: `url(${studyUserListItem.studyProfileImageUrl ? studyUserListItem.studyProfileImageUrl : DefaultProfileImage})` }}></div>
                    </div>
                    <div className="user-bottom-nickname">{studyUserListItem.studyNickName}</div>
                  </div>
                </div>
              )}                
              </Scrollbars>
            </div>
          </div>
        )
      }  

      //          component :    스터디 인원  동작    컴포넌트           //
      const StudyMemberEvent = ( ) =>{
            
        //          event handler: 출석 체크 클릭 이벤트 처리          //
        const onAttendCheckClickHandler = ()=>{
          alert(ATTEND_CHECK_COMPLETE_MESSAGE);
        }     

        //        render : 스터디 인원  동작 컴포넌트 렌더링       //
        return(
          <div className="icon-box-list">
            <div className='check-icon-box' onClick={onAttendCheckClickHandler}>
              <div className="check-icon"></div>
              <div className="check-icon-title" >{'출석 체크 시작'}</div>
            </div>
            <div className="hand-icon-box">
              <div className="hand-icon"></div>
              <div className="hand-icon-title" onClick={onHandActiveClickHandler}>{'손흔들기'}</div>          
            </div>
          </div>
        )
      }

      return(
        <>
          <StudyMemberInfo/>
          <StudyMemberEvent/>
        </>
      )
    }  

  //        render : 서비스 페이지 렌더링       //
  return (
    <div id='service-wrapper'>
      <Header/>
      <div className="service-container">
        {menu === 'notice' && <NoticeCard/>}
        {menu === 'chat' && <ChatCard/>}
        <div className="service-contents">
          <MaterialCard/>
          <div className="study-list-contents-box">
            <StudyMemberConteiner/>  
          </div>
        </div>
      </div> 
    </div>
  )
}
