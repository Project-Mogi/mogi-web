import styled, { css, keyframes } from 'styled-components';

import * as token from '@/shared/styles/token';

const toastDrop = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -20px);
  }

  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
`;

const toastRise = keyframes`
  from {
    opacity: 1;
    transform: translate(-50%, 0);
  }

  to {
    opacity: 0;
    transform: translate(-50%, -14px);
  }
`;

export const Toast = styled.div<{ $isClosing: boolean }>`
  position: fixed;
  top: 24px;
  left: 50%;
  z-index: 1000;
  display: inline-flex;
  width: max-content;
  max-width: min(480px, calc(100vw - 32px));
  min-height: 52px;
  align-items: center;
  gap: ${token.spacing.sm};
  padding: 8px 20px 8px 10px;
  border-radius: 999px;
  background: ${token.colors.white};
  box-shadow: 0 14px 36px rgba(25, 33, 58, 0.12);
  color: ${token.colors.navy};
  pointer-events: none;
  transform: translateX(-50%);
  animation: ${({ $isClosing }) =>
    $isClosing
      ? css`
          ${toastRise} 180ms ease-in both
        `
      : css`
          ${toastDrop} 180ms ease-out both
        `};
  ${token.typography('caption')}
  font-weight: 500;
`;

export const Icon = styled.span`
  position: relative;
  display: inline-flex;
  width: 34px;
  height: 34px;
  flex: 0 0 34px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${token.colors.pinkTint};
`;

export const IconMark = styled.span`
  position: relative;
  width: 19px;
  height: 19px;
  border: 2px solid ${token.colors.red};
  border-radius: 50%;

  &::before,
  &::after {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 9px;
    height: 2px;
    border-radius: 999px;
    background: ${token.colors.red};
    content: '';
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

export const Message = styled.span`
  min-width: 0;
  color: ${token.colors.navy};
  white-space: normal;
`;
