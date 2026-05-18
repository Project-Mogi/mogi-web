import * as S from './Toast.style';

type ToastProps = {
  message: string;
  isClosing?: boolean;
};

export function Toast({ message, isClosing = false }: ToastProps) {
  if (!message) {
    return null;
  }

  return (
    <S.Toast $isClosing={isClosing} role="alert" aria-live="assertive">
      <S.Icon aria-hidden="true">
        <S.IconMark />
      </S.Icon>
      <S.Message>{message}</S.Message>
    </S.Toast>
  );
}
