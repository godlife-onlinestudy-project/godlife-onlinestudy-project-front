export default interface PatchStudyRequestDto {
    studyName: string;
    studyEndDate: string;
    studyPersonal: number;
    studyCategory1: string;
    studyPublicCheck: boolean;
    studyPrivatePasword: string | null;
    studyCoverImageUrl: string | null;
}