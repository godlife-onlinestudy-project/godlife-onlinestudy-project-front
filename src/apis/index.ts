import axios from "axios";
import {
  DeleteUserToDoListResponseDto,
  GetUserToDoListResponseDto,
  PatchUserToDoListResponseDto,
} from "./dto/response/user";
import ResponseDto from "./dto/response";
import {
  PatchUserToDoListRequestDto,
  PostUserToDoListRequestDto,
} from "./dto/request/user";
import PostUserToDoListResponseDto from "./dto/response/user/post-user-todolist.response.dto";
import { GetStudyResponseDto, GetTop5StudyListResponseDto } from "./dto/response/study";
import {
  GetSignInUserResponseDto,
  GetUserResponseDto,
} from "./dto/response/user";
import {
  SendAuthenticateCodeCheckRequestDto,
  SendAuthenticateCodeRequestDto,
  SignInEmailCheckRequestDto,
  SignInRequestDto,
  SignUpRequestDto,
} from "./dto/request/auth";
import {
  SendAuthenticateCodeCheckResponseDto,
  SendAuthenticateCodeResponseDto,
  SignInEmailCheckResponseDto,
  SignInResponseDto,
  SignUpResponseDto,
} from "./dto/response/auth";
import GetSearchStudyListResponseDto from "./dto/response/study/get-search-study-list.response.dto";
import GetSearchWordStudyListResponseDto from "./dto/response/study/get-search-word-study-list.response.dto";
import { PatchStudyRequestDto, PostStudyRequestDto } from "./dto/request/study";
import {
  DeleteStudyUserListResponseDto,
  GetStudyUserListResponseDto,
  PatchStudyResponseDto,
  PostStudyResponseDto,
} from "./dto/response/study";
import GetModifyStudyResponseDto from "./dto/response/study/get-modify-study.response.dto";
import GetStudyNoticeListResponseDto from "./dto/response/studyService/get-study-notice-list.response";
import { PatchStudyNoticeRequestDto, PostStudyNoticeRequestDto } from "./dto/request/studyService";
import { PatchStudyNoticeResponseDto, PostStudyNoticeResponseDto } from "./dto/response/studyService";

//        description: Domain URL       //
const DOMAIN = "https://api.godlifestudy.co.kr";

//        description: API Domain 주소       //
const API_DOMAIN = `${DOMAIN}/api`;

//        description: Authorizaition Header        //
const authorization = (token: string) => {
  return { headers: { Authorization: `Bearer ${token}` } };
};

// description: sigin in API end point //
const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;
// description: sign in email check API end point //
const SIGN_IN_EMAIL_CHECK_URL = () => `${API_DOMAIN}/auth/sign-in-email-check`;
// description: sign up API end point //
const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;
// description: sign up send authentication code API end point //
const SIGN_UP_SEND_AUTHENTICATION_CODE_URL = () => `${API_DOMAIN}/auth/send-authenticate-code`;
// description: sign up send authentication code API end point //
const SIGN_UP_SEND_AUTHENTICATION_CODE_CHECK_URL = () => `${API_DOMAIN}/auth/send-authenticate-code-check`;

// description: get modify study API end point //
const GET_STUDY_MODIFY_URL = (studyNumber: string | number) =>
  `${API_DOMAIN}/service/${studyNumber}/modify-study`;
// description: get study user list API end point //
const GET_STUDY_USER_LIST_URL = (studyNumber: string | number) =>
  `${API_DOMAIN}/service/${studyNumber}/study-user-list`;
// description: post study API end point //
const POST_STUDY_URL = () => `${API_DOMAIN}/studycreate`;
// description: patch study API end point //
const PATCH_STUDY_URL = (studyNumber: string | number) =>
  `${API_DOMAIN}/service/${studyNumber}/modify-study`;
// description: delete study user list API end point //
const DELETE_STUDY_USER_LIST_URL = (
  studyNumber: string | number,
  userEmail: string
) => `${API_DOMAIN}/service/${studyNumber}/${userEmail}/study-user-list`;

//        description: get user to do list API end point       //
const GET_USER_TO_DO_LIST_URL = (userlistdatetime: string) =>
  `${API_DOMAIN}/main/user-todolist/${userlistdatetime}`;

