import styled from 'styled-components';

import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';

export function LoginPage() {
  return (
    <Page>
      <LoginPanel>
        <Title>로그인</Title>
        <Description>사감 계정으로 로그인해 주세요.</Description>

        <Form>
          <Input label="아이디" placeholder="아이디를 입력하세요" />
          <Input label="비밀번호" placeholder="비밀번호를 입력하세요" type="password" />
          <Button type="button">로그인</Button>
        </Form>
      </LoginPanel>
    </Page>
  );
}

const Page = styled.main`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.background};
`;

const LoginPanel = styled.section`
  width: 100%;
  max-width: 420px;
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.radius.xl};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadow.card};
`;

const Title = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.title.fontSize};
  font-weight: ${({ theme }) => theme.typography.title.fontWeight};
  line-height: ${({ theme }) => theme.typography.title.lineHeight};
`;

const Description = styled.p`
  margin: ${({ theme }) => theme.spacing.sm} 0 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;
