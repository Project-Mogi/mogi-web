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

export const Header = styled.header<{ $variant: 'auth' | 'app' }>`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 100;
  display: flex;
  height: 72px;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 18px 80px;
  background: ${token.colors.white};
  ${({ $variant }) =>
    $variant === 'app' &&
    css`
      border-bottom: 1px solid ${token.colors.blueLine};
      box-shadow: 0 4px 18px rgba(25, 33, 58, 0.04);
    `}

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
  width: 84px;
  min-height: 38px;
  align-items: center;
  justify-content: center;
  border-radius: ${token.radius.sm};
  ${({ $variant }) => actionLinkVariant[$variant]}
  ${token.typography('caption')}
  font-weight: 600;
  text-decoration: none;
`;

export const AppActions = styled.nav`
  display: flex;
  align-items: center;
  gap: ${token.spacing.md};
`;

export const UserName = styled.span`
  color: ${token.colors.navy};
  ${token.typography('caption')}
  font-weight: 700;
`;

export const LogoutButton = styled.button`
  display: inline-flex;
  min-width: 84px;
  min-height: 38px;
  align-items: center;
  justify-content: center;
  border: 1px solid ${token.colors.blueLine};
  border-radius: ${token.radius.sm};
  background: ${token.colors.white};
  color: ${token.colors.navyMuted};
  cursor: pointer;
  ${token.typography('caption')}
  font-weight: 600;
`;
