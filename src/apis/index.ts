import axios from 'axios';
import { PostStudyRequestDto } from './request/study';
import { PostStudyResponseDto } from './response/study';
import ResponseDto from './response';

// description: Domain URL //
const DOMAIN = 'http://localhost:4000/api';

// description: API Domain 주소 //
const API_DOMAIN = `${DOMAIN}/api/`;

// description: Authorizaition Header //
const authorization = (token: string) => { 
    return { headers: { Authorization: `Bearer ${token}` } };
    // ! { headers: { Authorization: `Bearer ${token}` } } Bearer 토큰 사용하는 방식
};

// description: post study API end point //
const POST_STUDY_URL = () => `${API_DOMAIN}/main/home`;

// description: post study request //
export const PostStudyRequest = async (requestBody: PostStudyRequestDto, token: string) => {
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
}