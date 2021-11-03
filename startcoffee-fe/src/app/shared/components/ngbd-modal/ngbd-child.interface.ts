export interface ModalChild {
  name: string;
  content: string;
  rightButtonName: string;
  leftButtonName?: string;
  modalButtonLeftColor?: string;
  modalButtonRightColor?: string;
  onConfirm(obj: any): void;
  onClose(): void;
}
