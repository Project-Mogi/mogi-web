import { useMutation } from '@tanstack/react-query';
import { type ComponentPropsWithoutRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import logo from '@/assets/logos/Logo.png';
import { Header } from '@/components/header';
import { Toast } from '@/components/toast';
import { signUp } from '@/features/auth/sign-up/api';
import { getApiErrorMessage } from '@/shared/api/types';

import { useSignUpForm } from './hooks';
import * as S from './SignUp.style';

export function SignUpPage() {
  const navigate = useNavigate();
  const {
    form,
    step,
    isValid,
    isAccountStepFilled,
    goToNextStep,
    getAccountStepError,
    handleInputChange,
    handleGenderChange,
    createPayload,
  } = useSignUpForm();
  const [toast, setToast] = useState<{ id: number; message: string } | null>(null);

  const showToast = (message: string) => {
    setToast({
      id: Date.now(),
      message,
    });
  };

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timerId = window.setTimeout(() => {
      setToast(null);
    }, 2200);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [toast]);

  const signUpMutation = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      navigate('/login', { replace: true });
    },
    onError: (error) => {
      showToast(getApiErrorMessage(error, '회원가입에 실패했습니다.'));
    },
  });

  const isSubmitDisabled = signUpMutation.isPending || !isValid;

  const handleSubmit: NonNullable<ComponentPropsWithoutRef<'form'>['onSubmit']> = (event) => {
    event.preventDefault();

    if (step === 'account') {
      const accountStepError = getAccountStepError();

      if (accountStepError) {
        showToast(accountStepError);
        return;
      }

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

  return (
    <S.Page>
      <Toast key={toast?.id} message={toast?.message ?? ''} />
      <Header />

      <S.Content>
        <S.Panel>
          <S.Logo src={logo} alt="" aria-hidden="true" />
          <S.Title>회원가입</S.Title>
          <S.Description>모두의기숙사 계정을 생성합니다</S.Description>

          <S.Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            {step === 'account' ? (
              <>
                <S.Field>
                  <S.Label htmlFor="signup-user-id">아이디</S.Label>
                  <S.Input
                    id="signup-user-id"
                    name="signup-user-id"
                    data-field="username"
                    required
                    value={form.username}
                    placeholder="아이디를 입력하세요"
                    autoComplete="new-password"
                    onChange={handleInputChange}
                  />
                </S.Field>

                <S.Field>
                  <S.Label htmlFor="signup-email">이메일</S.Label>
                  <S.Input
                    id="signup-email"
                    name="email"
                    data-field="email"
                    type="email"
                    required
                    value={form.email}
                    placeholder="이메일을 입력하세요"
                    autoComplete="email"
                    onChange={handleInputChange}
                  />
                </S.Field>

                <S.Field>
                  <S.Label htmlFor="signup-passcode">비밀번호</S.Label>
                  <S.Input
                    id="signup-passcode"
                    name="signup-passcode"
                    data-field="password"
                    type="password"
                    required
                    value={form.password}
                    placeholder="비밀번호를 입력하세요"
                    autoComplete="new-password"
                    onChange={handleInputChange}
                  />
                </S.Field>
              </>
            ) : (
              <>
                <S.Field>
                  <S.Label htmlFor="signup-name">이름</S.Label>
                  <S.Input
                    id="signup-name"
                    name="signup-name"
                    data-field="name"
                    required
                    value={form.name}
                    placeholder="이름을 입력하세요"
                    autoComplete="off"
                    onChange={handleInputChange}
                  />
                </S.Field>

                <S.Field>
                  <S.Label htmlFor="signup-student-number">학번</S.Label>
                  <S.Input
                    id="signup-student-number"
                    name="signup-student-number"
                    data-field="studentNumber"
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
                  <S.Label htmlFor="signup-room-number">방 번호</S.Label>
                  <S.Input
                    id="signup-room-number"
                    name="signup-room-number"
                    data-field="roomNumber"
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

            <S.SubmitButton
              type="submit"
              disabled={step === 'account' ? !isAccountStepFilled : isSubmitDisabled}
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