//        description: patch user to do list API end point        //
const PATCH_USER_TO_DO_LIST_URL = (
  userlistdatetime: string,
  userlistnumber: string | number
) => `${API_DOMAIN}/main/user-todolist/${userlistdatetime}/${userlistnumber}`;

//        description: post user to do list API end point       //
const POST_USER_TO_DO_LIST_URL = () => `${API_DOMAIN}/main/user-todolist/post`;

//        description: delete user to do list API end point       //
const DELETE_USER_TO_DO_LIST_URL = (userlistnumber: number[]) =>
  `${API_DOMAIN}/main/user-todolist/${userlistnumber}`;

//        description: get top 5 study list API end point       //
const GET_TOP_5_STUDY_LIST_URL = (studyCategory1: string) =>
  `${API_DOMAIN}/main/top-5/${studyCategory1}`;

//        description: get search study list API end point        //
const GET_SEARCH_STUDY_LIST_URL = () => `${API_DOMAIN}/main/search`;

//        description: get search word study list API end point       //
const GET_SEARCH_WORD_STUDY_LIST_URL = (studyName: string) =>
  `${API_DOMAIN}/main/search/${studyName}`;

// description: healthcheck API end point //
const HEALTHCHECK_URL = () => `${DOMAIN}/healthcheck`;

// description: Check server health status //
export const checkHealthStatus = async () => {
  try {
    const response = await axios.get(HEALTHCHECK_URL());
    return response.status;
  } catch (error) {
    return null;
  }
};

