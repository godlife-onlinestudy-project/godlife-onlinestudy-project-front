import './style.css';
import dayjs from 'dayjs';

import { useState, useRef, useEffect, ChangeEvent } from 'react';
import ModalSideMenu from 'components/ModalSideMenu';
import Scrollbars from 'react-custom-scrollbars-2';

export default function StudyDateModal() {
    //          state : 스터디 시간 미설정에 대한 오류 여부  상태          //
    const [timeError, setTimeError] = useState<boolean>(false);
    //          state: 박스 상태          //
    const [isOpen, setIsOpen] = useState(false);
    //          state : 스터디 날짜 선택 여부 상태          //
    const [isdateSelect, setIsDateSelect] = useState<boolean>(false);

    let InputError = false;

    //          event handler: 스터디 날짜 선택 이벤트 처리          //
    const onDateSelectClickHandler = () => {
        setIsOpen(!isOpen);
    };

    //          component: 스터디 경고 메시지 컴포넌트          //
    const StudyAlertCard = () => {
        //          state : 스터디 일정 에러 여부          //
        const [dateError, setDateError] = useState<boolean>(false);

        return (
            <div className='study-date-contents-box'>
                <div className='study-date-contents-icon'></div>
                {<div className='study-date-contents-message'>{'캘린더에서 다음 스터디 일정을 선택해주세요!'}</div>}
            </div>
        );
    };

    //          component : 시작 시간(hour) 선택 콤보 박스 컴포넌트          //
    const StartHourDropDownBox = () => {
        //          state: 박스 상태          //
        const [isOpen, setIsOpen] = useState(false);
        //          state: 박스 선택 상태          //
        const [selectedItem, setSelectedItem] = useState<string | null>(null);
        //          state: 박스 드롭다운 ref 상태          //
        const dropdownRef = useRef<HTMLDivElement | null>(null);

        //          event handler: 시작시간 박스  열기 클릭 이벤트 처리          //
        const toggleDropdownClickHandler = () => {
            setIsOpen(!isOpen);
        };

        //          function: 박스 항목 선택 호출 함수          //
        const selectItem = (item: string) => {
            setSelectedItem(item);
            setIsOpen(false);
        };

        //          effect: 박스가 아닌 다른 곳을 클릭하면 박스가 사라지게 하기          //
        useEffect(() => {
            function handleClickOutside(event: MouseEvent) {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                    setIsOpen(false);
                }
            }

            document.addEventListener('click', handleClickOutside);
            return () => {
                document.removeEventListener('click', handleClickOutside);
            };
        }, []);

        // description: 스터디 시작 시간(hour) 선택 항목 생성 //
        const items = [];
        for (let i = 0; i <= 11; i++) {
            items.push(`${i}`);
        }

        //          event handler: 스터디 시간 설정 변경 이벤트 처리          //
        const startHourChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            if (!event.target.value) {
                setTimeError(true);
                return;
            }
            const startHour = event.target.value;
            setSelectedItem(startHour);
        };

        if (selectedItem === null) {
            setTimeError(true);
        }

        //  event handler: 스터디 시작 시간 지정시 선택된 아이템 넣기     //
        // useEffect(()=>{
        //     if(selectedItem === null){
        //         setTimeError(true);
        //         return;
        //     }
        //     setSelectedItem(selectedItem);
        //     setTimeError(false);
        //     return;
        // },[selectedItem]);

        //          render: DropDown 스터디 시작 시간(hour) 설정 렌더링          //
        return (
            <div ref={dropdownRef} className='dropdown-study-time-set-box' onClick={toggleDropdownClickHandler}>
                <div className='study-hour-select' onChange={startHourChangeHandler}>
                    {selectedItem}
                </div>
                <div className='study-date-down-icon'></div>
                {isOpen && (
                    <div className='dropdown-study-time-set-list'>
                        <Scrollbars renderTrackVertical={(props) => <div {...props} className='track-time-set-vertical' />} renderThumbVertical={(props) => <div {...props} className='thumb-time-set-vertical' />}>
                            {items.map((item) => (
                                <div className='dropdown-study-time-set-list-index' key={item} onClick={() => selectItem(item)}>
                                    {item}
                                </div>
                            ))}
                        </Scrollbars>
                    </div>
                )}
            </div>
        );
    };

    //          component : 시작 분(minute) 선택 콤보 박스 컴포넌트          //
    const StartMinutesDropDownBox = () => {
        //          state: 박스 상태          //
        const [isOpen, setIsOpen] = useState(false);
        //          state: 박스 선택 상태          //
        const [selectedItem, setSelectedItem] = useState<string | null>(null);
        //          state: 박스 드롭다운 ref 상태          //
        const dropdownRef = useRef<HTMLDivElement | null>(null);

        if (selectedItem === null) {
            setTimeError(true);
        }

        //          event handler: 시작시간 박스  열기 클릭 이벤트 처리          //
        const toggleDropdownClickHandler = () => {
            setIsOpen(!isOpen);
        };

        //          function: 박스 항목 선택 호출 함수          //
        const selectItem = (item: string) => {
            setSelectedItem(item);
            setIsOpen(false);
        };

        if (selectedItem === null) {
            setTimeError(true);
        }

        //          effect: 박스가 아닌 다른 곳을 클릭하면 박스가 사라지게 하기          //
        useEffect(() => {
            function handleClickOutside(event: MouseEvent) {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                    setIsOpen(false);
                }
            }

            document.addEventListener('click', handleClickOutside);
            return () => {
                document.removeEventListener('click', handleClickOutside);
            };
        }, []);

        // description: 분 선택 항목 생성 //
        const items = [];
        for (let i = 0; i <= 59; i += 5) {
            // 숫자를 두 자리 문자열로 변환하고, 필요하면 앞에 0을 추가
            const formattedNumber = i < 10 ? `0${i}` : `${i}`;
            items.push(formattedNumber);
        }

        if (selectedItem === null) {
            setTimeError(true);
        }

        //          event handler: 스터디 시작 분(miniutes) 설정 클릭 이벤트 처리          //
        const startMinuteChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            if (!event.target.value) {
                setTimeError(true);
                return;
            }
            const startHour = event.target.value;
            setSelectedItem(startHour);
        };

        //          render: DropDown 스터디 시작 분(minutes) 설정 렌더링          //
        return (
            <div ref={dropdownRef} className='dropdown-study-time-set-box' onClick={toggleDropdownClickHandler}>
                <div className='study-hour-select' onChange={startMinuteChangeHandler}>
                    {selectedItem}
                </div>
                <div className='study-date-down-icon'></div>
                {isOpen && (
                    <div className='dropdown-study-time-set-list'>
                        <Scrollbars renderTrackVertical={(props) => <div {...props} className='track-time-set-vertical' />} renderThumbVertical={(props) => <div {...props} className='thumb-time-set-vertical' />}>
                            {items.map((item) => (
                                <div className='dropdown-study-time-set-list-index' key={item} onClick={() => selectItem(item)}>
                                    {item}
                                </div>
                            ))}
                        </Scrollbars>
                    </div>
                )}
            </div>
        );
    };

    //          component :  시작 시점 콤보 박스 컴포넌트          //
    const StartTimeComboBox = () => {
        //          state: 스터디 시작 시간 버튼 여부          //
        const [isClicked, setIsClicked] = useState(false);
        //          state: 스터디 시작 시간 상태          //
        const [startHour, setStartHour] = useState<number>();
        //          state: 시간 설정에 대한 오류 체크 상태         //
        const [startHourSelectError, setStartHourSelectError] = useState<boolean>(false);

        //          event handler: 시작 시간 선택여부 처리          //
        const handleClickHandler = () => {
            if (startHour === null) return;
            setIsClicked(!isClicked);
        };

        // render : //
        return (
            <div className='study-box-wrapper'>
                <StartHourDropDownBox />
                <div className='division'>{':'}</div>
                <StartMinutesDropDownBox />
            </div>
        );
    };

    //          component: 종료 시간(hour) 선택 콤보 박스 컴포넌트          //
    const EndHourDropDownBox = () => {
        //          state: 박스 상태          //
        const [isOpen, setIsOpen] = useState(false);
        //          state: 박스 선택 상태          //
        const [selectedItem, setSelectedItem] = useState<string | null>(null);
        //          state: 박스 드롭다운 ref 상태          //
        const dropdownRef = useRef<HTMLDivElement | null>(null);

        if (selectedItem === null) {
            setTimeError(true);
        }

        //          event handler: 시작시간 박스  열기 클릭 이벤트 처리          //
        const toggleDropdownClickHandler = () => {
            setIsOpen(!isOpen);
        };

        //          function: 박스 항목 선택 호출 함수          //
        const selectItem = (item: string) => {
            setSelectedItem(item);
            setIsOpen(false);
        };

        //          effect: 박스가 아닌 다른 곳을 클릭하면 박스가 사라지게 하기          //
        useEffect(() => {
            function handleClickOutside(event: MouseEvent) {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                    setIsOpen(false);
                }
            }

            document.addEventListener('click', handleClickOutside);
            return () => {
                document.removeEventListener('click', handleClickOutside);
            };
        }, []);

        // description: 시간(hour) 선택 항목 생성 //
        const items = [];
        for (let i = 0; i <= 11; i++) {
            items.push(`${i}`);
        }

        //          event handler: 종료 시간(hour) 설정 클릭 이벤트 처리          //
        const startHourChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            if (!event.target.value) {
                setTimeError(true);
                return;
            }
            const startHour = event.target.value;
            setSelectedItem(startHour);
        };

        //          render: DropDown 스터디 종료 시간(hour) 설정 렌더링          //
        return (
            <div ref={dropdownRef} className='dropdown-study-time-set-box' onClick={toggleDropdownClickHandler}>
                <div className='study-hour-select' onChange={startHourChangeHandler}>
                    {selectedItem}
                </div>
                <div className='study-date-down-icon'></div>
                {isOpen && (
                    <div className='dropdown-study-time-set-list'>
                        <Scrollbars renderTrackVertical={(props) => <div {...props} className='track-time-set-vertical' />} renderThumbVertical={(props) => <div {...props} className='thumb-time-set-vertical' />}>
                            {items.map((item) => (
                                <div className='dropdown-study-time-set-list-index' key={item} onClick={() => selectItem(item)}>
                                    {item}
                                </div>
                            ))}
                        </Scrollbars>
                    </div>
                )}
            </div>
        );
    };

    //          component : 종료 분(minutes) 선택 콤보 박스 컴포넌트          //
    const EndMinutesDropDownBox = () => {
        //          state: 박스 상태          //
        const [isOpen, setIsOpen] = useState(false);
        //          state: 박스 선택 상태          //
        const [selectedItem, setSelectedItem] = useState<string | null>(null);
        //          state: 박스 드롭다운 ref 상태          //
        const dropdownRef = useRef<HTMLDivElement | null>(null);

        if (selectedItem === null) {
            setTimeError(true);
        }

        //          event handler: 시작시간 박스  열기 클릭 이벤트 처리          //
        const toggleDropdownClickHandler = () => {
            setIsOpen(!isOpen);
        };

        //          function: 박스 항목 선택 호출 함수          //
        const selectItem = (item: string) => {
            setSelectedItem(item);
            setIsOpen(false);
        };

        //          effect: 박스가 아닌 다른 곳을 클릭하면 박스가 사라지게 하기          //
        useEffect(() => {
            function handleClickOutside(event: MouseEvent) {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                    setIsOpen(false);
                }
            }

            document.addEventListener('click', handleClickOutside);
            return () => {
                document.removeEventListener('click', handleClickOutside);
            };
        }, []);

        // description:  분 선택 항목 생성 //
        const items = [];
        for (let i = 0; i <= 59; i += 5) {
            // 숫자를 두 자리 문자열로 변환하고, 필요하면 앞에 0을 추가
            const formattedNumber = i < 10 ? `0${i}` : `${i}`;
            items.push(formattedNumber);
        }

        //          event handler: 스터디 시작 분(miniutes) 설정 클릭 이벤트 처리          //
        const endMinuteChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            if (!event.target.value) {
                setTimeError(true);
                return;
            }
            const startHour = event.target.value;
            setSelectedItem(startHour);
        };

        //          render: DropDown 스터디 시작 분(minutes) 설정 렌더링          //
        return (
            <div ref={dropdownRef} className='dropdown-study-time-set-box' onClick={toggleDropdownClickHandler}>
                <div className='study-hour-select' onChange={endMinuteChangeHandler}>
                    {selectedItem}
                </div>
                <div className='study-date-down-icon'></div>
                {isOpen && (
                    <div className='dropdown-study-time-set-list'>
                        <Scrollbars 
                        renderTrackVertical={(props) => <div {...props} className='track-time-set-vertical' />} 
                        renderThumbVertical={(props) => <div {...props} className='thumb-time-set-vertical' />}>
                            {items.map((item) => (
                                <div className='dropdown-study-time-set-list-index' key={item} onClick={() => selectItem(item)}>
                                    {item}
                                </div>
                            ))}
                        </Scrollbars>
                    </div>
                )}
            </div>
        );
    };

    //          component : 종료 시점 선택 콤보 박스 컴포넌트          //
    const EndTimeComboBox = () => {
        const [isClicked, setIsClicked] = useState(false);

        const handleClickHandler = () => {
            setIsClicked(!isClicked);
        };

        //          state : 스터디 마지막 시간 상태          //
        const [endHour, setEneHour] = useState<number | null>();
        //          state : 스터디 마지막 분 상태          //
        const [endMinute, setEndMinute] = useState<number | null>();

        // render : //
        return (
            <div className='study-box-wrapper'>
                <EndHourDropDownBox />
                <div className='division'>{':'}</div>
                <EndMinutesDropDownBox />
            </div>
        );
    };

    //          component : 캘린더 설정 컴포넌트          //
    const CalendarCard = () => {
        // render : //
        return (
            <div className='study-date-set-box'>
                <div className='study-date-schedule'>{`스터디 일정 : 00 00 00`}</div>
                <div className='study-date-hour-box'>
                    <div className='study-date-hour-title'>{'스터디 시간: '}</div>
                    <StartTimeComboBox />
                    <div className='between'>{'~'}</div>
                    <EndTimeComboBox />
                </div>
            </div>
        );
    };

    //          event handler: 입력시 필요한 조건 충족 체크 이벤트 처리          //
    const onInputErrorCheckChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (timeError) {
            InputError = timeError;
            return;
        }
    };

    // render : 다음 스터디 일정 렌더링 //
    return (
        <div id='notice-wrapper'>
            <div className='notice-card'>
                <div className='notice-button-box'>
                    <button type='button' className='modal-close-button'>
                        X
                    </button>
                </div>
                <div className='room-box'>
                    <div className='room-name'>{'스터디 방 이름'}</div>
                    <div className='room-schedule'>{'스터디 일정'}</div>
                    <div className='room-date-set-box'>
                        <div className='room-date-control'></div>
                        <div className='room-date-contents'>
                            <div className='next-study-date'>{'다음스터디 날짜'}</div>
                            <div className='study-date-box'>
                                {
                                    <CalendarCard />
                                    // <StudyAlertCard/>
                                }
                            </div>
                            {InputError && <div className='study-hour-error'>{'스터디 시간을 지정해야 합니다.'}</div>}
                        </div>
                    </div>
                    <div className='insert-box' onChange={onInputErrorCheckChangeHandler}>{'입력하기'}</div>
                </div>
            </div>
        </div>
    );
}
