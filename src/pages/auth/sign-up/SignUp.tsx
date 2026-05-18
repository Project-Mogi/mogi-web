import { useMutation } from '@tanstack/react-query';
import { type ComponentPropsWithoutRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import logo from '@/assets/logos/Logo.png';
import { Header } from '@/components/header';
import { signUp } from '@/features/auth/sign-up/api';
import { getApiErrorMessage } from '@/shared/api/types';

import * as S from './SignUp.style';
import { useSignUpForm } from './useSignUpForm';

export function SignUpPage() {
  const navigate = useNavigate();
  const {
    form,
    step,
    isValid,
    isAccountStepValid,
    goToNextStep,
    handleInputChange,
    handleGenderChange,
    createPayload,
  } = useSignUpForm();

  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      navigate('/login', { replace: true });
    },
  });

  const isSubmitDisabled = signUpMutation.isPending || !isValid;

  const handleSubmit: NonNullable<ComponentPropsWithoutRef<'form'>['onSubmit']> = (event) => {
    event.preventDefault();

    if (step === 'account') {
      goToNextStep();
      return;
    }

    if (isSubmitDisabled) {
      return;
    }

    const payload = createPayload();

    if (payload) {
      signUpMutation.mutate(payload);
    }
  };

  const errorMessage = signUpMutation.error
    ? getApiErrorMessage(signUpMutation.error, '회원가입에 실패했습니다.')
    : '';

  return (
    <S.Page>
      <Header />

      <S.Content>
        <S.Panel>
          <S.Logo src={logo} alt="" aria-hidden="true" />
          <S.Title>회원가입</S.Title>
          <S.Description>모두의기숙사 계정을 생성합니다</S.Description>

          <S.Form onSubmit={handleSubmit}>
            {step === 'account' ? (
              <>
                <S.Field>
                  <S.Label htmlFor="username">아이디</S.Label>
                  <S.Input
                    id="username"
                    name="username"
                    required
                    value={form.username}
                    placeholder="아이디를 입력하세요"
                    autoComplete="off"
                    onChange={handleInputChange}
                  />
                </S.Field>

                <S.Field>
                  <S.Label htmlFor="email">이메일</S.Label>
                  <S.Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    placeholder="이메일을 입력하세요"
                    autoComplete="email"
                    onChange={handleInputChange}
                  />
                </S.Field>

                <S.Field>
                  <S.Label htmlFor="password">비밀번호</S.Label>
                  <S.Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={form.password}
                    placeholder="비밀번호를 입력하세요"
                    autoComplete="off"
                    onChange={handleInputChange}
                  />
                </S.Field>
              </>
            ) : (
              <>
                <S.Field>
                  <S.Label htmlFor="name">이름</S.Label>
                  <S.Input
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    placeholder="이름을 입력하세요"
                    autoComplete="off"
                    onChange={handleInputChange}
                  />
                </S.Field>

                <S.Field>
                  <S.Label htmlFor="studentNumber">학번</S.Label>
                  <S.Input
                    id="studentNumber"
                    name="studentNumber"
                    type="number"
                    min="1"
                    required
                    inputMode="numeric"
                    value={form.studentNumber}
                    placeholder="예: 2401"
                    autoComplete="off"
                    onChange={handleInputChange}
                  />
                </S.Field>

                <S.Field>
                  <S.Label as="span">성별</S.Label>
                  <S.GenderGroup role="radiogroup" aria-label="성별">
                    <S.GenderButton
                      type="button"
                      role="radio"
                      $variant={form.gender === 'BOY' ? 'boy' : 'idle'}
                      aria-checked={form.gender === 'BOY'}
                      onClick={() => handleGenderChange('BOY')}
                    >
                      남학생
                    </S.GenderButton>
                    <S.GenderButton
                      type="button"
                      role="radio"
                      $variant={form.gender === 'GIRL' ? 'girl' : 'idle'}
                      aria-checked={form.gender === 'GIRL'}
                      onClick={() => handleGenderChange('GIRL')}
                    >
                      여학생
                    </S.GenderButton>
                  </S.GenderGroup>
                </S.Field>

                <S.Field>
                  <S.Label htmlFor="roomNumber">방 번호</S.Label>
                  <S.Input
                    id="roomNumber"
                    name="roomNumber"
                    type="number"
                    min="1"
                    required
                    inputMode="numeric"
                    value={form.roomNumber}
                    placeholder="예: 301"
                    autoComplete="off"
                    onChange={handleInputChange}
                  />
                </S.Field>
              </>
            )}

            {errorMessage ? <S.ErrorMessage role="alert">{errorMessage}</S.ErrorMessage> : null}

            <S.SubmitButton
              type="submit"
              disabled={step === 'account' ? !isAccountStepValid : isSubmitDisabled}
            >
              {step === 'account' ? '계속' : signUpMutation.isPending ? '가입 중' : '회원가입'}
            </S.SubmitButton>
          </S.Form>

          <S.GuideText>
            이미 계정이 있으신가요? <Link to="/login">로그인</Link>
          </S.GuideText>
        </S.Panel>
      </S.Content>
    </S.Page>
  );
}
