import * as S from './Toast.style';

export type ToastVariant = 'error' | 'success';

type ToastProps = {
  message: string;
  isClosing?: boolean;
  variant?: ToastVariant;
};

export function Toast({ message, isClosing = false, variant = 'error' }: ToastProps) {
  if (!message) {
    return null;
  }

  return (
    <S.Toast $isClosing={isClosing} role="alert" aria-live="assertive">
      <S.Icon $variant={variant} aria-hidden="true">
        <S.IconMark $variant={variant} />
      </S.Icon>
      <S.Message>{message}</S.Message>
    </S.Toast>
  );
}
