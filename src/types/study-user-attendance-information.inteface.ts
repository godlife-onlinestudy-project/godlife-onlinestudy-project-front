export default interface StudyUserAttendanceInformationItem{
    studyNumber : number;
    userEmail : string;
    studyGrade : string;
    userProfileImageUrl : string | null;
    studyNickName : string;
    userAttendanceCheck : string;
    ownerAttendanceStart : string;
}