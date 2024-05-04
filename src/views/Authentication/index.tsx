import React, { useState, KeyboardEvent, useRef, useEffect, ChangeEvent } from 'react'
import InputBox from '../../components/InputBox';
import { useCookies } from 'react-cookie';
import './style.css';
import { useNavigate } from 'react-router-dom';
import DropDownFirstCategory from '../../components/Dropdown1Category';
import { SignInEmailCheckResponseDto, SignInResponseDto } from 'apis/dto/response/auth';
import ResponseDto from 'apis/dto/response';
import { MAIN_PATH } from 'constant';
import { SendAuthenticateCodeCheckRequestDto, SendAuthenticateCodeRequestDto, SignInEmailCheckRequestDto, SignInRequestDto, SignUpRequestDto } from 'apis/dto/request/auth';
import { sendAuthenticateCodeCheckRequest, sendAuthenticationCodeRequest, signInEmailCheckRequest, signInRequest, signUpRequest } from 'apis';
import DropDownModifyStudyCategory from 'components/DropdownModifyStudyCategory';
import DropDownSignInCategory from 'components/DropdownSignUpCategory';

export default function Authentication() {


    
    //          state : 이메일 보낼 이메일 주소 상태            //
    const [passwordEmail, setPasswordEmail] = useState<string>('');
    //          state: 쿠키 상태          //
    const [cookies, setCookie] = useCookies();
    //          function: 네비게이트 함수          //
     const navigator = useNavigate();

    //          state: 화면 상태          //
     const [view, setView] = useState<
        'sign-in-card' | 'sing-up-email-card' | 'search-password-card' 
        | 'search-password-email-autentication-card' | 'sing-up-email-autentication-card' | 'sing-up-information-card'
        | 'reset-password-card'>('sign-in-card');
            
    //          component : sign in main card         //
    const SignInCard = () => {
        
        //          state : 로그인 단계 상태         //
        const [signInLevel, setSignInLevel] = useState<number>(1);
        
        //          state: 비밀번호 입력 요소 참조 상태          //
        const passwordRef = useRef<HTMLInputElement | null>(null);
        
        //          state: 입력한 이메일 상태          //
        const [email, setEmail] = useState<string>('');
        //          state: 이메일 에러 상태          //
        const [signInEmailerror, setSignInEmailError] = useState<boolean>(false);
        //          state: 이메일 에러 메세지 상태          //
        const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
        //          state: 이메일 재입력 아이콘 상태          //
        const [emailReWritingIcon, setEmailReWritingIconIcon] = useState<'email-rewriting-icon'>('email-rewriting-icon');

        //          state: 입력한 비밀번호 상태          //
        const [password, setPassword] = useState<string>('');
        //          state: 비밀번호 인풋 타입 상태          //
        const [passwordType, setPasswordType] = useState<'text' | 'password'>('password');
        //          state: 비밀번호 인풋 버튼 아이콘 상태          //
        const [passwordIcon, setPasswordIcon] = useState<'eye-off-icon' | 'eye-on-icon'>('eye-off-icon');
        //          state: 로그인 에러 상태          //
        const [signInError, setSignInError] = useState<boolean>(false);

        //          function: sign in email check response 처리 함수          //
        const signInEmailCheckRespose = (responseBody : SignInEmailCheckResponseDto | ResponseDto) => {
            const { code } = responseBody;
            if( code === 'SF') alert('존재하지않는 이메일');
            if ( code === 'DBE') setSignInEmailError(true);
            if (code !== 'SU') return;
            
            setSignInLevel(2);
        }

        //          function: sign in response 처리 함수          //
        const signInRespose = (responseBody : SignInResponseDto | ResponseDto) => {
            const { code } = responseBody;
            if (code === 'VF') alert('모두 입력해주세요.');
            if (code === 'SF') setSignInError(true);
            if (code === 'DBE') alert('데이터베이스 오류입니다.');
            if (code !== 'SU') return;
      
            const { token, expirationTime } = responseBody as SignInResponseDto;
      
            const now = new Date().getTime();
            const expires = new Date(now + expirationTime * 1000);
      
            setCookie('accessToken', token, { expires, path: '/' });
            navigator(MAIN_PATH);
      
          }

        //          event handler: 이메일 확인 로그인 버튼 클릭 이벤트 처리          //
        const onSignInNextLevelButtonClickHandler = () => {
            const requestBody : SignInEmailCheckRequestDto = {userEmail : email}
            signInEmailCheckRequest(requestBody).then(signInEmailCheckRespose);
            
        
            //          description: 이메일 패턴 확인           //
            const emailPattern = /^[a-zA-Z0-9_]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
            const checkedEmail = !emailPattern.test(email);
                if (checkedEmail) {
                    setSignInEmailError(true);
                    setEmailErrorMessage('이메일주소 포맷이 맞지않습니다.');
                }

                if (checkedEmail) return;

                setSignInLevel(2);
        }
        //          event handler: 이메일 인풋 key down 이벤트 처리          //
        const onEmailKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key !== 'Enter') return;

            setSignInEmailError(false);
            setEmailErrorMessage('');

            onSignInNextLevelButtonClickHandler();
        }
        //          event handler: 이메일 인풋 버튼 아이콘 클릭 이벤트 처리          //
        const onEmailReWritingIconClickHandler = () => {
            setEmailReWritingIconIcon('email-rewriting-icon');
            setSignInLevel(1);
            setEmail('');
        }
 
        //          event handler: 비밀번호 인풋 key down 이벤트 처리          //
        const onPasswordKeyDownHanlder = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key !== 'Enter') return;
            onSignInButtonClickHandler();
        }
        //          event handler: 비밀번호 인풋 버튼 클릭 이벤트 처리          //
        const onPasswordIconClickHandler = () => {
            if (passwordType === 'text') {
            setPasswordType('password');
            setPasswordIcon('eye-off-icon');
            }
            if (passwordType === 'password') {
            setPasswordType('text');
            setPasswordIcon('eye-on-icon');
            }
        }
        //          event handler: 로그인 버튼 클릭 이벤트 처리          //
        const onSignInButtonClickHandler = () => {
            const requestBody : SignInRequestDto = { userEmail: email, userPassword: password}
            signInRequest(requestBody).then(signInRespose);
        }
        //          event handler: '새로운 계정 만들기' 버튼 클릭 이벤트 처리          //
        const onSignUpLinkClickHandler = () => {
            setView('sing-up-email-card');
        }
        //          event handler: '로그인을 할 수 없나요?' 링크 버튼 클릭 이벤트 처리          //
        const onSearchPasswordCardLinkClickHandler = () => {
            setView('search-password-card');
        }

        //          event handler: 네이버 로그인 버튼 클릭 이벤트 처리          //
        const onNaverOauthButtonClickHandler = (provider: string) => {
            window.location.href = `http://ec2-43-202-24-102.ap-northeast-2.compute.amazonaws.com:4000/auth/oauth2/${provider}`;
        }

        //          event handler: 카카오 로그인 버튼 클릭 이벤트 처리          //
        const onKakaoOuathButtonClickHandler = (provider: string) => {
            window.location.href = `http://ec2-43-202-24-102.ap-northeast-2.compute.amazonaws.com:4000/auth/oauth2/${provider}`;
        }

        //          event handler: 구글 로그인 버튼 클릭 이벤트 처리          //
        const onGoogleOuathButtonClickHandler = (provider: string) => {
            window.location.href = `http://ec2-43-202-24-102.ap-northeast-2.compute.amazonaws.com:4000/auth/oauth2/${provider}`;
        }
        
        //          effect : 이메일 엔터치면 비밀번호 인풋박스로 넘어가게           //
        useEffect(() => {
            if (signInLevel === 2 && passwordRef.current) passwordRef.current.focus();
        }, [signInLevel])

        //        render : 로그인 페이지 랜더링        //
        return (
            <div className='sign-in-card'>
                <div className='sign-in-top-box'>
                    <div className='auth-top-box'>
                        <div className='godlife-logo-icon-box'>
                            <div className='godlife-logo-icon'></div>
                        </div>
                        <div className='auth-page-text-box'>로그인을 해주세요</div>
                    </div>
                    {signInError &&(
                    <div className='error-message-container'>
                        <div className='error-logo-image'></div>
                        <div className='error-message-box'>
                            <div className='error-message-text'>{'잘못된 이메일 주소 입니다.\n로그인 하는데 도움이 필요하세요?'}</div>
                        </div>
                    </div>    
                    )}
                    <div className='sign-in-middle-box'>
                        <div className='email-input-box'> 
                        <InputBox label={''} type='text' placeholder='이메일 주소를 입력해주세요.' value={email} error={signInEmailerror} errorMessage={''} setValue={setEmail} icon={email.length === 0 ? '' : emailReWritingIcon} onButtonClick={onEmailReWritingIconClickHandler} onKeyDown={onEmailKeyDownHandler} />
                        {signInEmailerror && (
                            <div className='email-input-error-message-box'>
                                <div className='email-input-error-message-logo'></div>
                                <div className='email-input-error-message-text' >{'이메일 양식이 올바르지 않습니다.'}</div>
                            </div>
                        )}  
                        </div>
                        {signInLevel===2 && 
                        <>
                            <div className='password-input-box'>
                            <InputBox ref={passwordRef} label={''} type={passwordType} placeholder='비밀번호를 입력해주세요.' error={signInError} value={password} setValue={setPassword} icon={passwordIcon} onKeyDown={onPasswordKeyDownHanlder} onButtonClick={onPasswordIconClickHandler} />
                            </div>
                        </>
                        }
                        {/*sign-up-email-card에서 1-4-0 계정생성에서 이메일 있을 경우 sing-in으로 와짐*/}
                        {signInLevel === 1 && <div className='sign-in-button-box' onClick={onSignInNextLevelButtonClickHandler}>{'로그인'}</div>}
                        {signInLevel===2 && <div className='sign-in-button-box' onClick={onSignInButtonClickHandler}>{'로그인'}</div>}
                        <div className='authentication-page-chage-button'>
                            <div className='search-password-navigator-button' onClick={onSearchPasswordCardLinkClickHandler}>{'로그인을 할 수 없나요?'}</div>
                            <div className='authentication-page-chage-button-divider'>{'\|'}</div>
                            <div className='sing-up-navigator-button' onClick={onSignUpLinkClickHandler} >{'새로운 계정 만들기'}</div>
                        </div>
                    </div>
                </div>
                <div className='Oauth-box'>
                    <div className='Oauth-box-title'>다음계정을 통해 로그인</div>
                    <div className='Oauth-authentification-icon-box'>
                        <div className='google-sign-in-box' onClick={() => onGoogleOuathButtonClickHandler('google')}>
                            <div className='google-logo-image'></div>
                            <div className='google-logo-name'>Google</div>
                        </div>
                        <div className='kakao-sign-in-box' onClick={() => onKakaoOuathButtonClickHandler('kakao')}>
                            <div className='kakao-logo-image'></div>
                            <div className='kakao-logo-name'>Kakao</div>
                        </div>
                        <div className='naver-sign-in-box' onClick={() => onNaverOauthButtonClickHandler('naver')}>
                            <div className='naver-logo-image'></div>
                            <div className='naver-logo-name'>Naver</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    //          component : 비밀번호 재설정_이메일 입력 화면         //
    const SearchPasswordCard = () => {

        //          state : 이메일 보낼 이메일 주소 상태            //
        const [email, setEmail] = useState<string>('');
        //          state: 이메일 에러 상태          //
        const [sendEmailAddresserror, setSendEmailAddressError] = useState<boolean>(false);

        //          event handler: '복구 링크 보내기' 버튼 클릭 이벤트 처리          //
        const sendMessageButtonClickHandler = () => {
            
            setSendEmailAddressError(false);

            //          description: 이메일 패턴 확인           //
            const emailPattern = /^[a-zA-Z0-9_]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
            const checkedEmail = !emailPattern.test(email);
            if (checkedEmail) {
                setSendEmailAddressError(true);
            }
            if (checkedEmail) return;

            setView('search-password-email-autentication-card');
            setPasswordEmail(email);
        }

        //          event handler: '로그인 돌아기기' 버튼 클릭 이벤트 처리          //
        const onSignInLinkClickHandler = () => {
            setView('sign-in-card');
        }
        //          event handler: 이메일 인풋 key down 이벤트 처리          //
        const onEmailKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key !== 'Enter') return;
            setSendEmailAddressError(false);

            //          description: 이메일 패턴 확인           //
            const emailPattern = /^[a-zA-Z0-9_]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
            const checkedEmail = !emailPattern.test(email);
            if (checkedEmail) {
                setSendEmailAddressError(true);
            }
            if (checkedEmail) return;

            setView('search-password-email-autentication-card');
            setPasswordEmail(email);
        }


        //          event handler: input 값 변경 이벤트 처리          //
        const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            setEmail(value);
        }

        //        render : 비밀번호 찾기 페이지 랜더링        //
        return (
            <div className='search-password-card'>
                <div className='search-password-top-box'>
                    <div className='auth-top-box'>
                        <div className='godlife-logo-icon-box'>
                            <div className='godlife-logo-icon'></div>
                        </div>
                        <div className='auth-page-text-box'>{'로그인을 할 수 없습니까?'}</div>
                    </div>
                    {sendEmailAddresserror &&(
                    <div className='error-message-container'>
                        <div className='error-logo-image'></div>
                        <div className='error-message-box'>
                            <div className='error-message-text'>{'잘못된 이메일 양식입니다.\n로그인 하는데 도움이 필요하세요?'}</div>
                        </div>
                    </div>)}
                    <div className='search-password-middle-box'>
                        <div className='search-password-message'>{'다음으로 복구 링크 보내기'}</div>
                        <div className='search-password-send-email-inputbox'>
                            <div className='inputbox-container'>
                                <input className='send-email-address' type='text' placeholder='이메일 주소를 입력해주세요.' value={email} onChange={onEmailChangeHandler} onKeyDown={onEmailKeyDownHandler} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='search-password-bottom-box'>
                    <div className='search-password-send-email-button' onClick={sendMessageButtonClickHandler}>복구 링크 보내기</div>
                    <div className='sign-in-navigator-button' onClick={onSignInLinkClickHandler}>로그인으로 돌아가기</div>
                </div>
            </div>
        )
    }
    //          component : 비밀번호 재설정_이메일 인증 card         //
    const SearchPasswordEmailAutenticationCard = () => {


        //        render : 이메일 인증 페이지 랜더링        //
        return (
            <div className='search-password-email-authentication-card'>
                <div className='search-password-email-authentication-top'>
                    <div className='auth-top-box'>
                        <div className='godlife-logo-icon-box'>
                            <div className='godlife-logo-icon'></div>
                        </div>
                        <div className='auth-page-text-box'>{'받은 메일함을 확인하여 로그인 하세요.'}</div>
                    </div>
                    <div className='send-icon-box'>
                        <div className='send-icon'></div>
                    </div>
                    <div className='search-password-email-authentication-middle-box'>
                        <div className='send-message-notice'>{'설정을 완료하고 로그인을 하려면 \n다음주소로 보낸 이메일의 확인 링크를 클릭하세요'}</div>
                        <div className='send-message-receiver-address'>{passwordEmail}</div>
                    </div>
                </div>
                <div className='search-password-email-authentication-bottom-box'>
                    <div className='search-password-resend-email-text-button'>{'확인 이메일 다시 받기'}</div>
                </div>
            </div>
        )
    }
    //          component : 비밀번호 재설정_비밀번호 입력 화면         //
    const ResetPasswordCard = () => {

        //          state: 비밀번호 입력 요소 참조 상태          //
        const passwordRef = useRef<HTMLInputElement | null>(null);
        //          state: 비밀번호 상태          //
        const [password, setPassword] = useState<string>('');
        //          state: 비밀번호 타입 상태          //
        const [passwordType, setPasswordType] = useState<'text' | 'password'>('password');
        //          state: 비밀번호 아이콘 상태          //
        const [passwordIcon, setPasswordIcon] = useState<'eye-on-icon' | 'eye-off-icon'>('eye-off-icon');
        //          state: 비밀번호 에러 상태          //
        const [passwordError, setPasswordError] = useState<boolean>(false);
        //          state: 비밀번호 길이 에러 상태          //
        const [passwordLenghtError, setPasswordLenghtError] = useState<boolean>(false);
        //          state: 비밀번호 패턴 에러 상태          //
        const [passwordPatternError, setPasswordPatternError] = useState<boolean>(false);
        //          state: 비밀번호 에러 메세지 상태          //
        const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');
        
        //          event handler: 비밀번호 인풋 버튼 클릭 이벤트 처리          //
        const onPasswordIconClickHandler = () => {
            if (passwordType === 'text') {
            setPasswordType('password');
            setPasswordIcon('eye-off-icon');
            }
            if (passwordType === 'password') {
            setPasswordType('text');
            setPasswordIcon('eye-on-icon');
            }
        }

        //          event handler: 비밀번호 변경완료 버튼 클릭 이벤트 처리          //
        const onPasswordResetCompleteIconClickHandler = () => {
            setPasswordLenghtError(false);
            setPasswordPatternError(false);
            setPasswordError(false);

            // description: 비밀번호 길이 확인 //
            const checkedPasswordLength = password.trim().length < 8;
            if (checkedPasswordLength) {
                
                setPasswordLenghtError(true);
                setPasswordError(true);
                setPasswordErrorMessage('약함');
            }

            // description: 비밀번호 조합 및 규칙 //
            const checkedPasswordPattern =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_?]).{8,15}$/;
            const checkedPassword = checkedPasswordPattern.test(password);
            if (!checkedPassword) {

                setPasswordPatternError(true);
                setPasswordError(true);
                setPasswordErrorMessage('약함');
            }

            // description: 비밀번호 DB이전 기록 확인 //
            // const checkedPasswordDB = password.trim().length < 8;
            // if (checkedPasswordPattern) {
            //     setPasswordErrorLevel(3);
            //     setPasswordEorror(true);
            //     setPasswordErrorMessage('약함');
            // }

            if (checkedPasswordLength || !checkedPassword ) return;
            alert('회원가입 완료~!');

        }
        //          event handler: 비밀번호 변경 완료 인풋 key down 이벤트 처리          //
        const onPasswordResetCompleteKeyDownHanlder = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key !== 'Enter') return;
            onPasswordResetCompleteIconClickHandler();
        }
        
        //        render : 비밀번호 재설정 페이지 랜더링        //
        return (
            <div className='reset-password-card'>
                <div className='reset-password-top-box'>
                    <div className='auth-top-box'>
                        <div className='godlife-logo-icon-box'>
                            <div className='godlife-logo-icon'></div>
                        </div>
                        <div className='auth-page-text-box'>{'새 비밀번호 입력'}</div>
                    </div>
                    {passwordError &&(
                    <div className='error-message-container'>
                        <div className='error-logo-image'></div>
                        <div className='error-message-box'>
                            { passwordLenghtError &&  <div className='reset-password-error-message-body-text'>{'비밀번호를 8자리 이상입력하세요.'}</div>}
                            { passwordPatternError && <div className='reset-password-error-message-body-text'>{'하나 이상의 소문자, 대문자,숫자,특수문자를 포함해야 합니다.'}</div>}
                        </div>
                    </div>    
                    )}
                    <div className='reset-password-middle-box'>
                        <div className='password-input-box'>
                        <InputBox ref={passwordRef} label={''} type={passwordType} placeholder='비밀번호를 입력해주세요.' error={passwordError} value={password} setValue={setPassword} icon={passwordIcon} onKeyDown={onPasswordResetCompleteKeyDownHanlder} onButtonClick={onPasswordIconClickHandler} />
                        </div>
                        <div className='password-security-gage-box'>
                            {!passwordError ? (
                            <div className='security-gage-default'>
                                <div className='gage1'></div>
                                <div className='gage2'></div>
                                <div className='gage3'></div>
                                <div className='gage4'></div>
                                <div className='gage5'></div>
                            </div>
                            ) : passwordLenghtError  ? (
                            <div className='security-gage-default'>
                                <div className='password-error-level1-gage1'></div>
                                <div className='password-error-level1-gage2'></div>
                                <div className='password-error-level1-gage3'></div>
                                <div className='password-error-level1-gage4'></div>
                                <div className='password-error-level1-gage5'></div>
                            </div>              
                            ) : (
                            <div className='security-gage-default'>
                                <div className='password-error-level2-gage1'></div>
                                <div className='password-error-level2-gage2'></div>
                                <div className='password-error-level2-gage3'></div>
                                <div className='password-error-level2-gage4'></div>
                                <div className='password-error-level2-gage5'></div>
                            </div>
                            )}  
                        </div>
                    </div>
                </div>
                <div className='reset-password-main-page-navigator-bottom-box'onClick={onPasswordResetCompleteIconClickHandler}>계속</div>
            </div>
        )
    }
    //          component : sing up_이메일 입력 화면         //
    const SingUpEmailCard = () => {

        //          state : 이메일 보낼 이메일 주소 상태            //
        const [email, setEmail] = useState<string>('');
        //          state: 이메일 에러 상태          //
        const [sendEmailAddresserror, setSendEmailAddressError] = useState<boolean>(false);
        
        //          function: sign up send authentication code response 처리 함수          //
        const sendAuthenticateCodeResponse = (code: string) => {
            if (code === 'NU') alert('데이터베이스 오류입니다.');
            if (code !== 'SU') return;
      
            setEmail('');
            setView('sing-up-email-autentication-card');
        }

        //          event handler: '이미 계정이 있습니까?' 버튼 클릭 이벤트 처리          //
        const onSignInLinkClickHandler = () => {
            setView('sign-in-card');
        }
        //          event handler: '가입' 버튼 클릭 이벤트 처리          //
        const onSingUpEmailAutenticationCardClickHandler = () => {
            const requestBody : SendAuthenticateCodeRequestDto = {userEmail: email}
            sendAuthenticationCodeRequest(requestBody).then(sendAuthenticateCodeResponse);

            setSendEmailAddressError(false);

            //          description: 이메일 패턴 확인           //
            const emailPattern = /^[a-zA-Z0-9_]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
            const checkedEmail = !emailPattern.test(email);
            if (checkedEmail) {
                setSendEmailAddressError(true);
            }
            if (checkedEmail) return;

            setPasswordEmail(email);
            setView('sing-up-email-autentication-card');
        }
        //          event handler: 이메일 인풋박스 key down 이벤트 처리          //
        const onEmailKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key !== 'Enter') return;
            setSendEmailAddressError(false);
            onSingUpEmailAutenticationCardClickHandler();
        }
        //          event handler: input 값 변경 이벤트 처리          //
        const onEmailChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            setEmail(value);
        }

        //        render : 새로운 계정 생성 페이지 랜더링        //
        return (
            <div className='sign-up-email-card'>
                <div className='sign-up-email-top-box'>
                    <div className='auth-top-box'>
                        <div className='godlife-logo-icon-box'>
                            <div className='godlife-logo-icon'></div>
                        </div>
                        <div className='auth-page-text-box'>계속하려면 새로운 계정을 만드세요</div>
                    </div>
                    {sendEmailAddresserror &&(
                    <div className='error-message-container'>
                        <div className='error-logo-image'></div>
                        <div className='error-message-box'>
                            <div className='error-message-text'>{'잘못된 이메일 양식입니다.\n로그인 하는데 도움이 필요하세요?'}</div>
                        </div>
                    </div>)}
                    <div className='sign-up-email-middle-box'>
                        <div className='sign-up-email-input-box'>
                            <div className='inputbox-container'>
                                <input className='send-email-address' type='text' placeholder='이메일 주소를 입력해주세요.' value={email} onChange={onEmailChangeHandler} onKeyDown={onEmailKeyDownHandler} />
                            </div>
                        </div>
                        <div className='sign-up-button-box' onClick={onSingUpEmailAutenticationCardClickHandler}>{'가입'}</div>
                        <div className='agree-personal-text-box'>
                            <div className='agree-personal-text'>{'가입하면 Godlife Cloud이용약관에 동의하고 \n개인정보 보호정책을 인정한 것 으로 간주됩니다.'}</div>
                        </div>
                    </div>
                </div>
                <div className='sign-up-email-bottom-box'>
                    <div className='Oauth-box'>
                        <div className='Oauth-box-title'>또는 다음 계정을 사용하여 계정생성</div>
                        <div className='Oauth-authentification-icon-box'>
                            <div className='google-sign-in-box'>
                                <div className='google-logo-image'></div>
                                <div className='google-logo-name'>Google</div>
                            </div>
                            <div className='kakao-sign-in-box'>
                                <div className='kakao-logo-image'></div>
                                <div className='kakao-logo-name'>Kakao</div>
                            </div>
                            <div className='naver-sign-in-box'>
                                <div className='naver-logo-image'></div>
                                <div className='naver-logo-name'>Naver</div>
                            </div>
                        </div>
                    </div>
                    <div className='sign-in-navigator-button'onClick={onSignInLinkClickHandler}>{'이미 계정이 있습니까?'}</div>
                </div>
            </div>
        )
    }
    //          component : sing up_이메일 인증 화면         //
    const SingUpEmailAutenticationCard = () => {

        //          state: 입력한 인증번호 상태          //
        const [emailAutentification, setEmailAutentification] = useState<string>('');
        //          state: 입력한 인증번호 에러 상태          //
        const [emailAutentificationError, setEmailAutentificationError] = useState<boolean>(false);

        //          function: sign up send authentication code response 처리 함수          //
        const sendAuthenticateCodeCheckResponse = (code: string) => {
            if (code === 'NU') alert('데이터베이스 오류입니다.');
            setEmailAutentificationError(true);
            if (code !== 'SU') return;
            
            setEmailAutentification('');
            setView('sing-up-information-card');
    }

        //          event handler: input 값 변경 이벤트 처리          //
        const onEmailAutentificationChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            setEmailAutentification(value);
        }
        //          event handler: '확인' 버튼 클릭 이벤트 처리          //
        const onInformationNavigatorButtonClickHandler = () => {
            const requestBody : SendAuthenticateCodeCheckRequestDto = {userEmail: passwordEmail, code: Number(emailAutentification) }
            sendAuthenticateCodeCheckRequest(requestBody).then(sendAuthenticateCodeCheckResponse);
            setView('sing-up-information-card');
        }
        //          event handler: 인증코드 인풋박스 ket down 이벤트 처리          //
        const onEmailAutentificationKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key !== 'Enter') return;
            onInformationNavigatorButtonClickHandler();
        }
        //          event handler: '이메일에 코드가 도착하지 않았나요?' 버튼 클릭 이벤트 처리          //
        const onSignUpLinkClickHandler = () => {
            setView('sing-up-email-card');
        }
        //        render : 새로운 계정 생성_이메일 확인 페이지 랜더링        //
        return (
            <div className='sign-up-email-autentification-card'>
                <div className='sign-up-email-autentification-card-top-box'>
                    <div className='auth-top-box'>
                        <div className='godlife-logo-icon-box'>
                            <div className='godlife-logo-icon'></div>
                        </div>
                        <div className='auth-page-text-box'>{'이메일로 인증 코드를 전송하였습니다'}</div>
                    </div>
                    {emailAutentificationError && (
                    <div className='error-message-container'>
                        <div className='error-logo-image'></div>
                        <div className='error-message-box'>
                            <div className='error-message-text'>{'잘못된 이메일 주소 입니다.\n로그인 하는데 도움이 필요하세요?'}</div>
                        </div>
                    </div>   
                    )}
                    <div className='sign-up-email-autentification-main'>
                        <div className='sign-up-email-autentification-confirm'>
                            <div className='sign-up-email-autentification-confirm-text'>{'새로운 계정을 생성하려면 다음 주소로 보낸 이메일의 코드를 \n확인하세요'}</div>
                            <div className='sign-up-email-autentification-send-address'>{passwordEmail}</div>
                        </div>
                        <div className='sign-up-email-autentification-card-middle-input-box'>
                            <div className='email-autentification-input-box'>
                                <input className='email-autentification-input' type='text' placeholder='코드번호' value={emailAutentification} onChange={onEmailAutentificationChangeHandler} onKeyDown={onEmailAutentificationKeyDownHandler} />
                            </div>
                        </div>                
                    </div>
                </div>
                <div className='sign-up-email-autentification-card-bottom-box'>
                    <div className='sing-up-information-card-navigator-button'onClick={onInformationNavigatorButtonClickHandler}>{'확인'}</div>
                    <div className='sing-up-email-card-navigator-text-button-box' onClick={onSignUpLinkClickHandler}>{'이메일에 코드가 도착하지 않았나요?'}</div>
                </div>
            </div>
        )
    }
    //          component : sing up _계정 생성 정보 입력 화면         //
    const SingUpInformationCard = () => {

        //          state: 이메일 상태          //
        const [email, setEmail] = useState<string>('');
        //          state: 이메일 재입력 아이콘 상태          //
        const [emailReWritingIcon, setEmailReWritingIconIcon] = useState<'email-rewriting-icon'>('email-rewriting-icon');
        //          state: 이메일 에러 상태          //
        const [emailError, setEmailError] = useState<boolean>(false);
        //          state: 이메일 에러 메세지 상태          //
        const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');

        //          state: 닉네임 상태          //
        const [nickname, setNickname] = useState<string>('');
        //          state: 닉네임 에러 상태          //
        const [nicknameError, setNicknameError] = useState<boolean>(false);
        //          state: 닉네임 에러 메세지 상태          //
        const [nicknameErrorMessage, setNicknameErrorMessage] = useState<string>('');

        //          state: 비밀번호 상태          //
        const [password, setPassword] = useState<string>('');
        //          state: 비밀번호 타입 상태          //
        const [passwordType, setPasswordType] = useState<'text' | 'password'>('password');
        //          state: 비밀번호 아이콘 상태          //
        const [passwordIcon, setPasswordIcon] = useState<'eye-on-icon' | 'eye-off-icon'>('eye-off-icon');
        //          state: 비밀번호 에러 상태          //
        const [passwordError, setPasswordError] = useState<boolean>(false);
        //          state: 비밀번호 에러 메세지 상태          //
        const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');
        //          state: 비밀번호 길이 에러 상태          //
        const [passwordLenghtError, setPasswordLenghtError] = useState<boolean>(false);
        //          state: 비밀번호 패턴 에러 레벨 상태          //
        const [passwordPatternError, setPasswordPatternError] = useState<boolean>(false);

        //          state: 카테고리 상태          //
        const [category, setCategory] = useState<string>('');
        //          state: 카테고리 에러 상태          //
        const [categoryError, setCategoryError] = useState<boolean>(false);
        //          state: 카테고리 에러 메세지 상태          //
        const [categoryErrorMessage, setCategoryErrorMessage] = useState<string>('');

        //          function: sign up response 처리 함수          //
        const signUpResponse = (code: string) => {
            if (code === 'VF') alert('모두 입력하세요.');
            if (code === 'DE') {
              setEmailError(true);
              setEmailErrorMessage('중복되는 이메일 주소 입니다.');
            }
            if (code === 'DN') {
              setNicknameError(true);
              setNicknameErrorMessage('닉네임을 입력해 주세요.');
            }
            if (code === 'DT') {
                setCategoryError(true);
                setCategoryErrorMessage('카테고리를 입력하세요.');
            }
            if (code === 'DBE') alert('데이터베이스 오류입니다.');
            if (code !== 'SU') return;
      
            setEmail('');
            setPassword('');
            setNickname('');
            setCategory('')
            setView('sign-in-card');
      
        }

        //          event handler : 닉네임 인풋박스 key down 이벤트 처리            //
        const onNicknameKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key !== 'Enter') return;            
            
            // description: 닉네임 입력 여부 확인 //
            const checkedNickname = nickname.trim().length === 0;
                if (checkedNickname) {
                    setNicknameError(true);
                    setNicknameErrorMessage('닉네임을 입력해주세요.');
                } else{
                    setNicknameError(false);
                    setNicknameErrorMessage('');
                }
        }
        //           event handler: 스터디 카테고리 변경 이벤트 처리           //
        const onStudyCategory1Change = (category: string) => {
            setCategory(category);
        };

        //          event handler: 이메일 인풋 버튼 아이콘 클릭 이벤트 처리          //
        const onEmailReWritingIconClickHandler = () => {
            setEmailReWritingIconIcon('email-rewriting-icon');
            setView('sing-up-email-card');
        }
        //          event handler : 비밀번호 인풋박스 key down 이벤트 처리            //
        const onPasswordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
            if (event.key !== 'Enter') return;

            // description: 비밀번호 길이 확인 //
            const checkedPasswordLength = password.trim().length < 8;
            if (checkedPasswordLength) {
                
                setPasswordLenghtError(true);
                setPasswordError(true);
                setPasswordErrorMessage('약함');
            } else {
                setPasswordLenghtError(false);
                setPasswordError(false);
                setPasswordErrorMessage('');
            }

            // description: 비밀번호 조합 및 규칙 //
            const checkedPasswordPattern =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_?]).{8,15}$/;
            const checkedPassword = checkedPasswordPattern.test(password);
            if (!checkedPassword) {

                setPasswordPatternError(true);
                setPasswordError(true);
                setPasswordErrorMessage('');
            } else {
                setPasswordPatternError(false);
                setPasswordError(false);
                setPasswordErrorMessage('');
            }

        }
        //          event handler: 비밀번호 아이콘 클릭 이벤트 처리          //
        const onPasswordIconClickHandler = () => {
            if (passwordType === 'password') {
                setPasswordType('text');
                setPasswordIcon('eye-on-icon');
            }
            if (passwordType === 'text') {
                setPasswordType('password');
                setPasswordIcon('eye-off-icon');
            }
        }
        //          event handler: '새로운 계정 만들기' 버튼 클릭 이벤트 처리          //
        const onSingUpCompleteButtonClickHandler =() => {
            const requestBody : SignUpRequestDto = {userEmail: passwordEmail, userPassword: password, userNickname : nickname, userFavorite1 : category }
            signUpRequest(requestBody).then(signUpResponse);

            setEmailError(false);
            setEmailErrorMessage('');
            setNicknameError(false);
            setNicknameErrorMessage('');
            setPasswordError(false);
            setPasswordErrorMessage('');
            setCategoryError(false);
            setCategoryErrorMessage('');

            // description: 이메일 패턴 확인 //
            const emailPattern = /^[a-zA-Z0-9]*@([-.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
            const checkedEmail = !emailPattern.test(email);
            if (checkedEmail) {
                setEmailError(true);
                setEmailErrorMessage('이메일주소 포맷이 맞지않습니다.');
            }
            // description: 닉네임 입력 여부 확인 //
            const checkedNickname = nickname.trim().length === 0;
            if (checkedNickname) {
                setNicknameError(true);
                setNicknameErrorMessage('닉네임을 입력해주세요.');
            }     
            // description: 비밀번호 길이 확인 //
            const checkedPasswordLength = password.trim().length < 8;
            if (checkedPasswordLength) {
                
                setPasswordLenghtError(true);
                setPasswordError(true);
                setPasswordErrorMessage('');
            }
            // description: 비밀번호 조합 및 규칙 //
            const checkedPasswordPattern =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_?]).{8,15}$/;
            const checkedPassword = checkedPasswordPattern.test(password);
            if (!checkedPassword) {

                setPasswordPatternError(true);
                setPasswordError(true);
                setPasswordErrorMessage('');
            }
            // description: 카테고리 입력 여부 확인 //
            // const checkedCategory = category.trim().length === 0;
            // if (checkedCategory) {
            // setCategoryError(true);
            // setCategoryErrorMessage('카테고리를 선택해주세요.');
            // } else{
            // setCategoryError(false);
            // setCategoryErrorMessage('');
            // }

            if (checkedEmail || checkedNickname || checkedPasswordLength || checkedPasswordPattern ) return;
            alert('로그인 완료입니다. 메인페이지로 넘어갑니다.');
        }

        //        render : 새로운 계정 생성_정보 입력 페이지 랜더링        //
        return (
            <div className='sing-up-information-card'>
                <div className='sing-up-information-card-top-box'>
                    <div className='auth-top-box'>
                        <div className='godlife-logo-icon-box'>
                            <div className='godlife-logo-icon'></div>
                        </div>
                        <div className='auth-page-text-box'>{passwordEmail}</div>
                    </div>
                    <div className='sing-up-information-card-middle-box'>
                        {passwordError ? (
                        <div className='error-message-container'>
                            <div className='error-logo-image'></div>
                            <div className='error-message-box'>
                                { passwordLenghtError &&  <div className='reset-password-error-message-body-text'>{'비밀번호를 8~15자리를 입력하세요.'}</div>}
                                { passwordPatternError && <div className='reset-password-error-message-body-text'>{'하나 이상의 소문자, 대문자,숫자,특수문자를 포함해야 합니다.'}</div>}
                            </div>
                        </div>    
                        ): (
                            <div></div>
                        )}
                        <div className='sing-up-email-inputbox'>
                            <div className='sing-up-email-inputbox-title'>{'이메일 주소*'}</div>
                            <div className='sing-up-email-change-box'>
                                <div className='sing-up-email-change-box-content'>
                                    <div className='sing-up-email-change-address'>{passwordEmail}</div>
                                    <div className='sing-up-email-change-icon-box' onClick={onEmailReWritingIconClickHandler}>
                                        <div className='sing-up-email-change-icon'></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='sing-up-nickname-inputbox'>
                            <div className='sing-up-nickname-inputbox-title'>{'닉네임*'}</div>
                            <InputBox label={''} type='text' placeholder='닉네임을 입력하세요.' value={nickname} error={nicknameError} errorMessage={nicknameErrorMessage} setValue={setNickname} onButtonClick={onEmailReWritingIconClickHandler} onKeyDown={onNicknameKeyDownHandler} />
                        </div>
                        <div className='sing-up-password-inputbox'>
                            <div className='sing-up-password-inputbox-content'>
                                <div className='sing-up-password-inputbox-title'>{'비밀번호*'}</div>
                                <InputBox label={''} type={passwordType} placeholder='비밀번호를 입력해주세요.' value={password} setValue={setPassword} icon={passwordIcon} error={passwordError} errorMessage={''} onButtonClick={onPasswordIconClickHandler} onKeyDown={onPasswordKeyDownHandler} />
                            </div>
                            <div className='password-security-gage-box'>
                                {!passwordError ? (
                                <div className='security-gage-default'>
                                    <div className='gage1'></div>
                                    <div className='gage2'></div>
                                    <div className='gage3'></div>
                                    <div className='gage4'></div>
                                    <div className='gage5'></div>
                                </div>
                                ) : passwordLenghtError  ? (
                                <div className='security-gage-default'>
                                    <div className='password-error-level1-gage1'></div>
                                    <div className='password-error-level1-gage2'></div>
                                    <div className='password-error-level1-gage3'></div>
                                    <div className='password-error-level1-gage4'></div>
                                    <div className='password-error-level1-gage5'></div>
                                </div>              
                                ) : (
                                <div className='security-gage-default'>
                                    <div className='password-error-level2-gage1'></div>
                                    <div className='password-error-level2-gage2'></div>
                                    <div className='password-error-level2-gage3'></div>
                                    <div className='password-error-level2-gage4'></div>
                                    <div className='password-error-level2-gage5'></div>
                                </div>
                                )}  
                            </div>
                        </div>
                        <div className='sing-up-category-inputbox-not-select'>
                            <div className='sing-up-category-inputbox-top'>
                                <div className='sing-up-category-inputbox-title'>{'카테고리 선택*'}</div>
                            </div>
                            <DropDownSignInCategory value={category} onChange={onStudyCategory1Change} />
                            {categoryError && (<div className='category-error-message'>{categoryErrorMessage}</div>)}
                        </div>
                    </div>
                </div>
                <div className='sing-up-information-card-bottom-box' onClick={onSingUpCompleteButtonClickHandler}>{'계속'}</div>
            </div>
        )
    }
    //        render : 계정인증 메인 랜더링        //
    return (
        <div id='auth-wrapper'>
            <div className='auth-container'>
                {view === 'sign-in-card' && <SignInCard/>}
                {view === 'search-password-card' && <SearchPasswordCard/>}
                {view === 'sing-up-email-card' && <SingUpEmailCard/>}
                {view === 'search-password-email-autentication-card' && <SearchPasswordEmailAutenticationCard/>}
                {view === 'sing-up-email-autentication-card' && <SingUpEmailAutenticationCard/>}
                {view === 'sing-up-information-card' && <SingUpInformationCard/>}
                {view === 'reset-password-card' && <ResetPasswordCard/>}
            </div>
        </div>
    );
    

}
