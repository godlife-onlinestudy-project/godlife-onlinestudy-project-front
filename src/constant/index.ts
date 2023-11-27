export const MAIN_PATH = '/main';
export const AUTH_PATH = '/';
export const SERVICE_PATH = (studyNumber: number | string) => `/service/${studyNumber}`;
export const STUDY_CREATE_PATH = '/studycreate'
export const MY_PAGE_PATH = '/mypage/:email';
export const STUDYROOM_DETAIL_PATH = (studyNumber: number | string) => `/studyroom/detail/${studyNumber}`;
export const SEND_EMAIL_PATH = (sendEmailAddress: string) => `/search/${sendEmailAddress}`;



export const SECTION_LAST_MESSAGE = '마지막 섹션입니다.';
export const SECTION_FIRST_MESSAGE = '처음 섹션입니다.'
export const MATERIAL_COMMENT_INPUT_COMPLETE_MESSAGE = "자료 코멘트 입력완료";
export const MATERIAL_COMMENT_CHANGE_COMPLETE_MESSAGE = "자료 코멘트 수정완료";
export const ATTEND_CHECK_COMPLETE_MESSAGE = "출석체크완료";
export const CHAT_INPUT_COMPLETE_MESSAGE = "채팅 입력 완료";
export const CHAT_CHANGE_COMPLETE_MESSAGE = "채팅 수정 완료";
