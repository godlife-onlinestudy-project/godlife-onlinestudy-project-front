import { useRef, useState, KeyboardEvent, ChangeEvent } from 'react';
import './style.css';
import InputBox from '../../../components/InputBox';

export default function ResetPasswordModal() {

    //          state: 비밀번호 상태          //
    const [password, setPassword] = useState<string>('');
    //          state: 비밀번호 타입 상태          //
    const [passwordType, setPasswordType] = useState<'text' | 'password'>('password');
    //          state: 비밀번호 아이콘 상태          //
    const [passwordIcon, setPasswordIcon] = useState<'eye-on-icon' | 'eye-off-icon'>('eye-off-icon');
    //          state: 비밀번호 입력 노멀 상태          //
    const [passwordDefault, setPasswordDefault] = useState<boolean>(true);
    //          state: 비밀번호 입력 성공 상태          //
    const [passwordSuccess, setPasswordSuccess] = useState<boolean>(false);
    //          state: 비밀번호 에러 상태          //
    const [passwordError, setPasswordError] = useState<boolean>(false);
    //          state: 비밀번호 길이 에러 상태          //
    const [passwordLenghtError, setPasswordLenghtError] = useState<boolean>(false);
    //          state: 비밀번호 패턴 에러 상태          //
    const [passwordPatternError, setPasswordPatternError] = useState<boolean>(false);
    //          state: 비밀번호 에러 메세지 상태          //
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');

    //          state: 비밀번호 확인 입력 요소 참조 상태          //
    const passCheckwordRef = useRef<HTMLInputElement | null>(null);

    //          state: 비밀번호 확인 상태          //
    const [passwordCheck, setPasswordCheck] = useState<string>('');
    //          state: 비밀번호 확인 타입 상태          //
    const [passwordCheckType, setPasswordCheckType] = useState<'text' | 'password'>('password');
    //          state: 비밀번호 확인 아이콘 상태          //
    const [passwordCheckIcon, setPasswordCheckIcon] = useState<'eye-on-icon' | 'eye-off-icon'>('eye-off-icon');
    //          state: 비밀번호 확인 에러 상태          //
    const [passwordCheckError, setPasswordCheckError] = useState<boolean>(false);
    //          state: 비밀번호 확인 에러 메세지 상태          //
    const [passwordCheckErrorMessage, setPasswordCheckErrorMessage] = useState<string>('');

    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setPassword(value);

        setPasswordError(false);
        setPasswordErrorMessage('');
        setPasswordCheckError(false);
        setPasswordCheckErrorMessage('');

        // description: 비밀번호 길이 확인 //
        const checkedPasswordLength = value.trim().length < 8;
        if (checkedPasswordLength) {
            
            setPasswordLenghtError(true);
            setPasswordError(true);
            setPasswordErrorMessage('');
        }

        // description: 비밀번호 조합 및 규칙 //
        const checkedPasswordPattern =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_?]).{8,15}$/;
        const checkedPassword = checkedPasswordPattern.test(value);
        if (!checkedPassword) {

            setPasswordPatternError(true);
            setPasswordError(true);
            setPasswordErrorMessage('');
        }

        if ( checkedPasswordLength || !checkedPassword) return;
        setPasswordSuccess(true);

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

      //          event handler: 비밀번호 확인 아이콘 클릭 이벤트 처리          //
      const onPasswordCheckIconClickHandler = () => {
        if (passwordCheckType === 'text') {
          setPasswordCheckType('password');
          setPasswordCheckIcon('eye-off-icon');
        }
        if (passwordCheckType === 'password') {
          setPasswordCheckType('text');
          setPasswordCheckIcon('eye-on-icon');
        }
      }

    //          event handler : 비밀번호 인풋박스 key down 이벤트 처리            //
    const onPasswordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return;

        // description: 비밀번호 길이 확인 //
        const checkedPasswordLength = password.trim().length < 8;
        if (checkedPasswordLength) {
            setPasswordLenghtError(true);
            setPasswordError(true);
            setPasswordErrorMessage('');
        } else {
            setPasswordLenghtError(false);
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
            setPasswordErrorMessage('');
            
        }

        if ( checkedPasswordLength || !checkedPassword ) {
            setPasswordError(false);
            setPasswordDefault(false);
            setPasswordSuccess(true);
            return;
        }

        if (!passCheckwordRef.current) return;
        passCheckwordRef.current.focus();

    }
    //          event handler : 비밀번호 확인 인풋박스 key down 이벤트 처리            //
    const onPasswordCheckKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return;
        
        onNextStepButtonClickHandler();
    }

    //          event handler: 다음 단계 버튼 클릭 이벤트 처리          //
    const onNextStepButtonClickHandler = () => {
        setPasswordError(false);
        setPasswordErrorMessage('');
        setPasswordCheckError(false);
        setPasswordCheckErrorMessage('');

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

        // description: 비밀번호 일치 여부 확인 //
        const checkedPasswordCheck = password !== passwordCheck;
        if (checkedPasswordCheck) {
            setPasswordCheckError(true);
            setPasswordCheckErrorMessage('비밀번호가 일치하지않습니다.');
        }

        if ( checkedPasswordLength || !checkedPassword || checkedPasswordCheck) return;
        setPasswordSuccess(true);

        alert('완료입니다~!@')
    }


    //        render : 계정인증 메인 랜더링        //
    return(
        <div id='password-modify-modal-wrapper'>
            <div className='password-modify-modal-card'>
                <div className='password-modify-modal-card-close-button-box'>
                    <div className='password-modify-modal-card-close-button-icon'></div>
                </div>
                <div className='password-modify-modal-main'>
                    <div className='password-modify-modal-main-title'>{'비밀번호 수정하기'}</div>
                    <div className='password-modify-modal-main-middle'>
                        <div className='password-modify-modal-main-modify-password'>
                            <div className='password-modify-input-container'>
                                <div className='password-modify-input-box'>
                                    <div className='password-modify-input-title'>{'새 비밀번호 입력'}</div>
                                    <InputBox label='' type={passwordType} placeholder='새 비밀번호를 입력해주세요.' value={password} setValue={setPassword} onChange={onPasswordChangeHandler} icon={passwordIcon} error={passwordError} errorMessage={passwordErrorMessage} onKeyDown={onPasswordKeyDownHandler} onButtonClick={onPasswordIconClickHandler} />
                                </div>
                                <div className='password-security-gage-box'>
                                    {
                                    passwordLenghtError ? (
                                    <div className='security-gage-default'>
                                        <div className='password-error-level1-gage1'></div>
                                        <div className='password-error-level1-gage2'></div>
                                        <div className='password-error-level1-gage3'></div>
                                        <div className='password-error-level1-gage4'></div>
                                        <div className='password-error-level1-gage5'></div>
                                    </div>
                                    ) :
                                    passwordPatternError ? (
                                    <div className='security-gage-default'>
                                        <div className='password-error-level2-gage1'></div>
                                        <div className='password-error-level2-gage2'></div>
                                        <div className='password-error-level2-gage3'></div>
                                        <div className='password-error-level2-gage4'></div>
                                        <div className='password-error-level2-gage5'></div>
                                    </div>
                                    ) :
                                    passwordSuccess ? (
                                    <div className='security-gage-default'>
                                        <div className='password-success-gage1'></div>
                                        <div className='password-success-gage1'></div>
                                        <div className='password-success-gage1'></div>
                                        <div className='password-success-gage1'></div>
                                        <div className='password-success-gage1'></div>
                                    </div>
                                    ) : (
                                    <div className='security-gage-default'>
                                        <div className='gage1'></div>
                                        <div className='gage2'></div>
                                        <div className='gage3'></div>
                                        <div className='gage4'></div>
                                        <div className='gage5'></div>
                                    </div>
                                    )
                                    }
                                </div>
                            </div>
                            <div className='password-modify-check-input-container'>
                                <div className='password-modify-check-input-title'>{'새 비밀번호 입력 확인'}</div>
                                <InputBox ref={passCheckwordRef} label='' type={passwordCheckType} placeholder='비밀번호를 다시 입력해주세요.' value={passwordCheck} setValue={setPasswordCheck} icon={passwordCheckIcon} error={passwordCheckError} errorMessage={passwordCheckErrorMessage} onKeyDown={onPasswordCheckKeyDownHandler} onButtonClick={onPasswordCheckIconClickHandler} />
                            </div>
                        </div>
                        <div className='password-modify-modal-main-modify-password-complete-button-box'>
                            <div className='password-modify-modal-main-modify-password-complete-button' onClick={onNextStepButtonClickHandler}>{'완료'}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}