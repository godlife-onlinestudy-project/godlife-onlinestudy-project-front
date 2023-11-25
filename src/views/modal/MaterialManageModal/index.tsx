import React, { useRef, useState } from 'react'
import './style.css';
import { materialManageListMock } from 'mocks';
import MaterialManageList from 'components/MaterialManageListItem';
import Scrollbars from 'react-custom-scrollbars-2';

//          component: 자료 관리하기 모달 컴포넌트          //
export default function MaterialManageModal({modalCloseHandler}: {modalCloseHandler: () => void}) {

  //          state: 업로드 이미지 input ref 상태          //
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  //          event handler: 업로드 클릭 이벤트 처리          //
  const onUploadButtonClickHandler = () => {
    if (!fileInputRef.current) return;
    fileInputRef.current.click();
  };
  //          event handler: 다운로드 클릭 이벤트 처리          //
  const onDownloadButtonClickHandler = () => {
    alert('다운로드는 백에서 같이 처리해야함');
  };
  //          event handler: 삭제 클릭 이벤트 처리          //
  const onDeleteButtonClickHandler = () => {
    alert('삭제 이벤트 처리');
  };

  //           event handler: StudyCreate의 modalCloseHandler를 가져와서 이벤트 처리           //
  const closeModal = () => {
    modalCloseHandler();
  }

  //           event handler: 모달창이 아닌 다른곳을 클릭했을 때 모달창이 닫히도록 처리           //
  const closeModalOutsideClickHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target === event.currentTarget) {
        modalCloseHandler();
    }
};

  //          render: 자료 관리하기 모달 컴포넌트 렌더링          //
  return (
    <div id='material-manage-wrapper' onClick={closeModalOutsideClickHandler}>
        <div className='material-manage-card'>
            <div className='material-manage-header-box'>
              <div className='material-manage-title-text'>{'자료 관리하기'}</div>
              <div className='material-manage-cancel-box'>
                <div className='material-manage-cancel-icon' onClick={closeModal}></div>
              </div>
            </div>
            <div className='material-manage-list-box'>
              <div className='material-manage-box'>
                  <div className='material-manage-list-titles'>
                    <div className='material-select-blank-box'></div>
                    <div className='material-serial-number'>{'연번'}</div>
                    <div className='material-name'>{'자료 이름'}</div>
                    <div className='material-upload-date'>{'업로드 날짜'}</div>
                    <div className='material-write-user'>{'작성자'}</div>
                  </div>
                  <div className='material-manage-list-index'>
                  <Scrollbars renderTrackVertical={(props) => <div {...props} className='material-manage-track-vertical' />} renderThumbVertical={(props) => <div {...props} className='material-manage-thumb-vertical' />}>
                      {materialManageListMock.map((materialManageItem) => (
                        <MaterialManageList materialManageListItem={materialManageItem} />
                      ))}
                  </Scrollbars>
                  </div>
              </div>
            </div>
            <div className='material-button-list-box'>
                <div className='material-delete-box' onClick={onDeleteButtonClickHandler}>
                  <div className='material-delete-text'>{'삭제'}</div>
                </div>
                <div className='material-download-box' onClick={onDownloadButtonClickHandler}>
                  <div className='material-download-text'>{'다운로드'}</div>
                </div>
                <div className='material-upload-box' onClick={onUploadButtonClickHandler}>
                  <input ref={fileInputRef} type='file' accept='image/*' style={{ display: 'none' }} />
                  <div className='material-upload-text'>{'업로드'}</div>
                </div>
              </div>
        </div>
    </div>
  );
}
