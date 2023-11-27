import { create } from 'zustand';

interface modalSideManageStore {
    selectedOption: string | null;
    setSelectedOption: (selectedOption: string) => void;
}

const useModalSideManageStore = create<modalSideManageStore>((set) => ({
    selectedOption: 'study',
    setSelectedOption : (selectedOption : string) => set((state) => ({...state, selectedOption})),
}));

export default useModalSideManageStore;