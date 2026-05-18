import styled from 'styled-components';

import * as token from '@/shared/styles/token';

export const Page = styled.main`
  min-height: 100dvh;
  background: ${token.colors.white};
`;

export const Content = styled.section`
  ${token.flexCenter}
  min-height: calc(100dvh - 72px);
  padding: ${token.spacing.xl};

  @media (max-width: 768px) {
    min-height: calc(100dvh - 64px);
    padding: ${token.spacing.lg};
  }
`;

export const Panel = styled.section`
  ${token.flexColumn}
  width: 100%;
  max-width: 420px;
  align-items: center;
  padding: ${token.spacing.xl};
  /* border: 1px solid ${token.colors.blueLine}; */
  border-radius: ${token.radius.lg};
  background: ${token.colors.white};
  /* box-shadow: ${token.shadow.card}; */
`;

export const Logo = styled.img`
  width: 120px;
  height: auto;
  margin-bottom: ${token.spacing.md};
`;

export const Title = styled.h1`
  margin: 0;
  color: ${token.colors.navy};
  ${token.typography('heading')}
`;

export const Description = styled.p`
  margin: ${token.spacing.sm} 0 0;
  color: ${token.colors.navyMuted};
  ${token.typography('body')}
`;

export const Form = styled.form`
  ${token.flexColumn}
  width: 100%;
  gap: ${token.spacing.md};
  margin-top: ${token.spacing.xl};
`;

export const Field = styled.div`
  ${token.flexColumn}
  gap: ${token.spacing.sm};
`;

export const Label = styled.label`
  color: ${token.colors.navy};
  ${token.typography('caption')}
  font-weight: 500;
`;

export const Input = styled.input`
  width: 100%;
  min-height: 48px;
  border: 1px solid ${token.colors.blueLine};
  border-radius: ${token.radius.sm};
  padding: 0 ${token.spacing.md};
  background: ${token.colors.white};
  color: ${token.colors.navy};
  outline: none;
  ${token.typography('caption')}

  &::placeholder {
    color: ${token.colors.gray};
  }

  &:focus {
    border-color: ${token.colors.blue};
    box-shadow: 0 0 0 3px rgba(91, 157, 255, 0.14);
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 1000px ${token.colors.white} inset;
    -webkit-text-fill-color: ${token.colors.navy};
    caret-color: ${token.colors.navy};
  }
`;

export const SubmitButton = styled.button`
  min-height: 48px;
  border: 0;
  border-radius: ${token.radius.sm};
  background: ${token.colors.blue};
  color: ${token.colors.white};
  cursor: pointer;
  ${token.typography('body')}
  font-weight: 600;

  &:hover:not(:disabled) {
    background: ${token.colors.blueHover};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
  }
`;

export const GuideText = styled.p`
  margin: ${token.spacing.lg} 0 0;
  color: ${token.colors.navyMuted};
  ${token.typography('caption')}

  a {
    color: ${token.colors.blue};
    font-weight: 500;
    text-decoration: none;
  }
`;
