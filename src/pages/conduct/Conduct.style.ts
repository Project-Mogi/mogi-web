import styled, { css } from 'styled-components';

import * as token from '@/shared/styles/token';

export const Page = styled.main`
  min-height: 100dvh;
  padding: ${token.spacing.xl};
  background: ${token.colors.blueTint};
`;

export const Header = styled.header`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: ${token.spacing.lg};
  margin-bottom: ${token.spacing.lg};
`;

export const TitleGroup = styled.div`
  ${token.flexColumn}
  gap: ${token.spacing.xs};
`;

export const Title = styled.h1`
  margin: 0;
  color: ${token.colors.navy};
  ${token.typography('title')}
`;

export const Description = styled.p`
  margin: 0;
  color: ${token.colors.navyMuted};
  ${token.typography('body')}
`;

export const PrimaryButton = styled.button`
  min-width: 120px;
  min-height: 42px;
  border: 0;
  border-radius: ${token.radius.sm};
  background: ${token.colors.blue};
  color: ${token.colors.white};
  cursor: pointer;
  ${token.typography('caption')}
  font-weight: 600;
`;

export const SummaryGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: ${token.spacing.md};
  margin-bottom: ${token.spacing.lg};

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const SummaryItem = styled.div`
  padding: ${token.spacing.md};
  border: 1px solid ${token.colors.blueLine};
  border-radius: ${token.radius.sm};
  background: ${token.colors.white};
`;

export const SummaryLabel = styled.p`
  margin: 0 0 ${token.spacing.xs};
  color: ${token.colors.navyMuted};
  ${token.typography('caption')}
`;

export const SummaryValue = styled.strong`
  color: ${token.colors.navy};
  ${token.typography('heading')}
`;

export const Toolbar = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: ${token.spacing.md};
  align-items: center;
  margin-bottom: ${token.spacing.lg};
  padding: ${token.spacing.md};
  border: 1px solid ${token.colors.blueLine};
  border-radius: ${token.radius.sm};
  background: ${token.colors.white};
`;

export const SearchInput = styled.input`
  width: 280px;
  min-height: 40px;
  border: 1px solid ${token.colors.blueLine};
  border-radius: ${token.radius.sm};
  padding: 0 ${token.spacing.md};
  color: ${token.colors.navy};
  outline: none;
  ${token.typography('caption')}

  &::placeholder {
    color: ${token.colors.gray};
  }
`;

export const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${token.spacing.sm};
`;

export const FilterLabel = styled.span`
  color: ${token.colors.navy};
  ${token.typography('caption')}
  font-weight: 600;
`;

export const FilterButton = styled.button<{ $isSelected?: boolean }>`
  min-height: 36px;
  border: 1px solid ${token.colors.blueLine};
  border-radius: ${token.radius.sm};
  padding: 0 ${token.spacing.md};
  background: ${token.colors.white};
  color: ${token.colors.navyMuted};
  cursor: pointer;
  ${token.typography('caption')}
  font-weight: 600;

  ${({ $isSelected }) =>
    $isSelected &&
    css`
      border-color: ${token.colors.blue};
      background: ${token.colors.blue};
      color: ${token.colors.white};
    `}
`;

export const TableWrap = styled.section`
  overflow: hidden;
  border: 1px solid ${token.colors.blueLine};
  border-radius: ${token.radius.sm};
  background: ${token.colors.white};
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: ${token.colors.navy};
  ${token.typography('caption')}

  th,
  td {
    height: 56px;
    border-bottom: 1px solid ${token.colors.blueLine};
    padding: 0 ${token.spacing.md};
    text-align: center;
    white-space: nowrap;
  }

  th {
    background: ${token.colors.white};
    font-weight: 700;
  }

  tbody tr:last-child td {
    border-bottom: 0;
  }
`;

export const Point = styled.span<{ $value: number }>`
  ${({ $value }) =>
    $value < 0
      ? css`
          color: ${token.colors.red};
        `
      : css`
          color: ${token.colors.blue};
        `}
  font-weight: 700;
`;

export const ActionGroup = styled.div`
  display: inline-flex;
  gap: ${token.spacing.sm};
`;

export const ActionButton = styled.button`
  min-height: 32px;
  border: 1px solid ${token.colors.blueLineStrong};
  border-radius: ${token.radius.sm};
  padding: 0 ${token.spacing.md};
  background: ${token.colors.white};
  color: ${token.colors.navy};
  cursor: pointer;
  ${token.typography('caption')}
  font-weight: 600;
`;
