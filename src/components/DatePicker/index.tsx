import React from 'react';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from "date-fns/esm/locale";
import './style.css';

//          interface: 캘린더 interface Props          //
interface Props {
    startDate: Date | null;
    endDate: Date | null;
    onStartDateChange: (date: Date) => void;
    onEndDateChange: (date: Date) => void;
}

//          component: 캘린더 컴포넌트          //
const DatePickerComponent = ({ startDate, endDate, onStartDateChange, onEndDateChange }: Props) => {
          
    // //          state: 스터디 시작일 상태          //
    // const [startDate, setstartDate] = useState<Date | null>(null);
    // //          state: 스터디 종료일 상태          //
    // const [endDate, setEndDate] = useState<Date | null>(null);

    //          event handler: 시작일 이벤트 처리          //
    const startDateHandle = (date: Date) => {
        console.log(date);
        onStartDateChange(date);
    };
    //          event handler: 종료일 이벤트 처리          //
    const endDateHandle = (date: Date) => {
        onEndDateChange(date);
    };

    //          render: 캘린더 컴포넌트 렌더링          //
    return (
        <div className='datepicker-box'>
            <div className='start-date-box'>
                <DatePicker className='start-date' showPopperArrow={false} locale={ko} 
                selected={startDate} onChange={startDateHandle} closeOnScroll={true} minDate={new Date()} dateFormat='yyyy년 MM월 dd일' dateFormatCalendar='yyyy년 MM월'
                placeholderText='스터디 시작일을 선택해주세요.' />
            </div>
            <div className='end-date-box'>
                <DatePicker className='end-date' showPopperArrow={false} locale={ko} 
                selected={endDate} onChange={endDateHandle} closeOnScroll={true} minDate={startDate} dateFormat='yyyy년 MM월 dd일' dateFormatCalendar='yyyy년 MM월' 
                placeholderText='스터디 종료일을 선택해주세요.' />
            </div>
        </div>
    );
};

export default DatePickerComponent;