import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import * as token from '@/shared/styles/token';

const actionLinkVariant = {
  outline: css`
    border: 1px solid ${token.colors.blueLine};
    background: ${token.colors.white};
    color: ${token.colors.navy};
  `,
  primary: css`
    border: 1px solid ${token.colors.blue};
    background: ${token.colors.blue};
    color: ${token.colors.white};
  `,
};

export const Header = styled.header`
  display: flex;
  height: 72px;
  align-items: center;
  justify-content: space-between;
  padding: 18px 80px;
  background: ${token.colors.white};

  @media (max-width: 768px) {
    height: 64px;
    padding: 14px ${token.spacing.lg};
  }
`;

export const LogoLink = styled(Link)`
  display: inline-flex;
  width: 120px;
  height: 44px;
  align-items: center;
  justify-content: center;
  text-decoration: none;

  @media (max-width: 768px) {
    width: 104px;
    height: 38px;
  }
`;

export const LogoImage = styled.img`
  display: block;
  width: 120px;
  height: auto;
  object-fit: contain;

  @media (max-width: 768px) {
    width: 104px;
  }
`;

export const Actions = styled.nav`
  display: flex;
  align-items: center;
  gap: ${token.spacing.md};
`;

export const ActionLink = styled(Link)<{ $variant: 'outline' | 'primary' }>`
  display: inline-flex;
  min-width: ${({ $variant }) => ($variant === 'primary' ? '90px' : '78px')};
  min-height: 36px;
  align-items: center;
  justify-content: center;
  border-radius: ${token.radius.sm};
  ${({ $variant }) => actionLinkVariant[$variant]}
  ${token.typography('caption')}
  font-weight: 800;
  text-decoration: none;
`;
