import axios from 'axios';
import { DeleteStudyMaterialCommentResponseDto, DeleteStudyMaterialResponseDto, DeleteStudyNoticeResponseDto, DeleteStudyToDoListResponseDto, GetStudyMaterialResponseDto, GetStudyNoticeResponseDto, GetUserAttendanceInfomationListResponseDto, PatchStudyMaterialCommentResponseDto, PatchStudyMaterialResponseDto, PatchStudyNoticeResponseDto, PatchStudyToDoListResponseDto, PostStudyMaterialCommentResponseDto, PostStudyMaterialResponseDto, PostStudyNoticeResponseDto, PostStudyToDoListResponseDto } from './response/studyService';
import ResponseDto from './response';
import GetStudyTodoListResponseDto from './response/studyService/get-study-todo-list.response';
import GetStudyMaterialCommentResponseDto from './response/studyService/get-study-material-comment-list.response';
import { PatchStudyMaterialCommentRequestDto, PatchStudyMaterialRequestDto, PatchStudyNoticeRequestDto, PatchStudyTodoListRequestDto, PostStudyMaterialRequestDto, PostStudyTodoListRequestDto } from './request/studyService';
import PostStudyNoticeRequestDto from './request/studyService/post-study-notice.request';
import PostStudyMaterialCommentRequestDto from './request/studyService/post-study-material-comment.request';
import PostUserAttendanceInformationRequestDto from './request/studyService/post-user-attendance-information.request';
import PostUserAttendanceInformationResponseDto from './response/studyService/post-user-attendance-information.response';
import GetStudyResponseDto from './response/study/get-study-response.dto';


const DOMAIN = "http://localhost:4000";

const API_DOMAIN = `${DOMAIN}/api`;

// description: Authorizaition Header //
const authorization = (token: string) => { 
    return { headers: { Authorization: `Bearer ${token}` } };
};


// service




//        description: get study  API end point        //
const GET_STUDY_URL = (studyNumber: string | number) => `${API_DOMAIN}/service/${studyNumber}`;

export const getStudyRequest  =  async  ( studyNumber : string | number, token: string ) =>{
    const result = await axios.get(GET_STUDY_URL(studyNumber),authorization(token))
    .then(response =>{
        const responseBody : GetStudyResponseDto = response.data;
        return responseBody;
    })
    .catch(error =>{
        const responseBody : ResponseDto = error.response.data;
        return responseBody;        
    })
    return result;
};



//        description: get study to do list modal API end point        //
const GET_STUDY_TO_DO_LIST = (studyNumber: string | number) => `${API_DOMAIN}/service/${studyNumber}/study-todo-list`;

