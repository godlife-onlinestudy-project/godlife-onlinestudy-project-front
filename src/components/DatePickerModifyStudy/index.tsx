import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import './style.css';

//          interface: 스터디 방 재설정 값 처리 Props          //
interface DatePickerModifyStudyComponentProps  {
  value: string;
  onChange: (date: string) => void;
}

//          component: 스터디 방 재설정 기간 설정 컴포넌트          //
const DatePickerModifyStudyComponent  = ({value, onChange} : DatePickerModifyStudyComponentProps) => {
  
    //          state: 스터디 선택 상태          //
    const [selectedDate, setSelectedDate] = useState(new Date());

    //          state: 스터디 종료일 상태          //
    const [endDate, setEndDate] = useState<Date | null>(null);  

    //          event handler: 종료일 이벤트 처리          //
    const endDateHandle = (date: Date | null) => {
      setEndDate(date);
      onChange(date ? date.toISOString().split('T')[0] : '');
    };

    //          effect: value가 변경될 때 selectedDate 업데이트          //
    useEffect(() => {
      if (value) {
        setEndDate(new Date(value));
      }
    }, [value]);

    //          render: 캘린더 컴포넌트 렌더링          //
    return (
    <div className='datepicker-modify-study-box'>
      <DatePicker className='modify-study-end-date' showPopperArrow={false} locale={ko} 
      selected={endDate} onChange={endDateHandle} closeOnScroll={true} minDate={selectedDate} dateFormat='yyyy. MM. dd' value={endDate?.toLocaleDateString('ko-KR')} />
    </div>
  );
}

export default DatePickerModifyStudyComponent;