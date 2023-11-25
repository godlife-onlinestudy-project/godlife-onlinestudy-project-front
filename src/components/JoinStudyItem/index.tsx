import React from 'react';
import { JoinStudyListItem } from 'types';
import './style.css';

//           interface: 참여중인 스터디 리스트 아이템 컴포넌트 Props           //
interface Props {
  joinStudyItem: JoinStudyListItem;
}
//           component: 참여중인 스터디 리스트 아이템 컴포넌트           //
export default function JoinListItem({ joinStudyItem }: Props) {
  //           state: Properties           //
  const { title, category, authority, progress } = joinStudyItem;
  const { totalDays, joinDays, absentDays, lateDays } = joinStudyItem;
  //           render: 참여중인 스터디 리스트 아이템 컴포넌트 렌더링           //
  return (
    <div className='join-component-study-list-box'>
      <div className='study-title-box'>
        <div className='study-title-text'>{title}</div>
      </div>
      <div className='study-join-category-box'>
        <div className='study-category-text'>{category}</div>
      </div>
      <div className='study-authority-box'>
        <div className='study-authority-text'>{authority}</div>
      </div>
      <div className='study-progress-box'>
        <div className='study-progress-text'>{progress}</div>
      </div>
      <div className='study-total-day-box'>
        <div className='study-total-day-text'>{totalDays}</div>
      </div>
      <div className='study-join-day-box'>
        <div className='study-join-day-text'>{joinDays}</div>
      </div>
      <div className='study-absent-day-box'>
        <div className='study-absent-day-text'>{absentDays}</div>
      </div>
      <div className='study-late-day-box'>
        <div className='study-late-day-text'>{lateDays}</div>
      </div>
    </div>
  );
}
