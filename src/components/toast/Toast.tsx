import * as S from './Toast.style';

type ToastProps = {
  message: string;
};

export function Toast({ message }: ToastProps) {
  if (!message) {
    return null;
  }

  return (
    <S.Toast role="alert" aria-live="assertive">
      <S.Icon aria-hidden="true">
        <S.IconMark />
      </S.Icon>
      <S.Message>{message}</S.Message>
    </S.Toast>
  );
}
