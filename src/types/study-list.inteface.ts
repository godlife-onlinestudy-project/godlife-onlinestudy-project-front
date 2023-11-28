export default interface StudyListItem {
    studyNumber: number;
    studyName: string;
    studyStartDate: string;
    studyPersonNumber: number;
    studyEndDate: string;
    studyCategory1: string;
    studyCategory2: string | null;
    studyCategory3: string | null;
    studyPublicCheck: boolean;
    studyPrivatePassword: string | null;
    studyCoverImageUrl: string | null;
    studyNextStartTime: string | null;
    studyNextEndTime: string | null;
    studyTotalDay: number;
}