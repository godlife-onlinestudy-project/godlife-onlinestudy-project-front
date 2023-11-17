export default interface StudyModify {
    studyNumber: number;
    studyName: string;
    studyEndDate: string;
    studyPersonal: number;
    studyCategory1: string;
    studyPublicCheck: boolean;
    studyPrivatePassword: string | null;
    studyCoverImageUrl: string | null;
    createStudyUserEmail: string;
}