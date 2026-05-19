import styled from 'styled-components';

import * as token from '@/shared/styles/token';

export const Page = styled.main`
  min-height: 100dvh;
  box-sizing: border-box;
  padding: calc(72px + ${token.spacing.xl}) ${token.spacing.xl} ${token.spacing.xl};
  background: ${token.colors.white};

  @media (max-width: 768px) {
    padding: calc(64px + ${token.spacing.lg}) ${token.spacing.lg} ${token.spacing.lg};
  }
`;

export const Content = styled.section`
  display: flex;
  min-height: calc(100dvh - 72px - (${token.spacing.xl} * 2));
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding-bottom: 72px;
  text-align: center;

  @media (max-width: 768px) {
    min-height: calc(100dvh - 64px - (${token.spacing.lg} * 2));
    padding-bottom: 40px;
  }
`;

export const Title = styled.h1`
  margin: ${token.spacing.sm} 0 0;
  color: ${token.colors.navy};
  font-size: 30px;
  font-weight: 600;
  line-height: 38px;

  @media (max-width: 768px) {
    font-size: 24px;
    line-height: 32px;
  }
`;

export const Mark = styled.div`
  position: relative;
  display: inline-flex;
  width: 116px;
  height: 116px;
  align-items: center;
  justify-content: center;
  border: 1px solid ${token.colors.blueLine};
  border-radius: 999px;
  background: ${token.colors.white};
  box-shadow: 0 18px 44px rgba(25, 33, 58, 0.08);

  &::before {
    position: absolute;
    inset: 10px;
    border: 1px solid ${token.colors.blueLine};
    border-radius: inherit;
    content: '';
  }

  span {
    color: ${token.colors.blueHover};
    font-size: 30px;
    font-weight: 600;
    line-height: 1;
  }
`;

export const Eyebrow = styled.p`
  margin: 0;
  margin-top: ${token.spacing.xl};
  color: ${token.colors.blueHover};
  ${token.typography('caption')}
  font-weight: 600;
`;

export const Description = styled.p`
  max-width: 420px;
  margin: ${token.spacing.sm} 0 0;
  color: ${token.colors.navyMuted};
  ${token.typography('body')}
`;

export const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${token.spacing.md};
  margin-top: ${token.spacing.xl};

  @media (max-width: 480px) {
    width: 100%;
    flex-direction: column;
  }
`;

export const PrimaryButton = styled.button`
  min-width: 156px;
  min-height: 44px;
  border: 1px solid ${token.colors.blue};
  border-radius: ${token.radius.sm};
  background: ${token.colors.blue};
  color: ${token.colors.white};
  cursor: pointer;
  ${token.typography('caption')}
  font-weight: 600;

  &:hover {
    border-color: ${token.colors.blueHover};
    background: ${token.colors.blueHover};
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

export const SecondaryButton = styled.button`
  min-width: 104px;
  min-height: 44px;
  border: 1px solid ${token.colors.blueLine};
  border-radius: ${token.radius.sm};
  background: ${token.colors.white};
  color: ${token.colors.navyMuted};
  cursor: pointer;
  ${token.typography('caption')}
  font-weight: 500;

  &:hover {
    border-color: ${token.colors.blueLineStrong};
    color: ${token.colors.navy};
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;
