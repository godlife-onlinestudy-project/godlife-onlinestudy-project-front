
import { StudyUserListItem } from 'types';
import './style.css';
import DefaultProfileImage from 'assets/default-profile-image.png';

interface Props {
    userListItem  : StudyUserListItem;
}

export default function UserListItem({userListItem}: Props){
  
    //          state: Properties                               //
    const { studyNumber, userEmail, studyGrade,userProfileImageUrl,studyNickName} = userListItem;



  //          render: 참여 유저 리스트 아이템 컴포넌트 렌더링          //    
  return (
    <div className='user-wrapper'>
        <div className='user-hand-position'>
            <div className='user-hand-box'>
                <div className='user-hand'></div>
            </div>
        </div>
        <div className="user-top">
 
                <div className='user-top-image-default-box'></div>
          
        </div>
        <div className="user-bottom">
            <div className="user-bottom-grade-box" >
                {   studyGrade === '방장' ?
                (<div className='user-bottom-grade-king-image'></div>)
                :
                ( <div className='user-bottom-grade-normal-image'></div> )
                }
            </div>
            <div className="user-bottom-profile-box">
             <div className='comment-list-profile-image' style={{ backgroundImage: `url(${userProfileImageUrl ? userProfileImageUrl : DefaultProfileImage})` }}></div>
            </div>
            <div className="user-bottom-nickname">{studyNickName}</div>
        </div>
    </div>);
}