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
  padding-bottom: 32px;
  text-align: center;

  @media (max-width: 768px) {
    min-height: calc(100dvh - 64px - (${token.spacing.lg} * 2));
    padding-bottom: 24px;
  }
`;

export const HeroImage = styled.img`
  width: min(760px, 100%);
  height: auto;
  margin-bottom: ${token.spacing.lg};
  object-fit: contain;
  user-select: none;

  @media (max-width: 768px) {
    width: min(560px, 100%);
    margin-bottom: ${token.spacing.md};
  }
`;

export const Title = styled.h1`
  margin: 0;
  color: ${token.colors.navy};
  font-size: 28px;
  font-weight: 600;
  line-height: 36px;

  @media (max-width: 768px) {
    font-size: 22px;
    line-height: 30px;
  }
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
  margin-top: ${token.spacing.lg};

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
