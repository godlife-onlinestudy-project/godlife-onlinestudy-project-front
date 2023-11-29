import { MAIN_PATH } from 'constant';
import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom'

//          component: OAuth2 컴포넌트          //
export default function OAuth() {

    //          state: 조회하는 유저 token, expirationTime path variable 상태          //
    const { token, expirationTime } = useParams();
    //          state: cookie 상태          //
    const [cookies, setCookie] = useCookies();

    //          function: 네비게이트 함수          //
    const navigator = useNavigate();

    //          effect: token이 변경될 때마다 실행될 함수          //
    useEffect(() => {

        if (!token || !expirationTime) return;

        const now = new Date().getTime();
        const expires = new Date(now + Number(expirationTime) * 1000 + 32400000);
        console.log(expires);
        setCookie('accessToken', token, { expires, path: '/' });
        navigator(MAIN_PATH);
    }, [token]);

  return (
    <div></div>
  )
}
