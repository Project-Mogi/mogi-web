import { type ComponentPropsWithoutRef, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import logo from '@/assets/logos/Logo.png';
import { Header } from '@/components/header';
import { Toast } from '@/components/toast';
import { signIn } from '@/features/auth/sign-in/api';
import { getApiErrorMessage } from '@/shared/api/types';
import { setAuthTokens } from '@/shared/api/token';

import * as S from './SignIn.style';

export function SignInPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState<{
    id: number;
    message: string;
    isClosing: boolean;
  } | null>(null);
  const toastId = toast?.id;

  const signInMutation = useMutation({
    mutationFn: signIn,
    onSuccess: ({ accessToken, refreshToken }) => {
      setAuthTokens({ accessToken, refreshToken });
      navigate(getRedirectPath(location.state), { replace: true });
    },
    onError: (error) => {
      showToast(getApiErrorMessage(error, '아이디 또는 비밀번호가 올바르지 않습니다'));
    },
  });

  const isDisabled = !username.trim() || !password.trim() || signInMutation.isPending;

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
      return;
    }

    signInMutation.mutate({
      username: username.trim(),
      password,
    });
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

            <S.SubmitButton type="submit" disabled={isDisabled}>
              {signInMutation.isPending ? '로그인 중' : '로그인'}
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

function getRedirectPath(state: unknown) {
  if (!state || typeof state !== 'object' || !('from' in state)) {
    return '/conduct';
  }

  const from = state.from;

  if (!from || typeof from !== 'object' || !('pathname' in from)) {
    return '/conduct';
  }

  return typeof from.pathname === 'string' ? from.pathname : '/conduct';
}
