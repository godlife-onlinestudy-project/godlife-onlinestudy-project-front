import React, { useState } from "react";
import './style.css';
import { MyToDoItem } from "../../types";
import { useNavigate } from "react-router-dom";
import { accessTokenMock, myToDoListMock } from "../../mocks";
import { PatchUserToDoListResponseDto } from "apis/dto/response/user";
import ResponseDto from "apis/dto/response";
import { patchUserToDoListRequest } from "apis";
import { PatchUserToDoListRequestDto } from "apis/dto/request";

//              interface: 나의 투두 리스트 아이템 컴포넌트 Props               //
interface Props {
    myToDoItem: MyToDoItem;
    index: number;
    listNumber: number;
    listDate: string;
}

//              component: 나의 투두 리스트 아이템 컴포넌트             //
export default function MyToDoListItem({ myToDoItem, index, listNumber, listDate }: Props) {

    //              state: Properties               //
    const { userListNumber, userListContent, userListCheck } = myToDoItem;

    //              state: 체크박스 선택 상태               //
    const [isChecked, setIsChecked] = useState<boolean>(userListCheck);

    //        function: patch user to do list response 처리 함수        //
    const patchUserToDoListResponse = (code: string) => {
      if (code === 'DBE') alert('데이터베이스 오류입니다.');
      if (code === 'NUTDL') alert('리스트 오류입니다.');
      if (code !== 'SU') return;
    }

    //        event handler: 유저 투두리스트 체크 버튼 클릭 이벤트 처리        //
    const onUserToDoListCheckButtonClickHandler = async () => {
      const requestBody: PatchUserToDoListRequestDto = {
        userListCheck: isChecked ? 0 : 1
      }
      patchUserToDoListRequest(requestBody, listDate, userListNumber, accessTokenMock).then(patchUserToDoListResponse);
      setIsChecked(!isChecked)
    }

    //              render: 나의 투두리스트 아이템 컴포넌트 렌더링             //
    return (
        <div className={listNumber === index ? 'main-top-down-todolist-detail-rast' : 'main-top-down-todolist-detail'} key={userListNumber}>
            <div className='main-top-down-todolist-check-icon-box' onClick={onUserToDoListCheckButtonClickHandler}>
                <div className={isChecked ? 'todolist-check-icon' : 'todolist-non-check-icon'}></div>
            </div>
            <div className={isChecked ? 'main-top-down-todolist-detail-text-ok' : 'main-top-down-todolist-detail-text'}>
                <div className='main-top-down-todolist-detail-textvalue'>{userListContent}</div>
            </div>
        </div>
    );
}