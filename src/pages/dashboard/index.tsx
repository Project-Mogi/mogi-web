import styled from 'styled-components';

import { Card } from '@/shared/ui/Card';

export function DashboardPage() {
  return (
    <Page>
      <Header>
        <Eyebrow>Dashboard</Eyebrow>
        <Title>기숙사 상벌점 관리</Title>
        <Description>학생들의 상점과 벌점 현황을 빠르게 확인하고 관리합니다.</Description>
      </Header>

      <Grid>
        <Card title="전체 학생" value="-" description="상벌점 관리 대상" />
        <Card title="누적 상점" value="-" description="전체 상점 합계" />
        <Card title="누적 벌점" value="-" description="전체 벌점 합계" />
      </Grid>
    </Page>
  );
}

const Page = styled.main`
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.background};
`;

const Header = styled.header`
  max-width: 1120px;
  margin: 0 auto ${({ theme }) => theme.spacing.xl};
`;

const Eyebrow = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.caption.fontSize};
  font-weight: 700;
`;

const Title = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.title.fontSize};
  font-weight: ${({ theme }) => theme.typography.title.fontWeight};
  line-height: ${({ theme }) => theme.typography.title.lineHeight};
`;

const Description = styled.p`
  margin: ${({ theme }) => theme.spacing.md} 0 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.body.fontSize};
  line-height: ${({ theme }) => theme.typography.body.lineHeight};
`;

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  max-width: 1120px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
