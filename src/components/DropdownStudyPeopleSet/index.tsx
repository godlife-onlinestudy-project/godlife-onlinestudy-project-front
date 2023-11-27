import React, { useRef, useState, useEffect } from 'react';
import './style.css';
import Scrollbars from 'react-custom-scrollbars-2';

interface Props {
    onPeopleSetChange: (item: string) => void;
}

//          component: DropDown 스터디 인원 설정 컴포넌트          //
const DropDownStudyPeopleSet = ({ onPeopleSetChange }: Props) => {
    //          state: 박스 상태          //
    const [isOpen, setIsOpen] = useState(false);
    //          state: 박스 선택 상태          //
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    //          state: 박스 드롭다운 ref 상태          //
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    //          event handler: 인원 설정 클릭 이벤트 처리          //
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    //          function: 박스 항목 선택 호출 함수          //
    const selectItem = (item: string) => {
        setSelectedItem(item);
        setIsOpen(false);
        onPeopleSetChange(item);
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

    const items = [];
    for (let i = 1; i <= 20; i++) {
        items.push(`${i}명`);
    }

    //          render: DropDown 스터디 인원 설정 렌더링          //
    return (
        <div ref={dropdownRef} className='dropdown-study-people-set-box'>
            <div className={`dropdown-study-people-set-header ${selectedItem ? 'selected' : ''}`} onClick={toggleDropdown}>
                {selectedItem ? selectedItem : '스터디 참여 인원을 선택해주세요.'}
            </div>
            <div className='dropdown-people-set-down-icon-box'>
                <div className='dropdown-people-set-down-icon'></div>
            </div>
            {isOpen && (
                <div className='dropdown-study-people-set-list'>
                    <Scrollbars 
                        renderTrackVertical={(props) => <div {...props} className='track-people-set-vertical' />} 
                        renderThumbVertical={(props) => <div {...props} className='thumb-people-set-vertical' />}>
                        {items.map((item) => (
                            <div className='dropdown-study-people-set-list-index' key={item} onClick={() => selectItem(item)}>
                                {item}
                            </div>
                        ))}
                    </Scrollbars>
                </div>
            )}
        </div>
    );
};

export default DropDownStudyPeopleSet;
