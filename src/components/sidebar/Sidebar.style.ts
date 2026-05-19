import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import * as token from '@/shared/styles/token';

export const Sidebar = styled.aside`
  position: fixed;
  top: 72px;
  bottom: 0;
  left: 0;
  z-index: 90;
  width: 232px;
  box-sizing: border-box;
  padding: ${token.spacing.lg} ${token.spacing.md};
  border-right: 1px solid ${token.colors.blueLine};
  background: ${token.colors.white};

  @media (max-width: 900px) {
    display: none;
  }
`;

export const Menu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${token.spacing.sm};
`;

export const TemporaryMenuGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${token.spacing.sm};
  margin-top: -${token.spacing.xs};
  padding-left: ${token.spacing.md};
`;

export const MenuLink = styled(NavLink)`
  display: flex;
  min-height: 44px;
  align-items: center;
  border: 1px solid transparent;
  border-radius: ${token.radius.sm};
  padding: 0 ${token.spacing.md};
  color: ${token.colors.navyMuted};
  ${token.typography('caption')}
  font-weight: 700;
  text-decoration: none;

  &:hover {
    background: ${token.colors.blueTint};
    color: ${token.colors.blueHover};
  }

  &.active {
    border-color: ${token.colors.blueLine};
    background: ${token.colors.blueTint};
    color: ${token.colors.blue};
  }
`;

export const SubMenuLink = styled(MenuLink)`
  min-height: 36px;
  padding: 0 ${token.spacing.sm};
`;
