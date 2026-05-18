import { type ComponentPropsWithoutRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import logo from '@/assets/logos/Logo.png';
import { Header } from '@/components/header';
import { Toast } from '@/components/toast';

import * as S from './SignIn.style';

export function SignInPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState<{
    id: number;
    message: string;
    isClosing: boolean;
  } | null>(null);
  const toastId = toast?.id;

  const showToast = (message: string) => {
    setToast({
      id: Date.now(),
      message,
      isClosing: false,
    });
  };

  useEffect(() => {
    if (!toastId) {
      return;
    }

    const closeTimerId = window.setTimeout(() => {
      setToast((currentToast) =>
        currentToast?.id === toastId ? { ...currentToast, isClosing: true } : currentToast,
      );
    }, 2000);

    const removeTimerId = window.setTimeout(() => {
      setToast((currentToast) => (currentToast?.id === toastId ? null : currentToast));
    }, 2200);

    return () => {
      window.clearTimeout(closeTimerId);
      window.clearTimeout(removeTimerId);
    };
  }, [toastId]);

  const handleSubmit: NonNullable<ComponentPropsWithoutRef<'form'>['onSubmit']> = (event) => {
    event.preventDefault();

    if (!username.trim() || !password.trim()) {
      showToast('아이디와 비밀번호를 입력해 주세요');
    }
  };

  return (
    <S.Page>
      <Toast key={toast?.id} message={toast?.message ?? ''} isClosing={toast?.isClosing} />
      <Header />

      <S.Content>
        <S.Panel>
          <S.Logo src={logo} alt="" aria-hidden="true" />
          <S.Title>모두의기숙사</S.Title>
          <S.Description>기숙사 통합 관리 플랫폼</S.Description>

          <S.Form noValidate onSubmit={handleSubmit}>
            <S.Field>
              <S.Label htmlFor="username">아이디</S.Label>
              <S.Input
                id="username"
                value={username}
                placeholder="아이디를 입력하세요"
                autoComplete="username"
                onChange={(event) => setUsername(event.target.value)}
              />
            </S.Field>

            <S.Field>
              <S.Label htmlFor="password">비밀번호</S.Label>
              <S.Input
                id="password"
                type="password"
                value={password}
                placeholder="비밀번호를 입력하세요"
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </S.Field>

            <S.SubmitButton type="submit">
              로그인
            </S.SubmitButton>
          </S.Form>

          <S.GuideText>
            계정이 없으신가요? <Link to="/signup">회원가입</Link>
          </S.GuideText>
        </S.Panel>
      </S.Content>
    </S.Page>
  );
}