export const getStudyToDoListRequest = async (studyNumber : string | number,  token: string ) => {  
    const result = await axios.get(GET_STUDY_TO_DO_LIST(studyNumber),authorization(token))
        .then(response =>{
            const responseBody: GetStudyTodoListResponseDto = response.data;
            return responseBody;
        })
        .catch(error =>{
            const responseBody : ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
}


//        description: get study notice list modal API end point        //
const GET_STUDY_NOTICE_LIST = (studyNumber:string | number ) => `${API_DOMAIN}/service/${studyNumber}/study-notice`;

export const getStudyNoticeListRequest = async (studyNumber : string | number,token: string) =>{
    const result = await axios.get(GET_STUDY_NOTICE_LIST(studyNumber),authorization(token)) 
        .then(response =>{
            const responseBody : GetStudyNoticeResponseDto = response.data;
            return responseBody;
        })
        .catch(error =>{
            const responseBody : ResponseDto = error.response.data;
            return responseBody;
        });
    return result;            
}


//        description: get study material list API end point        //
const GET_STUDY_MATERIAL_LIST_URL = (studyNumber: string |  number) => `${API_DOMAIN}/service/${studyNumber}`;

export const getStudyMaterialListRequest = async (studyNumber: string | number,token: string) =>{
    const result = await axios.get(GET_STUDY_MATERIAL_LIST_URL(studyNumber),authorization(token))
        .then(response =>{
            const responseBody : GetStudyMaterialResponseDto = response.data;
            return responseBody;
        })
        .catch(error =>{
            const responseBody : ResponseDto = error.response.data;
            return responseBody;
        })        
    return result;    
}


//        description: get study material comment list API end point        //
const GET_STUDY_MATERIAL_COMMENT_LIST_URL = (studyNumber: string |  number ) => `${API_DOMAIN}/service/${studyNumber}`;

// GET_STUDY_MATERIAL_COMMENT_LIST_URL
export const getStudyMaterialCommentListRequest = async(studyNumber: string | number,token: string) =>{
    const result = await axios.get(GET_STUDY_MATERIAL_COMMENT_LIST_URL(studyNumber ),authorization(token))
        .then(response =>{
            const responseBody : GetStudyMaterialCommentResponseDto = response.data;
            return responseBody;
        })
        .catch(error =>{
            const responseBody : ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}



//        description: get  user attendance list API end point        //
const GET_USER_ATTENDANCE_LIST_URL = (studyNumber: string | number ) => `${API_DOMAIN}/service/user-attendance-list/${studyNumber}`;

// GET_USER_ATTENDANCE_LIST_URL
export const getUserAttendanceListRequest =  async (studyNumber: string | number,token: string) =>{
    const result = await axios.get(GET_USER_ATTENDANCE_LIST_URL(studyNumber),authorization(token))
        .then( response =>{
            const responseBody : GetUserAttendanceInfomationListResponseDto = response.data;
            const { code } = responseBody;
            return code;
        })
        .catch( error =>{
            const responseBody : ResponseDto = error.response.data;
            const { code } = responseBody;
            return code;
        })
    return result;
}

//        description: post study notice  API end point        //
const POST_STUDY_NOTICE_URL = (studyNumber: string | number) => `${API_DOMAIN}/service/${studyNumber}/study-notice`;

export const postStudyNoticeRequest = async(requestBody: PostStudyNoticeRequestDto,studyNumber : number,token: string) =>{
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


//        description: post study to do  API end point        //
const POST_STUDY_TO_DO_URL = (studyNumber: string |  number) => `${API_DOMAIN}/service/${studyNumber}/study-todo-list`;

export const postStudyToDoRequest = async(requestBody: PostStudyTodoListRequestDto,studyNumber : string | number,token: string) =>{
    const result = await axios.post(POST_STUDY_TO_DO_URL(studyNumber),requestBody,authorization(token))
        .then(response =>{
            const responseBody : PostStudyToDoListResponseDto = response.data;
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

//        description: post study material  API end point        //
const POST_STUDY_MATERIAL_URL = (studyNumber: string |  number) => `${API_DOMAIN}/service/${studyNumber}`;

// POST_STUDY_MATERIAL_URL
export const postStudyMaterialRequest = async (requestBody : PostStudyMaterialRequestDto,studyNumber: number,token: string) =>{
    const result = await axios.post(POST_STUDY_MATERIAL_URL(studyNumber),requestBody,authorization(token))
        .then(response =>{
            const responseBody : PostStudyMaterialResponseDto = response.data;
            const {code} = responseBody;
            return code;            
        })
        .catch(error =>{
            const responseBody : ResponseDto = error.response.data;
            const {code} = responseBody;
            return code;
        })
    return result;
}


//        description: post study material comment list API end point        //
const POST_STUDY_MATERIAL_COMMENT_URL = (studyNumber: string | number, studyMaterialNumber : string | number, studyMaterialCommentNumber :string |  number ) => `${API_DOMAIN}/service/${studyNumber}/${studyMaterialNumber}/study-material-comment-list/${studyMaterialCommentNumber}`;

// POST_STUDY_MATERIAL_COMMENT_URL
export const postStudyMaterialCommentRequest = async( requestBody : PostStudyMaterialCommentRequestDto,studyNumber: string | number,studyMaterialNumber :string | number, studyMaterialCommentNumber : number,token: string) =>{
    const result = await axios.patch(POST_STUDY_MATERIAL_COMMENT_URL(studyNumber,studyMaterialNumber, studyMaterialCommentNumber),requestBody,authorization(token))
        .then(response=>{
            const responseBody : PostStudyMaterialCommentResponseDto = response.data;
            const { code } = responseBody;
            return code;
        })
        .catch(error=>{
            const responseBody : ResponseDto = error.response.data;
            const { code } = responseBody;
            return code;            
        })
    return result;
}

//        description: post user attendance information list API end point        //
const POST_USER_ATTENDANCE_INFORMATION_URL = (studyNumber: string | number) => `${API_DOMAIN}/service/${studyNumber}/user-attendance-information-list`;

// POST_USER_ATTENDANCE_INFORMATION_URL
export const postAttendanceInformationRequest = async(requestBody : PostUserAttendanceInformationRequestDto,studyNumber : string | number,token: string) =>{
    const result = await axios.post(POST_USER_ATTENDANCE_INFORMATION_URL(studyNumber),requestBody,authorization(token)) 
        .then(response =>{
            const responseBody : PostUserAttendanceInformationResponseDto = response.data;
            const { code }  = responseBody;
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


//        description: patch study to do  API end point        //
const PATCH_STUDY_TO_DO_URL = (studyNumber: string | number, studyListnumber: string | number) => `${API_DOMAIN}/service/${studyNumber}/study-todo-list/${studyListnumber}`;


export const patchStudyToDoRequest = async( requestBody :PatchStudyTodoListRequestDto ,studyNumber : string | number, studyListNumber: string | number,token: string) =>{
    const result = await axios.patch(PATCH_STUDY_TO_DO_URL(studyNumber,studyListNumber),requestBody,authorization(token))
        .then(response =>{
            const responseBody : PatchStudyToDoListResponseDto = response.data;
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

//        description: patch study material  API end point        //
const PATCH_STUDY_MATERIAL_URL = (studyNumber: string | number, studyMaterialNumber :string |  number ) => `${API_DOMAIN}/service/${studyNumber}/study-material-list/${studyMaterialNumber}`;


// PATCH_STUDY_MATERIAL_URL
export const patchStudyMaterialRequest = async(requestBody : PatchStudyMaterialRequestDto,studyNumber : string | number, studyMaterialNumber:string | number,token: string) =>{
    const result = await axios.patch(PATCH_STUDY_MATERIAL_URL(studyNumber, studyMaterialNumber),requestBody,authorization(token) )
        .then(response=>{
            const responseBody :  PatchStudyMaterialResponseDto = response.data;
            const { code } = responseBody;
            return code;            
        })
        .catch( error =>{
            const responseBody : ResponseDto = error.response.data;
            const {code} = responseBody;
            return code;
        })
    return result;            
}

//        description: patch study material comment  API end point        //
const PATCH_STUDY_MATERIAL_COMMENT_URL = (studyNumber: string | number, studyMaterialNumber : string | number, studyMaterialCommentNumber : string | number ) => `${API_DOMAIN}/service/${studyNumber}/${studyMaterialNumber}/study-material-comment-list/${studyMaterialCommentNumber}`;

// PATCH_STUDY_MATERIAL_COMMENT_URL
export const patchStudyMaterialRequst = async(requestBody : PatchStudyMaterialCommentRequestDto ,studyNumber: string | number,studyMaterialNumber :string | number, studyMaterialCommentNumber : string | number,token: string) =>{
    const result = await axios.patch(PATCH_STUDY_MATERIAL_COMMENT_URL(studyNumber,studyMaterialNumber, studyMaterialCommentNumber ),requestBody,authorization(token) ) 
        .then(response=>{
            const responseBody : PatchStudyMaterialCommentResponseDto = response.data;
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


//        description: delete study to do  API end point        //
const DELETE_STUDY_TO_DO_LIST_URL = (studyNumber: string | number, studyListnumber: string | number) => `${API_DOMAIN}/service/${studyNumber}/${studyListnumber}/study-todo-list`;

export const deleteStudyToDoRequest = async(studyNumber : string | number, studyListNumber: string | number) =>{
    const result = await axios.delete(DELETE_STUDY_TO_DO_LIST_URL(studyNumber,studyListNumber))
        .then(response =>{
            const responseBody : DeleteStudyToDoListResponseDto = response.data;
            const {code} = responseBody;
            return code;
        })
        .catch(error =>{
            const responseBody : ResponseDto = error.response.data;
            const { code } = responseBody;
            return code;
        })
    return result;
}

//        description: delete study material  API end point        //
const DELETE_STUDY_MATERIAL_URL = (studyNumber: string | number, studyMaterialNumber : string | number ) => `${API_DOMAIN}/service/${studyNumber}/${studyMaterialNumber}/study-material-list`;

// DELETE_STUDY_MATERIAL_URL
export const deleteStudyMaterialRequest =async (studyNumber : string | number, studyMaterialNumber:string | number,token: string) => {
    const result = await axios.delete(DELETE_STUDY_MATERIAL_URL(studyNumber, studyMaterialNumber),authorization(token) )
        .then(response =>{
            const responseBody : DeleteStudyMaterialResponseDto = response.data;
            const { code } = responseBody;
            return code;
        })
        .catch( error =>{
            const responseBody : ResponseDto = error.response.data;
            const {code} = responseBody;
            return code;
        })
    return result;         
}



//        description: delete study notice  API end point        //
const DELETE_STUDY_NOTICE_URL = (studyNumber: string | number, studyNoticeNumber: string | number) => `${API_DOMAIN}/service/${studyNumber}/study-notice/${studyNoticeNumber}`;

// DELETE_STUDY_NOTICE_URL
export const deleteStudyNoticeRequest = async(studyNumber : string | number, studyNoticeNumber: string | number,token: string) =>{
    const result = await axios.delete(DELETE_STUDY_NOTICE_URL(studyNumber, studyNoticeNumber),authorization(token) )
        .then(response =>{
            const responseBody : DeleteStudyNoticeResponseDto = response.data;
            const {code} = responseBody;
            return code;
        })
        .catch( error =>{
            const responseBody : ResponseDto = error.response.data;
            const {code} = responseBody;
            return code;
        })
    return result;    
}


//        description: patch study material comment  API end point        //
const DELETE_STUDY_MATERIAL_COMMENT_URL = (studyNumber: string | number,studyMaterialNumber :string | number, studyMaterialCommentNumber :string |  number ) => `${API_DOMAIN}/service/${studyNumber}/${studyMaterialNumber}/study-material-comment-list /${studyMaterialCommentNumber}`;


// DELETE_STUDY_MATERIAL_COMMENT_URL
export const deleteStudyMaterialCommentRequest = async(studyNumber: string | number,studyMaterialNumber:string | number, studyMaterialCommentNumber : string | number,token: string) =>{
    const result = await axios.delete(DELETE_STUDY_MATERIAL_COMMENT_URL(studyNumber,studyMaterialNumber,  studyMaterialCommentNumber),authorization(token))
        .then(response =>{
            const responseBody : DeleteStudyMaterialCommentResponseDto = response.data;
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