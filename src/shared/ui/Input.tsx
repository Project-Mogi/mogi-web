import { type InputHTMLAttributes } from 'react';
import styled from 'styled-components';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorText?: string;
}

export function Input({ label, errorText, id, ...props }: InputProps) {
  const inputId = id ?? label;

  return (
    <Field>
      <Label htmlFor={inputId}>{label}</Label>
      <Control id={inputId} aria-invalid={Boolean(errorText)} {...props} />
      {errorText ? <ErrorText>{errorText}</ErrorText> : null}
    </Field>
  );
}

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Label = styled.label`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.caption.fontSize};
  font-weight: 700;
`;

const Control = styled.input`
  width: 100%;
  min-height: 52px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 0 ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &[aria-invalid='true'] {
    border-color: ${({ theme }) => theme.colors.danger};
  }
`;

const ErrorText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.danger};
  font-size: ${({ theme }) => theme.typography.caption.fontSize};
`;
