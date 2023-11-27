import React, { useRef, useState, useEffect } from 'react';
import './style.css';
import Scrollbars from 'react-custom-scrollbars-2';
import { useStudyStore } from 'stores';

//          interface: 스터디 선택 인터페이스 Props          //
interface Props {
    onCategoryChange: (categories: string[]) => void;
}

//          component: DropDown 스터디 생성 카테고리 컴포넌트          //
const DropDownStudyCreateCategory = ({ onCategoryChange }: Props) => {

    //          state: 박스 상태          //
    const [isOpen, setIsOpen] = useState(false);
    //          state: 박스 선택 상태          //
    const [selectedItem, setSelectedItem] = useState<string[]>([]);
    //          state: 박스 드롭다운 ref 상태          //
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    //          event handler: 카테고리 클릭 이벤트 처리          //
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
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

    const items = ['자격증', '취업', '어학', '회화', '학교', '기타'];

    //          event handler: 카테고리 선택 최대 3개 및 중복 선택 불가 이벤트 처리          //
    const handleCategorySelect = (item: string) => {
        if (selectedItem.length < 3 && !selectedItem.includes(item)) {
            setSelectedItem([...selectedItem, item]);
            onCategoryChange([...selectedItem, item]);

            setIsOpen(false);
        }
    };

    //          event handler: X 아이콘 클릭시 카테고리 선택 요소 삭제 이벤트 처리          //
    const removeCategoryHandler = (item: string) => {
        const removeItems = selectedItem.filter((selected) => selected !== item);
        setSelectedItem(removeItems);
        onCategoryChange(removeItems);
    }

    //          render: DropDown 스터디 생성 카테고리 렌더링          //
    return (
        <div ref={dropdownRef} className='dropdown-study-create-category-box'>
            <div className='dropdown-study-create-category-box-list'>
                <div className={`dropdown-study-create-category-header`} onClick={toggleDropdown}>
                    {'스터디 카테고리를 선택해주세요.'}
                </div>
                <div className='dropdown-study-create-down-icon-box'>
                    <div className='dropdown-study-create-down-icon'></div>
                </div>
                {isOpen && (
                    <div className='dropdown-study-create-category-list'>
                        <Scrollbars 
                            renderTrackVertical={(props) => <div {...props} className='track-create-category-vertical' />} 
                            renderThumbVertical={(props) => <div {...props} className='thumb-create-category-vertical' />}>
                            {items.map((item) => (
                                <div className='dropdown-study-create-category-list-index' key={item} onClick={() => handleCategorySelect(item)}>
                                    {item}
                                </div>
                            ))}
                        </Scrollbars>
                    </div>
                )}
            </div>
            <div className='selected-category-box-list'>
                    <div className='selected-category-box'>
                        {selectedItem.map((item) => (
                            <div className='selected-category' key={item}>
                                <div className='selected-category-index' >{item}</div>                                
                                <div className='X-button-icon-box'>
                                    <div className='X-button-icon' onClick={() => removeCategoryHandler(item)}></div>
                                </div>
                            </div>
                        ))}
                    </div>
            </div>
        </div>
    );
};

export default DropDownStudyCreateCategory;
