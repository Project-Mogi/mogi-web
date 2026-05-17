import styled from 'styled-components';

interface CardProps {
  title: string;
  value: string;
  description: string;
}

export function Card({ title, value, description }: CardProps) {
  return (
    <Container>
      <Title>{title}</Title>
      <Value>{value}</Value>
      <Description>{description}</Description>
    </Container>
  );
}

const Container = styled.article`
  min-height: 160px;
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadow.card};
`;

const Title = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  font-weight: 600;
`;

const Value = styled.strong`
  display: block;
  margin-top: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.title.fontSize};
  line-height: ${({ theme }) => theme.typography.title.lineHeight};
`;

const Description = styled.p`
  margin: ${({ theme }) => theme.spacing.sm} 0 0;
  color: ${({ theme }) => theme.colors.gray};
  font-size: ${({ theme }) => theme.typography.caption.fontSize};
`;
