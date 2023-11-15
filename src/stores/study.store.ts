import { create } from 'zustand';

interface StudyStore {
    studyName : string;
    studyStartDate : string;
    studyEndDate : string;

    studyPersonal : number;

    studyCategory1 : string;
    studyCategory2 : string | null;
    studyCategory3 :  string | null;

    isStudyPublic : boolean;
    studyPrivatePassword : string | null;
    studyCoverImageUrl : string  | null;

    studyNextStartDatetime : string | null;
    studyNextEndDatetime  : string | null;
    studyTotalDay : number | null;
    createStudyUserEmail : string;

    setStudyName : (studyName : string ) => void;
    setStudyStartDate : ( studyStartDate : string ) => void;
    setStudyEndDate : ( studyEndDate : string ) => void;
    
    setPerson : (studyPersonal : number) => void;

    setStudyCategory1 : ( studyCategory1 : string) => void;
    setStudyCategory2 : ( studyCategory2 :  string | null) => void;
    setStudyCategory3 : ( studyCategory3 :  string | null) => void;    

    setIsStudyPublic : (isStudyPublic : boolean) => void;
    setStudyPrivatePassword : (studyPrivatePassword : string | null ) => void;
    setStudyCoverImageUrl : (studyCoverImageUrl : string | null )=> void;

    setStudyNextStartDatetime : (studyNextStartDatetime : string | null)=> void;
    setStudyNextEndDatetime : (studyNextEndDatetime : string | null)=> void;
    setTotalday : (studyTotalDay : number ) => void;
    setCreateStudyUserEmail : ( createStudyUserEmail : string ) => void;
    resetService: () => void;
}

const useStudyStore = create<StudyStore>((set) => ({
    studyName : '',
    studyStartDate : '',
    studyEndDate :'',

    studyPersonal : 0,
    studyCategory1 :'',
    studyCategory2 :'',
    studyCategory3 :'',

    isStudyPublic : true,
    studyPrivatePassword : '',                       
    studyCoverImageUrl :'',

    studyNextStartDatetime : '',
    studyNextEndDatetime : '',
    studyTotalDay : 0,
    createStudyUserEmail : '',

    setStudyName : (studyName : string ) => {set((state) => ({ ...state, studyName }))},
    setStudyStartDate : ( studyStartDate : string ) => {set((state) => ({ ...state, studyStartDate }))},
    setStudyEndDate : ( studyEndDate : string ) => {set((state) => ({ ...state, studyEndDate }))},

    setPerson : (studyPersonal : number) => {set((state) => ({ ...state, studyPersonal }))},
    
    setStudyCategory1 : ( studyCategory1 : string) =>{set((state) => ({ ...state, studyCategory1 }))},
    setStudyCategory2 : ( studyCategory2 : string  | null) =>{set((state) => ({ ...state, studyCategory2 }))},
    setStudyCategory3 : ( studyCategory3 : string  | null) =>{set((state) => ({ ...state, studyCategory3 }))},

    setIsStudyPublic : (isStudyPublic : boolean) => {set((state) => ({ ...state, isStudyPublic }))},
    setStudyPrivatePassword : (studyPrivatePassword : string | null) => {set((state) => ({ ...state, studyPrivatePassword }))},
    setStudyCoverImageUrl : (studyCoverImageUrl : string | null )=> {set((state) => ({ ...state, studyCoverImageUrl }))},

    setStudyNextStartDatetime :(studyNextStartDatetime : string | null)=> {set((state) => ({ ...state, studyNextStartDatetime }))},
    setStudyNextEndDatetime : (studyNextEndDatetime : string | null)=> {set((state) => ({ ...state, studyNextEndDatetime}))},
    setTotalday : (studyTotalDay : number ) => {set((state) => ({ ...state, studyTotalDay}))},
    setCreateStudyUserEmail : ( createStudyUserEmail : string ) => {set((state) => ({ ...state, createStudyUserEmail }))},

    resetService : () => {set((state) => ({ ...state, studyName: '', studyStartDate: '', studyEndDate: '' , studyPersonal : 0 , studyCategory1 : '',studyCategory2:'', studyCategory3 : '',isStudyPublic : true,
                                            studyPrivatePassword : '', studyCoverImageUrl :'',studyNextStartDatetime: '',studyNextEndDatetime : '', studyTotalDay : 0, createStudyUserEmail:'',
    }))}

}));

export default useStudyStore;