import React, { useRef, useState, useEffect } from 'react';
import './style.css';
import Scrollbars from 'react-custom-scrollbars-2';


//          interface: 방 재설정 카테고리 값 처리 Props          //
interface DropDownSignInCategoryPros  {
    value: string;
    onChange: (category: string) => void;
  }

//          component: DropDown 1관심 카테고리 컴포넌트          //
const DropDownSignInCategory = ({value, onChange}: DropDownSignInCategoryPros) => {
    //          state: 박스 상태          //
    const [isOpen, setIsOpen] = useState(false);
    //          state: 박스 선택 상태          //
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    //          state: 박스 드롭다운 ref 상태          //
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    //          event handler: 카테고리 클릭 이벤트 처리          //
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    //          function: 박스 항목 선택 호출 함수          //
    const selectItem = (item: string) => {
        setSelectedItem(item);
        onChange(item);
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
    
    //          effect: value 값이 바뀔 때마다 업데이트          //
    useEffect(() => {
        setSelectedItem(value);
    }, [value]);

    const items = ['자격증', '취업', '어학', '회화', '학교', '기타'];

    //          render: DropDown 1관심 카테고리 렌더링          //
    return (
        <div ref={dropdownRef} className='dropdown-sign-in-category-box'>
            <div className={`dropdown-sign-in-category-header ${selectedItem ? 'selected' : ''}`} onClick={toggleDropdown}>
                {selectedItem ? selectedItem : '선택해주세요'}
            </div>
            <div className='arrow-down-icon-box'>
                <div className='arrow-down-icon'></div>
            </div>
            {isOpen && (
                <div className='dropdown-sign-in-category-list'>
                    <Scrollbars 
                        renderTrackVertical={(props) => <div {...props} className='track-category-vertical' />} 
                        renderThumbVertical={(props) => <div {...props} className='thumb-category-vertical' />}>
                        {items.map((item) => (
                            <div className='dropdown-sign-in-category-list-index' key={item} onClick={() => selectItem(item)}>
                                {item}
                            </div>
                        ))}
                    </Scrollbars>
                </div>
            )}
        </div>
    );
};

export default DropDownSignInCategory;
