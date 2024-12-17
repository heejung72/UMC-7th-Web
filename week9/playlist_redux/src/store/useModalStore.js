import { create } from 'zustand';

const useModalStore = create((set) => ({
  isOpen: false,
  content: '',
  openModal: (content) => set({ isOpen: true, content }),
  closeModal: () => set({ isOpen: false, content: '' }),
}));

export default useModalStore;
