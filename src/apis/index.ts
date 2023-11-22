import axios from 'axios';
import { PatchStudyRequestDto, PostStudyRequestDto } from './request/study';
import { DeleteStudyUserListResponseDto, GetStudyUserListResponseDto, PatchStudyResponseDto, PostStudyResponseDto } from './response/study';
import ResponseDto from './response';
import GetModifyStudyResponseDto from './response/study/get-modify-study.response.dto';

// description: Domain URL //
const DOMAIN = 'http://localhost:4000';

// description: API Domain 주소 //
const API_DOMAIN = `${DOMAIN}/api`;

// description: Authorizaition Header //
const authorization = (token: string) => { 
    return { headers: { Authorization: `Bearer ${token}` } };
    // ! { headers: { Authorization: `Bearer ${token}` } } Bearer 토큰 사용하는 방식
};

// description: get modify study API end point //
const GET_STUDY_MODIFY_URL = (studyNumber: string | number) => `${API_DOMAIN}/main/home/${studyNumber}`;
// description: get study user list API end point //
const GET_STUDY_USER_LIST_URL = (studyNumber: string | number) => `${API_DOMAIN}/main/home/${studyNumber}/study-user-list`;
// description: post study API end point //
const POST_STUDY_URL = () => `${API_DOMAIN}/main/home`;
// description: patch study API end point //
const PATCH_STUDY_URL = (studyNumber: string | number) => `${API_DOMAIN}/main/home/${studyNumber}`;
// description: delete study user list API end point //
const DELETE_STUDY_USER_LIST_URL = (studyNumber: string | number, userEmail: string) => `${API_DOMAIN}/main/home/${studyNumber}/${userEmail}/study-user-list`;


// description: get modify study request //
export const getModifyStudyRequest = async (studyNumber: string | number) => {
    const result = await axios.get(GET_STUDY_MODIFY_URL(studyNumber))
    .then(response => {
        const responseBody: GetModifyStudyResponseDto = response.data;
        return responseBody;
    })
    .catch(error => {
        const responseBody: ResponseDto = error.response.data;
        return responseBody;
    });
    return result;
};

// description: get study user list request //
export const getStudyUserListRequest = async (studyNumber: string | number, token: string) => {
    const result = await axios.get(GET_STUDY_USER_LIST_URL(studyNumber), authorization(token))
    .then(response => {
        const responseBody: GetStudyUserListResponseDto = response.data;
        return responseBody;
    })
    .catch(error => {
        const responseBody: ResponseDto = error.response.data;
        return responseBody;
    });
    return result;
};

// description: post study request //
export const postStudyRequest = async (requestBody: PostStudyRequestDto, token: string) => {
    const result = await axios.post(POST_STUDY_URL(), requestBody, authorization(token))
    .then(response => {
        const resposneBody: PostStudyResponseDto = response.data;
        const { code } = resposneBody;
        return code;
    })
    .catch(error => {
        const responseBody: ResponseDto = error.response.data;
        const { code } = responseBody;
        return code;
    });
    return result;
};

// description: patch study request //
export const patchStudyRequest = async (requestBody: PatchStudyRequestDto, studyNumber: string | number, token: string) => {
    const result = await axios.patch(PATCH_STUDY_URL(studyNumber), requestBody, authorization(token))
    .then(response => {
        const responseBody: PatchStudyResponseDto = response.data;
        const { code } = responseBody;
        return code;
    })
    .catch(error => {
        const responseBody: ResponseDto = error.response.data;
        const { code } = responseBody;
        return code;
    });
    return result;
};

// description: delete study user list request //
export const deleteStudyUserListRequest = async (studyNumber: string | number, userEmail: string, token: string) => {
    const result = await axios.delete(DELETE_STUDY_USER_LIST_URL(studyNumber, userEmail), authorization(token))
        .then(response => {
            const responseBody: DeleteStudyUserListResponseDto = response.data;
            const { code } = responseBody;
            return code;
        })
        .catch(error => {
            const responseBody: ResponseDto = error.response.data;
            const { code } = responseBody;
            return code;
        });
    return result;
}