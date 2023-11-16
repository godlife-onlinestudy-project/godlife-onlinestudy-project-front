import './style.css';
import {  StudyMaterialCommentListItem } from 'types';
import DefaultProfileImage from 'assets/default-profile-image.png';
import  dayjs from 'dayjs';
import { ChangeEvent, useState, useRef, KeyboardEvent, useEffect } from 'react';
import { MATERIAL_COMMENT_CHANGE_COMPLETE_MESSAGE } from 'constant';

interface Props {
    commentItem: StudyMaterialCommentListItem;
}
  
export default function CommentItem({ commentItem }: Props) {

    //          state: Properties          //
    const {studyNumber , studyMaterialNumber ,commentUserEmail,userProfileImageUrl} = commentItem;
    const { userGrade , userNickName ,materialComment } =  commentItem;
    const { writeDatetime} = commentItem;   

    //          state : 자료 코멘트 박스 보여주기 상태               //
    const [showCommentBox,setShowCommentBox] = useState<boolean>(false);
    //          state : 자료 코멘트 박스 색상 변경 상태  //
    const [backgroundColor,setBackgroundColor] = useState<string>('white');
    //          state: 댓글 상태              //
    const [comment, setComment] = useState<string>(materialComment);
    //          state: 댓글 textarea 참조 상태          //
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    //          state: 댓글 박스 상태         //
    const [showComments, setShowComments] = useState<boolean>(false);
    //          state  :       텍스트 상자 참조 상태         //
    const contentsTextAreaRef = useRef<HTMLTextAreaElement | null>(null);  
    //          state :         수정 여부    상태        //
    const [isModified, setIsModified] = useState(false);

      
    //      function : 작성일 경과 시간 함수           //
    const getElapsedTime = () =>{
        const now = dayjs().add(9, 'hour');
        const writeTime = dayjs(writeDatetime);
        
        const gap = now.diff(writeTime, 's');
        if(gap < 60) return `${gap}초 전`;
        if(gap < 3600) return `${ Math.floor(gap/60)}분 전`;
        if(gap < 864000) return `${ Math.floor(gap/3600)}시간 전`;
        return `${ Math.floor(gap/86400)}일 전`;
    };

    // event handler : 배경화면 변경하는 클릭 이벤트 처리       //
    const onBackGroundColorClickHandler = ( )=>{
        setShowCommentBox(!showCommentBox);
        if(!showCommentBox){
            const newColor = 'pink'; // 변경하고자 하는 배경 이미지 색상
            setBackgroundColor(newColor);
            return;
        }
        
        if(showCommentBox){
            const newColor = 'white'; // 변경하고자 하는 배경 이미지 색상
            setBackgroundColor(newColor);
            return;
        }
    }
  
    //          event handler: 댓글  박스 보기 클릭 이벤트 처리          //
    const onShowContentsClickHandler = () => {
        if(showComments || !contentsTextAreaRef.current ){
    
        }
        setShowComments(!showComments);
        return;
      }

    //          event handler: 댓글  작성 클릭 이벤트 처리          //
    const handleKeyDown  = (e : KeyboardEvent) =>{
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Prevent the default behavior of the Enter key
            // You can add your own custom logic here if needed
        }

        if(e.key === 'Enter' || isModified){
            alert(MATERIAL_COMMENT_CHANGE_COMPLETE_MESSAGE);
        }
    }
    
    //            event handler: 포커스 처리  이벤트 처리          //
    const handleFocus = () => {
        setIsModified(false);
      };

    //           event handler: 댓글 변경 이벤트 처리          //
    const onCommentChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        if(!showComments) return;
        const comment = event.target.value;
        setComment(comment);

        // description: textarea 내용이 바뀔때마다 높이 변경 //
        if (!textareaRef.current) return;
        console.log(textareaRef.current.scrollHeight);
        textareaRef.current.focus();
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        setIsModified(true);
    }

    //     effect : 댓글 작성시 값이 변경 되기         //
    useEffect(()=>{


    },[comment])
    
    //          render: 댓글 리스트 아이템 컴포넌트 렌더링          //
    return (
        <div className='comment-list-item-box' onClick={onBackGroundColorClickHandler} style={{backgroundColor}}>
            <div className='comment-list-item-top'>
                <div className='comment-list-class-image-box'>
                    
                    { userGrade === '방장' ? (
                        <div className='comment-list-class-king-image'></div>
                        )
                        :(
                            <div className='comment-list-class-normal-image'></div>
                        )
                    }
                </div>
                <div className="comment-list-profile-image-box"  >
                    <div className='comment-list-profile-image' style={{ backgroundImage: `url(${userProfileImageUrl ? userProfileImageUrl : DefaultProfileImage})` }}></div>
                </div>
                <div className="comment-list-user-nickname">{userNickName}</div>
                <div className="comment-list-edit-icon-box" onClick={onShowContentsClickHandler} >
                    {/* 코멘트 유저와 접속 유저 일치 여부 */}
                    {   commentUserEmail &&
                    <div className='comment-list-edit-icon' ></div>}
                </div>
            </div>
            <div className='comment-list-item-middle'>
                <textarea className='comment-list-item-contents'  onKeyDown={handleKeyDown} onFocus={handleFocus} onChange={onCommentChangeHandler} >{comment}</textarea>
            </div>
            <div className='comment-list-item-bottom'>
                <div className="comment-list-item-time">{getElapsedTime()}</div>
            </div>
        </div >
    )
}