// description: sign in email chesck request //
export const signInEmailCheckRequest = async (
  requestBody: SignInEmailCheckRequestDto
) => {
  const result = await axios
    .post(SIGN_IN_EMAIL_CHECK_URL(), requestBody)
    .then((response) => {
      const responseBody: SignInEmailCheckResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

// description: sign in request //
export const signInRequest = async (requestBody: SignInRequestDto) => {
  const result = await axios
    .post(SIGN_IN_URL(), requestBody)
    .then((response) => {
      const responseBody: SignInResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

// description: sign up request //
export const signUpRequest = async (requestBody: SignUpRequestDto) => {
  const result = await axios
    .post(SIGN_UP_URL(), requestBody)
    .then((response) => {
      const responseBody: SignUpResponseDto = response.data;
      const { code } = responseBody;
      return code;
    })
    .catch((error) => {
      const responseBody: ResponseDto = error.response.data;
      const { code } = responseBody;
      return code;
    });
  return result;
};

// description: sign up send authentication code request //
export const sendAuthenticationCodeRequest = async (requesBody : SendAuthenticateCodeRequestDto) => {
  const result = await axios
    .post(SIGN_UP_SEND_AUTHENTICATION_CODE_URL(), requesBody)
    .then((response) => {
      const responseBody : SendAuthenticateCodeResponseDto = response.data;
      const { code } = responseBody;
      return code;
    })
    .catch((error) => {
      const responseBody: ResponseDto = error.response.data;
      const { code } = responseBody;
      return code;
    });
    return result;
};
// description: sign up send authentication code check request //
export const sendAuthenticateCodeCheckRequest = async (requestBody : SendAuthenticateCodeCheckRequestDto) => {
  const result = await axios
    .post(SIGN_UP_SEND_AUTHENTICATION_CODE_CHECK_URL(), requestBody)
    .then((response) => {
      const responseBody : SendAuthenticateCodeCheckResponseDto = response.data;
      const { code } = responseBody;
      return code;
    })
    .catch((error) => {
      const responseBody : ResponseDto = error.response.data;
      const { code } = responseBody;
      return code;
    });
  return result;
};

// description: get modify study request //
export const getModifyStudyRequest = async (studyNumber: string | number, token: string) => {
  const result = await axios.get(GET_STUDY_MODIFY_URL(studyNumber), authorization(token))
  .then(response => {
      const responseBody: GetModifyStudyResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

// description: get study user list request //
export const getStudyUserListRequest = async (
  studyNumber: string | number,
  token: string
) => {
  const result = await axios
    .get(GET_STUDY_USER_LIST_URL(studyNumber), authorization(token))
    .then((response) => {
      const responseBody: GetStudyUserListResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

//        description: get user todolist request       //
export const getUserToDoListRequest = async (
  userlistdatetime: string,
  token: string
) => {
  const result = await axios
    .get(GET_USER_TO_DO_LIST_URL(userlistdatetime), authorization(token))
    .then((response) => {
      const responseBody: GetUserToDoListResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

// description: post study request //
export const postStudyRequest = async (
  requestBody: PostStudyRequestDto,
  token: string
) => {
  const result = await axios
    .post(POST_STUDY_URL(), requestBody, authorization(token))
    .then((response) => {
      const resposneBody: PostStudyResponseDto = response.data;
      const { code } = resposneBody;
      return code;
    })
    .catch((error) => {
      const responseBody: ResponseDto = error.response.data;
      const { code } = responseBody;
      return code;
    });
  return result;
};

//        description: post user todolist request       //
export const postUserToDoListRequest = async (
  requestBody: PostUserToDoListRequestDto,
  token: string
) => {
  const result = await axios
    .post(POST_USER_TO_DO_LIST_URL(), requestBody, authorization(token))
    .then((response) => {
      const responseBody: PostUserToDoListResponseDto = response.data;
      const { code } = responseBody;
      return code;
    })
    .catch((error) => {
      const responseBody: ResponseDto = error.response.data;
      const { code } = responseBody;
      return code;
    });
  return result;
};

// description: patch study request //
export const patchStudyRequest = async (
  requestBody: PatchStudyRequestDto,
  studyNumber: string | number,
  token: string
) => {
  const result = await axios
    .patch(PATCH_STUDY_URL(studyNumber), requestBody, authorization(token))
    .then((response) => {
      const responseBody: PatchStudyResponseDto = response.data;
      const { code } = responseBody;
      return code;
    })
    .catch((error) => {
      const responseBody: ResponseDto = error.response.data;
      const { code } = responseBody;
      return code;
    });
  return result;
};

//        description: patch user todolist request        //
export const patchUserToDoListRequest = async (
  requestBody: PatchUserToDoListRequestDto,
  userlistdatetime: string,
  userlistnumber: string | number,
  token: string
) => {
  const result = await axios
    .patch(
      PATCH_USER_TO_DO_LIST_URL(userlistdatetime, userlistnumber),
      requestBody,
      authorization(token)
    )
    .then((response) => {
      const responseBody: PatchUserToDoListResponseDto = response.data;
      const { code } = responseBody;
      return code;
    })
    .catch((error) => {
      const responseBody: ResponseDto = error.response.data;
      const { code } = responseBody;
      return code;
    });
  return result;
};

//        description: delete user todolist requset       //
export const deleteUserToDoListRequest = async (
  userListNumber: number[],
  token: string
) => {
  const result = await axios
    .delete(DELETE_USER_TO_DO_LIST_URL(userListNumber), authorization(token))
    .then((response) => {
      const responseBody: DeleteUserToDoListResponseDto = response.data;
      const { code } = responseBody;
      return code;
    })
    .catch((error) => {
      const responseBody: ResponseDto = error.response.data;
      const { code } = responseBody;
      return code;
    });
  return result;
};

// description: delete study user list request //
export const deleteStudyUserListRequest = async (
  studyNumber: string | number,
  userEmail: string,
  token: string
) => {
  const result = await axios
    .delete(
      DELETE_STUDY_USER_LIST_URL(studyNumber, userEmail),
      authorization(token)
    )
    .then((response) => {
      const responseBody: DeleteStudyUserListResponseDto = response.data;
      const { code } = responseBody;
      return code;
    })
    .catch((error) => {
      const responseBody: ResponseDto = error.response.data;
      const { code } = responseBody;
      return code;
    });
  return result;
};

//        description: get top 5 study list request       //
export const getTop5StudyListRequest = async (
  studyCategory1: string,
  token: string
) => {
  const result = await axios
    .get(GET_TOP_5_STUDY_LIST_URL(studyCategory1), authorization(token))
    .then((response) => {
      const responseBody: GetTop5StudyListResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

//        description: get search study list request        //
export const getSearchStudyListRequest = async (token: string) => {
  const result = await axios
    .get(GET_SEARCH_STUDY_LIST_URL(), authorization(token))
    .then((response) => {
      const responseBody: GetSearchStudyListResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

//        description: get search word study list request       //
export const getSearchWordStudyListRequest = async (
  studyName: string,
  token: string
) => {
  const result = await axios
    .get(GET_SEARCH_WORD_STUDY_LIST_URL(studyName), authorization(token))
    .then((response) => {
      const responseBody: GetSearchWordStudyListResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};






// description: get sign in user API end point //
const GET_SIGN_IN_USER_URL = () => `${API_DOMAIN}/user`;
// description: get user API end point //
const GET_USER_URL = (email: string) => `${API_DOMAIN}/user/${email}`;

// description: get sign in user request //
export const getSignInUserRequest = async (token: string) => {
  const result = await axios
    .get(GET_SIGN_IN_USER_URL(), authorization(token))
    .then((response) => {
      const responseBody: GetSignInUserResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });
  return result;
};

// description: get user request //
export const getUserRequest = async (email: string) => {
  const result = await axios
    .get(GET_USER_URL(email))
    .then((response) => {
      const responseBody: GetUserResponseDto = response.data;
      return responseBody;
    })
    .catch((error) => {
      const responseBody: ResponseDto = error.response.data;
      return responseBody;
    });

  return result;
};

//        description: get study  API end point        //
const GET_STUDY_URL = (studyNumber: string | number) => `${API_DOMAIN}/service/${studyNumber}`;

export const getStudyRequest  =  async  ( studyNumber : string | number, token: string ) =>{
    const result = await axios.get(GET_STUDY_URL(studyNumber),authorization(token))
    .then(response =>{
        const responseBody : GetStudyResponseDto = response.data;
        console.log(responseBody);
        return responseBody;
    })
    .catch(error =>{
        const responseBody : ResponseDto = error.response.data;
        console.log(responseBody);
        return responseBody;        
    })
    return result;
};


//        description: get study notice list  API end point        //
const GET_STUDY_NOTICE_LIST = (studyNumber:string | number ) => `${API_DOMAIN}/service/${studyNumber}/notice`;
// GetStudyNoticeListResponseDto

export const getStudyNoticeListRequest = async (studyNumber : string | number,token: string) =>{
  const result = await axios.get(GET_STUDY_NOTICE_LIST(studyNumber),authorization(token)) 
      .then((response) =>{
        const responseBody : GetStudyNoticeListResponseDto = response.data;
        return responseBody;
      })
      .catch((error) =>{
        const responseBody : ResponseDto = error.response.data;
        return responseBody;
      });
  return result;            
}

//        description: post study notice   API end point        //
const POST_STUDY_NOTICE_URL = (studyNumber: string | number) => `${API_DOMAIN}/service/${studyNumber}/study-notice`;

export const postStudyNoticeRequest = async(requestBody: PostStudyNoticeRequestDto,studyNumber : number |string,token: string) =>{
    const result = await axios.post(POST_STUDY_NOTICE_URL(studyNumber ),requestBody,authorization(token))
        .then(response =>{
            const responseBody : PostStudyNoticeResponseDto = response.data;
            const { code } = responseBody;
            return code;
        })
        .catch(error =>{
            const responseBody : ResponseDto = error.response.data;
            const { code } = responseBody;
            return code;
        })
    return result;
}

//        description: patch study notice  API end point        //
const PATCH_STUDY_NOTICE_URL = (studyNumber: string | number, studyNoticeNumber:string |  number) => `${API_DOMAIN}/service/${studyNumber}/study-notice/${studyNoticeNumber}`;

export const patchStudyNoticeRequest = async(requestBody : PatchStudyNoticeRequestDto ,studyNumber :string |  number, studyNoticeNumber: string | number,token: string) =>{
    const result = await axios.patch(PATCH_STUDY_NOTICE_URL(studyNumber,studyNoticeNumber ),requestBody,authorization(token) )
        .then(response =>{
            const responseBody : PatchStudyNoticeResponseDto = response.data;
            const { code } = responseBody;
            return code;
        })
        .catch(error =>{
            const responseBody : ResponseDto = error.response.data;
            const { code } = responseBody;
            return code;
        })
    return result;
  }

//        description: delete study notice  API end point        //
const DELETE_STUDY_NOTICE_URL = (studyNumber: string | number, studyNoticeNumber: string | number) => `${API_DOMAIN}/service/${studyNumber}/study-notice/${studyNoticeNumber}`;

// DELETE_STUDY_NOTICE_URL

