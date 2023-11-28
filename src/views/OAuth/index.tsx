import { MAIN_PATH } from 'constant';
import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom'

export default function OAuth() {

    const { token, expirationTime } = useParams();
    const [cookies, setCookie] = useCookies();

    const navigator = useNavigate();

    useEffect(() => {

        if (!token || !expirationTime) return;

        const now = new Date().getTime();
        const expires = new Date(now + Number(expirationTime) * 1000);
        setCookie('accessToken', token, { expires, path: MAIN_PATH });
    }, [token]);

  return (
    <div>index</div>
  )
}
