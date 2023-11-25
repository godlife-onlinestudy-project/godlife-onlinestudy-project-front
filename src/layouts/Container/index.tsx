import React, { useRef, useState } from 'react'

import Footer from "layouts/Footer";
import { AUTH_PATH, SERVICE_PATH } from "../../constant";
import { Outlet, useLocation } from "react-router-dom"
import Header from "layouts/Header";
import Service from 'views/Service';

//          component: 메인 레이아웃          //
export default function Container() {

  //        description: 검색 버튼 Ref        //
  const searchDivRef = useRef<HTMLDivElement | null>(null);

  const onSearchMoveClickHandler = () => {
    if (!searchDivRef.current) return;
    searchDivRef.current.scrollIntoView({ behavior: 'smooth' });
  }

    //          state: 현재 페이지 path name 상태          //
    const { pathname } = useLocation();
  
    //          render: 메인 레이아웃 렌더링          //
    return (
      <>
          {pathname !== AUTH_PATH && <Header onSearchMoveClickHandler={onSearchMoveClickHandler} /> }
          <Outlet />
          { pathname !== AUTH_PATH && <Footer /> }
      </>
    )
  }