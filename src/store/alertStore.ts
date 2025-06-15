import { create } from 'zustand';

type AlertType = 'success' | 'info' | 'warning' | 'error';

interface AlertStore {
  visible: boolean;
  message: string;
  description?: string;
  type: AlertType;
  show: ( type: AlertType, message: string, description?: string) => void;
  close: () => void;
}

export const useAlertStore = create<AlertStore>((set) => ({
  visible: false,
  message: '',
  description: '',
  type: 'info' as AlertType,
  show: (type: AlertType, message: string, description?: string) =>
    set({ visible: true, message, description, type }),
  close: () => set({ visible: false }),
}));
