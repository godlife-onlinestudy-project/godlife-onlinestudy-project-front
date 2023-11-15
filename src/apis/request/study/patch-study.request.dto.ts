export default interface PostStudyRequestDto {
    // studyNumber: number;
    studyName: string;
    studyStartDate: string;
    studyEndDate: string;
    studyPersonal: number;
    studyCategory1: string;
    studyCategory2: string | null;
    studyCategory3: string | null;
    studyPublicCheck: boolean;
    studyPrivatePassword: string | null;
    studyCoverImageUrl: string | null;
    // createStudyUserEmail: string;
}