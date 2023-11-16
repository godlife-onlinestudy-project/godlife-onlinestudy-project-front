export default interface PostStudyRequestDto {
    studyName: string;
    studyStartDate: string | null;
    studyEndDate: string | null;
    studyPersonal: number;
    studyCategory1: string;
    studyCategory2: string | null;
    studyCategory3: string | null;
    studyPublicCheck: boolean;
    studyPrivatePassword: string | null;
    studyCoverImageUrl: string | null;
}