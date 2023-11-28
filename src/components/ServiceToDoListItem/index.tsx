import { StudyTodoListItem } from 'types';
import './style.css';
import { ChangeEvent, useRef, useState } from "react";
import { cutString } from 'utils';


interface Props{
    studyToDoItem :  StudyTodoListItem;
}

export default function ToDoItem({studyToDoItem} : Props){
  
    
    //          state: Properties                               //
    const { studyListNumber,studyNumber, studyListContent, studyListCheck} = studyToDoItem;
    //          state: 투두 리스트 박스 상태         //
    const [showToDolist, setShowToDolist] = useState<boolean>(false);
    //          state: 투두 리스트 textarea 참조 상태          //
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    //          state: 투두 리스트 상태              //
    const [todoList, setTodoList] = useState<string>('');

    //           event handler: 투두 리스트 변경 이벤트 처리          //
    const onToDoChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {

        if(!setShowToDolist) return;    
        const comment = event.target.value;
        setTodoList(comment);

        // description: textarea 내용이 바뀔때마다 높이 변경 //
        if (!textareaRef.current) return;
        console.log(textareaRef.current.scrollHeight);
        textareaRef.current.focus();
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        alert('투두 리스트 수정완료');
    }

    //           event handler: 투두 리스트 박스 보기 버튼 클릭 이벤트 처리          //
    const onShowCommentsButtonClickHandler = () => {
        setShowToDolist(!showToDolist);
    }

  //          render: 투두 리스트 아이템 컴포넌트 렌더링          //  
  return (
    <div className="todo-list-item-box">
        <div className="todo-list-item-top">
            <div className="todo-list-item-icon-box">
                <div className="todo-list-item-icon"></div>
            </div>
            {/* <div className="todo-list-item-contents">cutString(studyListContent,40)</div> */}
            <input type="text" className="todo-list-item-contents" value = {cutString(studyListContent,40)} />
        </div>
        <div className="todo-list-item-bottom">
            <div className="todo-list-item-bottom-line"></div>
        </div>
    </div>
    );
}
