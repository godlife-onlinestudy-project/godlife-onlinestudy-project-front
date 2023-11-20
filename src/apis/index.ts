import axios from 'axios';
import { GetUserToDoListResponseDto, PatchUserToDoListResponseDto } from './dto/response/user';
import ResponseDto from './dto/response';
import { PatchUserToDoListRequestDto, PostUserToDoListRequestDto } from './dto/request';
import PostUserToDoListResponseDto from './dto/response/user/post-user-todolist.response.dto';

//        description: Domain URL       //
const DOMAIN = 'http://localhost:4000';

//        description: API Domain 주소       //
const API_DOMAIN = `${DOMAIN}/api`;

//        description: Authorizaition Header        //
const authorization = (token: string) => { 
  return { headers: { Authorization: `Bearer ${token}` } };
};

//        description: get user to do list API end point       //
const GET_USER_TO_DO_LIST_URL = (userlistdatetime: string) => `${API_DOMAIN}/main/user-todolist/${userlistdatetime}`;

//        description: patch user to do list API end point        //
const PATCH_USER_TO_DO_LIST_URL = (userlistdatetime: string, userlistnumber: string | number) => `${API_DOMAIN}/main/user-todolist/${userlistdatetime}/${userlistnumber}`;

//        description: post user to do list API end point       //
const POST_USER_TO_DO_LIST_URL = () => `${API_DOMAIN}/main/user-todolist/post`

//        description: get user todolist request       //
export const getUserToDoListRequest = async (userlistdatetime: string, token: string) => {
  const result = await axios.get(GET_USER_TO_DO_LIST_URL(userlistdatetime), authorization(token))
      .then(response => {
          const responseBody: GetUserToDoListResponseDto = response.data;
          return responseBody;
      })
      .catch(error => {
          const responseBody: ResponseDto = error.response.data;
          return responseBody;
      });
  return result;
};

//        description: patch user todolist request        //
export const patchUserToDoListRequest = async (requestBody: PatchUserToDoListRequestDto, userlistdatetime: string, userlistnumber: string | number, token: string) => {
  const result = await axios.patch(PATCH_USER_TO_DO_LIST_URL(userlistdatetime, userlistnumber), requestBody, authorization(token))
    .then(response => {
      const responseBody: PatchUserToDoListResponseDto = response.data;
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

//        description: post user todolist request       //
export const postUserToDoListRequest = async (requestBody: PostUserToDoListRequestDto, token: string) => {
  const result = await axios.post(POST_USER_TO_DO_LIST_URL(), requestBody, authorization(token))
    .then(response => {
      const responseBody: PostUserToDoListResponseDto = response.data;
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