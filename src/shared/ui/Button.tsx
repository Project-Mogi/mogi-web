import { type ButtonHTMLAttributes, type PropsWithChildren } from 'react';
import styled from 'styled-components';

type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({
  children,
  variant = 'primary',
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <StyledButton $variant={variant} {...props}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button<{ $variant: ButtonVariant }>`
  min-height: 52px;
  border: 0;
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 0 ${({ theme }) => theme.spacing.lg};
  background: ${({ $variant, theme }) =>
    $variant === 'primary' ? theme.colors.primary : theme.colors.surface};
  color: ${({ $variant, theme }) =>
    $variant === 'primary' ? theme.colors.surface : theme.colors.text};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-weight: 700;
  box-shadow: ${({ $variant, theme }) => ($variant === 'primary' ? 'none' : theme.shadow.card)};
  transition:
    transform 120ms ease,
    opacity 120ms ease;

  &:hover {
    transform: translateY(-1px);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.45;
    transform: none;
  }
`;
