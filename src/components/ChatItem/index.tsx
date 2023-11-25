import DefaultProfileImage from 'assets/default-user-icon.png';
import './style.css';
import  dayjs from 'dayjs';
import { StudyChatListItem } from 'types';

interface Props{
    studyChatItem : StudyChatListItem;
}

export default function StudyChatItem({studyChatItem} : Props){
  
    //          state: Properties          //
    const {studyNumber, userEmail,userProfileImageUrl,userGrade,userNickName} = studyChatItem;
    const {studyChatContents,studyChatDatetime } = studyChatItem;

    //      function : 작성일 경과 시간 함수           //
    const getElapsedTime = () =>{
        const now = dayjs().add(9, 'hour');
        const writeTime = dayjs(studyChatDatetime);
        
        const gap = now.diff(writeTime, 's');
        if(gap < 60) return `${gap}초 전`;
        if(gap < 3600) return `${ Math.floor(gap/60)}분 전`;
        if(gap < 864000) return `${ Math.floor(gap/3600)}시간 전`;
        return `${ Math.floor(gap/86400)}일 전`;
    };

  //          render: 채팅 리스트 아이템 컴포넌트 렌더링          //  
  return (
    <div className='chat-list-item-box'>
        <div className='chat-list-item-top'>
            <div className='chat-list-class-image-box'>
                { userGrade === '방장' ? (
                    <div className='comment-list-class-king-image'></div>
                    )
                    :(
                        <div className='comment-list-class-normal-image'></div>
                    )
                }
            </div>
            <div className="chat-list-profile-image-box"  >
                <div className='chat-list-profile-image' style={{ backgroundImage: `url(${userProfileImageUrl ? userProfileImageUrl : DefaultProfileImage})` }}></div>
            </div>
            <div className="chat-list-user-nickname">{userNickName}</div>
        </div>
        <div className='chat-list-item-middle'>
            <div className='chat-list-item-contents'>{studyChatContents}</div>
        </div>
        <div className='chat-list-item-bottom'>
            <div className="comment-list-item-time">{getElapsedTime()}</div>
        </div>
    </div>
    );
}