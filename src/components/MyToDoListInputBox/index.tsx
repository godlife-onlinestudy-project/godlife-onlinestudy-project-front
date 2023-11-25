import React, { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, forwardRef } from 'react';
import './style.css';

//          interface: MyToDoListInputBox 컴포넌트 Props          //
interface Props {
  type: 'text';
  placeholder: string;
  value: string;
  setValue:Dispatch<SetStateAction<string>>;
  disabled?: boolean;
}

//          component: MyToDoListInputBox 컴포넌트            //
const MyToDoListInputBox = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {

    //          state: Properties           //
    const { type, placeholder, value, setValue, disabled } = props;

    //          event handler: MyToDoListInput 값 변경 이벤트 처리            //
    const onInputValueChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setValue(value);
    }

    //          render: MyToDoListInputBox 렌더링         //
    return (
        <div className='my-todolist-inputbox'>
            <div className='my-todolist-inputbox-container'>
                <input ref={ref} className='my-todolist-input' type={type} placeholder={placeholder} value={value} onChange={onInputValueChangeHandler} disabled={disabled} />
            </div>
        </div>
    );
});

export default MyToDoListInputBox;
