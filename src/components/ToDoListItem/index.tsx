import { StudyTodoListItem } from 'types';
import './style.css';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

//          interface: 투두 리스트 아이템 컴포넌트 Props          //
interface Props {
    studyToDoItem: StudyTodoListItem;
}

//          component: 일반 유저 투두 리스트 아이템 컴포넌트          //
export default function ToDoItem({ studyToDoItem }: Props) {
    //          state: Properties          //
    const { studyListNumber, studyNumber, studyListContent, studyListCheck } = studyToDoItem;
    //          state: 투두 리스트 textarea 참조 상태          //
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    //          state: 투두 리스트 상태              //
    const [todoList, setTodoList] = useState<string>(studyListContent);
    //          state: 투두 리스트 textarea 수정 상태          //
    const [textareaEdit, setTextareaEdit] = useState<boolean>(false);

    //           event handler: 투두 리스트 변경 이벤트 처리          //
    const onToDoChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const comment = event.target.value;
        setTodoList(comment);
    };

    //          effect: 투두 리스트 textarea의 높이를 동적으로 조절          //
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 스크롤 높이로 설정
        }
    }, [todoList]);

    //          render: 일반 유저 투두 리스트 아이템 컴포넌트 렌더링          //
    return (
        <div className='todo-list-item-box'>
            <div className='todo-list-item-top'>
                <div className='todo-list-item-icon-box'>
                    <div className='todo-list-item-icon'></div>
                </div>
                <textarea 
                className='todo-common-list-item-contents'
                value={todoList}
                onChange={onToDoChangeHandler}
                ref={textareaRef}
                rows={1}
                ></textarea>
            </div>
            <div className='todo-list-item-bottom'>
                <div className='todo-list-item-bottom-line'></div>
            </div>
        </div>
    );
}
