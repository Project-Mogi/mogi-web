import { type ComponentPropsWithoutRef, useState } from 'react';
import { Link } from 'react-router-dom';

import logo from '@/assets/logos/Logo.png';
import { Header } from '@/components/header';

import * as S from './SignIn.style';

export function SignInPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const isDisabled = !username.trim() || !password.trim();

  const handleSubmit: NonNullable<ComponentPropsWithoutRef<'form'>['onSubmit']> = (event) => {
    event.preventDefault();
  };

  return (
    <S.Page>
      <Header />

      <S.Content>
        <S.Panel>
          <S.Logo src={logo} alt="" aria-hidden="true" />
          <S.Title>모두의기숙사</S.Title>
          <S.Description>기숙사 통합 관리 플랫폼</S.Description>

          <S.Form onSubmit={handleSubmit}>
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
