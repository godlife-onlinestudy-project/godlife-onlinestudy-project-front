import { Study } from 'types';

const studyListMock: Study[] = [
    {
        studyNumber: 2,
        studyName: '스터디방이름입니다.',
        studyStartDate: '2023-11-11',
        studyPersonal: 3,
        studyEndDate: '2023-12-30',
        studyCategory1: '자격증',
        studyCategory2: '회화',
        studyCategory3: null,
        studyPublicCheck: false,
        studyPrivatePassword: '12345678',
        studyCoverImageUrl: 'https://i.namu.wiki/i/7TSH8E_YcM3yoU3SnQsOsdmIAh9CDooK9vUorwPyhEc9388hoqAfbLBPOufF1L-kEOEuySpYmkzJNR4dcoNoJiUGyEwx7iKVmIi0S1jETA1tNMIwJxRxGUMheeLnqaYvzt3V2ulVekNBJTOHmv1n2Q.webp',
        studyNextStartTime: '2023-11-12',
        studyNextEndTime: '2023-12-31',
        studyTotalDay: 90,
        createStudyUserEmail : "email1@email.com"
    },
    {
        studyNumber: 1,
        studyName: '스터디방이름입니다.22',
        studyStartDate: '2023-11-13',
        studyPersonal: 10,
        studyEndDate: '2024-01-02',
        studyCategory1: '취업',
        studyCategory2: '회화',
        studyCategory3: null,
        studyPublicCheck: true,
        studyPrivatePassword: null,
        studyCoverImageUrl: 'https://i.namu.wiki/i/7TSH8E_YcM3yoU3SnQsOsdmIAh9CDooK9vUorwPyhEc9388hoqAfbLBPOufF1L-kEOEuySpYmkzJNR4dcoNoJiUGyEwx7iKVmIi0S1jETA1tNMIwJxRxGUMheeLnqaYvzt3V2ulVekNBJTOHmv1n2Q.webp',
        studyNextStartTime: '2023-12-12',
        studyNextEndTime: '2023-12-31',
        studyTotalDay: 90,
        createStudyUserEmail : "email2@email.com"
    },
    {
        studyNumber: 3,
        studyName: '스터디방이름입니다333333.',
        studyStartDate: '2023-11-11',
        studyPersonal: 3,
        studyEndDate: '2023-12-30',
        studyCategory1: '자격증',
        studyCategory2: '회화',
        studyCategory3: null,
        studyPublicCheck: false,
        studyPrivatePassword: '12345678',
        studyCoverImageUrl: null,
        studyNextStartTime: '2023-11-12',
        studyNextEndTime: '2023-12-31',
        studyTotalDay: 90,
        createStudyUserEmail : "email3@email.com"
    },
];

export default studyListMock;
