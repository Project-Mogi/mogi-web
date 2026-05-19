import styled, { css } from 'styled-components';

import * as token from '@/shared/styles/token';

export const Page = styled.main`
  min-height: 100dvh;
  margin-left: 232px;
  padding: calc(72px + ${token.spacing.xl}) ${token.spacing.xl} ${token.spacing.xl};
  background: ${token.colors.white};

  @media (max-width: 900px) {
    margin-left: 0;
  }

  @media (max-width: 768px) {
    padding: calc(64px + ${token.spacing.lg}) ${token.spacing.lg} ${token.spacing.lg};
  }
`;

export const CreatePageHeader = styled.header`
  width: min(1180px, 100%);
  margin-bottom: ${token.spacing.lg};
`;

export const CreatePageTitle = styled.h1`
  margin: 0;
  color: ${token.colors.navy};
  ${token.typography('heading')}
`;

export const CreateFormPanel = styled.section`
  width: min(1180px, 100%);
  box-sizing: border-box;
  background: ${token.colors.white};
`;

export const CreateFormSkeleton = styled.div`
  ${token.flexColumn}
  gap: ${token.spacing.md};
`;

export const ControlBar = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${token.spacing.md};
  margin-bottom: ${token.spacing.lg};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const ControlLeft = styled.div`
  display: flex;
  min-width: 0;
  align-items: center;
  gap: ${token.spacing.md};

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
  }
`;

export const DatePicker = styled.label`
  position: relative;
  display: inline-flex;
  min-width: 220px;
  min-height: 44px;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${token.colors.blueLine};
  border-radius: ${token.radius.sm};
  padding: 0 ${token.spacing.lg};
  background: ${token.colors.white};
  color: ${token.colors.navy};
  cursor: pointer;
  font-family: 'Courier New', monospace;
  font-size: 16px;
  font-weight: 500;
  line-height: 28px;
  transition:
    border-color 0.15s ease,
    transform 0.15s ease;

  &:hover {
    border-color: ${token.colors.blueLineStrong};
  }

  &:active {
    transform: translateY(1px);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const DateInput = styled.input`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
  opacity: 0;
  cursor: pointer;

  &::-webkit-calendar-picker-indicator {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`;

export const CalendarIcon = styled.img`
  width: 18px;
  height: 18px;
  flex: 0 0 18px;
`;

export const SearchBox = styled.label`
  display: flex;
  width: min(360px, 100%);
  min-height: 44px;
  align-items: center;
  gap: ${token.spacing.md};
  box-sizing: border-box;
  border: 1px solid ${token.colors.blueLine};
  border-radius: ${token.radius.sm};
  padding: 0 ${token.spacing.md};
  background: ${token.colors.white};

  &:focus-within {
    border-color: ${token.colors.blue};
    box-shadow: 0 0 0 4px ${token.colors.blueTint};
  }
`;

export const SearchIcon = styled.img`
  width: 18px;
  height: 18px;
  flex: 0 0 18px;
`;

export const SearchInput = styled.input`
  width: 100%;
  border: 0;
  padding: 0;
  color: ${token.colors.navy};
  outline: none;
  ${token.typography('caption')}

  &::placeholder {
    color: ${token.colors.gray};
  }
`;

export const SortBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${token.spacing.sm};

  &::after {
    position: absolute;
    top: 50%;
    right: ${token.spacing.md};
    width: 8px;
    height: 8px;
    border-right: 2px solid ${token.colors.navyMuted};
    border-bottom: 2px solid ${token.colors.navyMuted};
    content: '';
    pointer-events: none;
    transform: translateY(-65%) rotate(45deg);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const ControlRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${token.spacing.md};

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const SortLabel = styled.label`
  color: ${token.colors.navy};
  ${token.typography('caption')}
  font-weight: 500;
`;

export const CreateButton = styled.button`
  min-width: 120px;
  min-height: 44px;
  border: 1px solid ${token.colors.blue};
  border-radius: ${token.radius.sm};
  background: ${token.colors.blue};
  color: ${token.colors.white};
  cursor: pointer;
  ${token.typography('caption')}
  font-weight: 600;
  transition:
    background 0.15s ease,
    border-color 0.15s ease,
    transform 0.15s ease;

  &:hover {
    border-color: ${token.colors.blueHover};
    background: ${token.colors.blueHover};
  }

  &:active {
    transform: translateY(1px);
  }

  @media (max-width: 768px) {
    flex: 1;
  }
`;

export const SortSelect = styled.select`
  min-width: 128px;
  min-height: 44px;
  appearance: none;
  border: 1px solid ${token.colors.blueLine};
  border-radius: ${token.radius.sm};
  padding: 0 40px 0 ${token.spacing.md};
  background: ${token.colors.white};
  color: ${token.colors.navy};
  cursor: pointer;
  outline: none;
  ${token.typography('caption')}
  font-weight: 500;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  &:focus {
    border-color: ${token.colors.blue};
    box-shadow: 0 0 0 4px ${token.colors.blueTint};
  }

  @media (max-width: 768px) {
    flex: 1;
  }
`;

export const FilterPanel = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: ${token.spacing.md};
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${token.spacing.xl};
  padding: ${token.spacing.lg};
  border: 1px solid ${token.colors.blueLine};
  border-radius: ${token.radius.sm};
  background: ${token.colors.white};
  box-shadow: 0 10px 28px rgba(25, 33, 58, 0.04);
`;

export const FilterList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${token.spacing.lg};
  align-items: center;
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${token.spacing.sm};
`;

export const FilterLabel = styled.span`
  color: ${token.colors.navy};
  ${token.typography('caption')}
  font-weight: 500;
`;

export const FilterButton = styled.button<{ $isSelected?: boolean }>`
  min-height: 38px;
  border: 1px solid ${token.colors.blueLine};
  border-radius: ${token.radius.sm};
  padding: 0 ${token.spacing.md};
  background: ${token.colors.white};
  color: ${token.colors.navyMuted};
  cursor: pointer;
  ${token.typography('caption')}
  font-weight: 500;
  transition:
    background 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease,
    transform 0.15s ease;

  &:hover {
    border-color: ${token.colors.blue};
    color: ${token.colors.blueHover};
  }

  &:active {
    transform: translateY(1px);
  }

  ${({ $isSelected }) =>
    $isSelected &&
    css`
      border-color: ${token.colors.blue};
      background: ${token.colors.blue};
      color: ${token.colors.white};

      &:hover {
        color: ${token.colors.white};
      }
    `}
`;

export const TableWrap = styled.section`
  overflow: hidden;
  border: 1px solid ${token.colors.blueLine};
  border-radius: ${token.radius.sm};
  background: ${token.colors.white};
  box-shadow: 0 10px 28px rgba(25, 33, 58, 0.04);
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: ${token.colors.navy};
  table-layout: fixed;
  ${token.typography('caption')}

  th,
  td {
    height: 56px;
    border-bottom: 1px solid ${token.colors.blueLine};
    padding: 0 ${token.spacing.md};
    text-align: center;
    white-space: nowrap;
  }

  th:nth-child(1),
  td:nth-child(1),
  th:nth-child(3),
  td:nth-child(3),
  th:nth-child(5),
  td:nth-child(5),
  th:nth-child(6),
  td:nth-child(6),
  th:nth-child(7),
  td:nth-child(7) {
    width: 10%;
  }

  th:nth-child(2),
  td:nth-child(2) {
    width: 22%;
  }

  th:nth-child(4),
  td:nth-child(4) {
    width: 16%;
  }

  th:last-child,
  td:last-child {
    width: 12%;
    padding-right: ${token.spacing.md};
  }

  th:last-child,
  td:last-child {
    text-align: center;
  }

  th {
    background: ${token.colors.blueTint};
    font-weight: 600;
  }

  tbody tr:hover {
    background: rgba(91, 157, 255, 0.05);
  }

  tbody tr:last-child td {
    border-bottom: 0;
  }
`;

export const StateMessage = styled.p`
  margin: 0;
  padding: ${token.spacing.xl};
  border: 1px solid ${token.colors.blueLine};
  border-radius: ${token.radius.sm};
  background: ${token.colors.white};
  color: ${token.colors.navyMuted};
  text-align: center;
  ${token.typography('body')}
`;

export const EmptyTableText = styled.p`
  margin: 0;
  padding: ${token.spacing.xl};
  color: ${token.colors.navyMuted};
  text-align: center;
  ${token.typography('caption')}
`;

export const SkeletonBar = styled.span<{ $width: string }>`
  position: relative;
  display: inline-block;
  width: ${({ $width }) => $width};
  max-width: 100%;
  height: 14px;
  overflow: hidden;
  border-radius: 999px;
  background: ${token.colors.blueTint};

  &::after {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.76) 48%,
      rgba(255, 255, 255, 0) 100%
    );
    content: '';
    animation: skeleton-shimmer 1.2s ease-in-out infinite;
    transform: translateX(-100%);
  }

  @keyframes skeleton-shimmer {
    100% {
      transform: translateX(100%);
    }
  }
`;

export const TableRow = styled.tr<{ $isSelected?: boolean }>`
  ${({ $isSelected }) =>
    $isSelected &&
    css`
      background: rgba(91, 157, 255, 0.06);
    `}
`;

export const ActionButton = styled.button<{ $isSelected?: boolean }>`
  min-height: 32px;
  border: 1px solid ${token.colors.blueLineStrong};
  border-radius: ${token.radius.sm};
  padding: 0 ${token.spacing.md};
  background: ${token.colors.white};
  color: ${token.colors.navy};
  cursor: pointer;
  ${token.typography('caption')}
  font-weight: 500;
  transition:
    background 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease,
    transform 0.15s ease;

  &:hover {
    border-color: ${token.colors.blue};
    color: ${token.colors.blueHover};
  }

  &:active {
    transform: translateY(1px);
  }

  ${({ $isSelected }) =>
    $isSelected &&
    css`
      border-color: ${token.colors.blue};
      background: ${token.colors.blue};
      color: ${token.colors.white};

      &:hover {
        color: ${token.colors.white};
      }
    `}
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
  font-weight: 600;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${token.spacing.lg};
  background: rgba(25, 33, 58, 0.28);
`;

export const Modal = styled.section`
  width: min(480px, 100%);
  border: 1px solid ${token.colors.blueLine};
  border-radius: ${token.radius.lg};
  padding: ${token.spacing.lg};
  background: ${token.colors.white};
  box-shadow: 0 18px 50px rgba(25, 33, 58, 0.16);
`;

export const ModalHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${token.spacing.md};
  margin-bottom: ${token.spacing.lg};
`;

export const ModalTitle = styled.h2`
  margin: 0;
  color: ${token.colors.navy};
  ${token.typography('heading')}
`;

export const ModalCloseButton = styled.button`
  min-width: 64px;
  min-height: 34px;
  border: 1px solid ${token.colors.blueLine};
  border-radius: ${token.radius.sm};
  background: ${token.colors.white};
  color: ${token.colors.navyMuted};
  cursor: pointer;
  ${token.typography('caption')}
  font-weight: 500;

  &:active {
    transform: translateY(1px);
  }
`;

export const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${token.spacing.md};
`;

export const DetailItem = styled.div`
  padding: ${token.spacing.md};
  border: 1px solid ${token.colors.blueLine};
  border-radius: ${token.radius.sm};
  background: ${token.colors.white};
`;

export const DetailLabel = styled.p`
  margin: 0 0 ${token.spacing.xs};
  color: ${token.colors.navyMuted};
  ${token.typography('caption')}
`;

export const DetailValue = styled.strong`
  color: ${token.colors.navy};
  ${token.typography('body')}
  font-weight: 500;
`;

export const EmptyText = styled.p`
  margin: 0;
  color: ${token.colors.navyMuted};
  ${token.typography('body')}
`;

export const ConductForm = styled.form`
  display: grid;
  align-items: start;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: ${token.spacing.lg};

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

export const StudentPickerPanel = styled.section`
  ${token.flexColumn}
  min-width: 0;
  align-self: start;
  gap: ${token.spacing.md};
  border: 1px solid ${token.colors.blueLine};
  border-radius: ${token.radius.sm};
  padding: ${token.spacing.lg};
  background: ${token.colors.white};
  box-shadow: 0 10px 28px rgba(25, 33, 58, 0.04);
`;

export const ConductAssignPanel = styled.section`
  ${token.flexColumn}
  gap: ${token.spacing.md};
  align-self: start;
  border: 1px solid ${token.colors.blueLine};
  border-radius: ${token.radius.sm};
  padding: ${token.spacing.lg};
  background: ${token.colors.white};
  box-shadow: 0 10px 28px rgba(25, 33, 58, 0.04);
`;

export const CreateSectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${token.spacing.md};
`;

export const CreateSectionTitle = styled.h2`
  margin: 0;
  color: ${token.colors.navy};
  ${token.typography('body')}
  font-weight: 600;
`;

export const CreateSectionMeta = styled.span`
  color: ${token.colors.navyMuted};
  ${token.typography('caption')}
  font-weight: 500;
`;

export const FormField = styled.div`
  ${token.flexColumn}
  gap: ${token.spacing.sm};
`;

export const FormLabel = styled.label`
  color: ${token.colors.navy};
  ${token.typography('caption')}
  font-weight: 600;
`;

export const StudentSearchBox = styled.label`
  display: flex;
  min-height: 52px;
  align-items: center;
  gap: ${token.spacing.sm};
  border: 1px solid ${token.colors.blueLine};
  border-radius: ${token.radius.sm};
  padding: 0 ${token.spacing.md};
  background: ${token.colors.white};

  &:focus-within {
    border-color: ${token.colors.blue};
    box-shadow: 0 0 0 4px ${token.colors.blueTint};
  }
`;

export const StudentSearchIcon = styled.img`
  width: 18px;
  height: 18px;
  flex: 0 0 18px;
`;

export const StudentSearchInput = styled.input`
  width: 100%;
  border: 0;
  padding: 0;
  color: ${token.colors.navy};
  outline: none;
  ${token.typography('caption')}
  font-weight: 400;

  &::placeholder {
    color: ${token.colors.gray};
  }
`;

export const SearchClearButton = styled.button`
  min-width: 56px;
  min-height: 32px;
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
`;

export const SelectedStudentCard = styled.div<{ $isEmpty?: boolean }>`
  display: flex;
  min-height: 84px;
  flex-direction: column;
  justify-content: center;
  gap: ${token.spacing.xs};
  border: 1px solid
    ${({ $isEmpty, theme }) => ($isEmpty ? theme.colors.blueLine : theme.colors.blue)};
  border-radius: ${token.radius.sm};
  padding: ${token.spacing.md};
  background: ${({ $isEmpty, theme }) => ($isEmpty ? theme.colors.white : theme.colors.blueTint)};
  color: ${token.colors.navy};
  ${token.typography('caption')}

  strong {
    ${token.typography('body')}
    font-weight: 600;
  }

  span {
    color: ${token.colors.navyMuted};
    font-weight: 500;
  }
`;

export const PreviousHistoryPanel = styled.section`
  ${token.flexColumn}
  gap: ${token.spacing.md};
  border-top: 1px solid ${token.colors.blueLine};
  padding-top: ${token.spacing.md};
`;

export const PreviousHistoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${token.spacing.sm};
`;

export const PreviousHistoryTitle = styled.h3`
  margin: 0;
  color: ${token.colors.navy};
  ${token.typography('caption')}
  font-weight: 600;
`;

export const PreviousHistoryState = styled.p`
  margin: 0;
  border-radius: ${token.radius.sm};
  padding: ${token.spacing.md};
  background: ${token.colors.blueTint};
  color: ${token.colors.navyMuted};
  ${token.typography('caption')}
  font-weight: 500;
`;

export const PreviousHistorySkeleton = styled.div`
  ${token.flexColumn}
  gap: ${token.spacing.sm};
`;

export const HistorySummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: ${token.spacing.sm};
`;

export const HistorySummaryItem = styled.div<{ $variant: 'penalty' | 'reward' | 'total' }>`
  ${token.flexColumn}
  gap: 2px;
  min-height: 52px;
  justify-content: center;
  border: 1px solid ${token.colors.blueLine};
  border-radius: ${token.radius.sm};
  padding: ${token.spacing.sm};
  background: ${token.colors.white};
  text-align: center;

  span {
    color: ${token.colors.navyMuted};
    ${token.typography('caption')}
    font-weight: 500;
  }

  strong {
    color: ${({ $variant, theme }) => {
      if ($variant === 'reward') {
        return theme.colors.blueHover;
      }

      if ($variant === 'penalty') {
        return theme.colors.pink;
      }

      return theme.colors.navy;
    }};
    ${token.typography('caption')}
    font-weight: 600;
  }
`;

export const StudentResultList = styled.div`
  display: grid;
  gap: ${token.spacing.sm};
  max-height: 520px;
  overflow-y: auto;
  padding-right: 2px;
`;

export const StudentResultButton = styled.button<{ $isSelected?: boolean }>`
  display: flex;
  min-height: 64px;
  align-items: center;
  justify-content: space-between;
  gap: ${token.spacing.md};
  border: 1px solid ${token.colors.blueLine};
  border-radius: ${token.radius.sm};
  padding: ${token.spacing.sm} ${token.spacing.md};
  background: ${token.colors.white};
  color: ${token.colors.navy};
  cursor: pointer;
  text-align: left;
  ${token.typography('caption')}
  transition:
    border-color 0.15s ease,
    background 0.15s ease,
    transform 0.15s ease;

  strong {
    font-weight: 600;
  }

  &:hover {
    border-color: ${token.colors.blue};
    background: ${token.colors.blueTint};
  }

  &:active {
    transform: translateY(1px);
  }

  ${({ $isSelected }) =>
    $isSelected &&
    css`
      border-color: ${token.colors.blue};
      background: ${token.colors.blueTint};
    `}
`;

export const StudentResultMain = styled.span`
  ${token.flexColumn}
  min-width: 0;
  gap: 2px;

  strong {
    color: ${token.colors.navy};
    font-weight: 600;
  }

  span {
    color: ${token.colors.navyMuted};
    font-weight: 500;
  }
`;

export const StudentResultAside = styled.span`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  gap: ${token.spacing.sm};
  color: ${token.colors.navyMuted};
  font-weight: 500;
`;

export const StudentSelectLabel = styled.span`
  min-width: 52px;
  border-radius: 999px;
  padding: 4px ${token.spacing.sm};
  background: ${token.colors.blueTint};
  color: ${token.colors.blueHover};
  text-align: center;
  font-weight: 600;
`;

export const StudentEmptyText = styled.p`
  margin: 0;
  padding: ${token.spacing.sm} ${token.spacing.md};
  color: ${token.colors.navyMuted};
  ${token.typography('caption')}
`;

export const FormInput = styled.input`
  min-height: 44px;
  border: 1px solid ${token.colors.blueLine};
  border-radius: ${token.radius.sm};
  padding: 0 ${token.spacing.md};
  background: ${token.colors.white};
  color: ${token.colors.navy};
  outline: none;
  ${token.typography('caption')}
  font-weight: 400;

  &::placeholder {
    color: ${token.colors.gray};
  }

  &:focus {
    border-color: ${token.colors.blue};
    box-shadow: 0 0 0 4px ${token.colors.blueTint};
  }
`;

export const CategoryGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${token.spacing.sm};
`;

export const CategoryButton = styled.button<{
  $isSelected?: boolean;
  $variant?: 'penalty' | 'reward';
}>`
  min-height: 42px;
  border: 1px solid ${token.colors.blueLine};
  border-radius: ${token.radius.sm};
  background: ${token.colors.white};
  color: ${token.colors.navyMuted};
  cursor: pointer;
  ${token.typography('caption')}
  font-weight: 600;
  transition:
    background 0.15s ease,
    border-color 0.15s ease,
    color 0.15s ease,
    transform 0.15s ease;

  &:active {
    transform: translateY(1px);
  }

  ${({ $isSelected }) =>
    $isSelected &&
    css`
      border-color: ${token.colors.blue};
      background: ${token.colors.blue};
      color: ${token.colors.white};
    `}

  ${({ $isSelected, $variant }) =>
    $isSelected &&
    $variant === 'penalty' &&
    css`
      border-color: ${token.colors.pink};
      background: ${token.colors.pink};
      color: ${token.colors.white};
    `}
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${token.spacing.sm};
  margin-top: ${token.spacing.sm};
`;

export const SecondaryButton = styled.button`
  min-width: 76px;
  min-height: 40px;
  border: 1px solid ${token.colors.blueLine};
  border-radius: ${token.radius.sm};
  background: ${token.colors.white};
  color: ${token.colors.navyMuted};
  cursor: pointer;
  ${token.typography('caption')}
  font-weight: 500;
`;

export const SubmitButton = styled.button`
  min-width: 76px;
  min-height: 40px;
  border: 1px solid ${token.colors.blue};
  border-radius: ${token.radius.sm};
  background: ${token.colors.blue};
  color: ${token.colors.white};
  cursor: pointer;
  ${token.typography('caption')}
  font-weight: 600;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const ModalStateText = styled.p`
  margin: ${token.spacing.md} 0 0;
  color: ${token.colors.navyMuted};
  ${token.typography('caption')}
`;

export const ModalSkeletonList = styled.div`
  ${token.flexColumn}
  gap: ${token.spacing.sm};
  margin-top: ${token.spacing.lg};
`;

export const HistoryList = styled.div`
  ${token.flexColumn}
  gap: ${token.spacing.sm};
  margin-top: ${token.spacing.lg};
`;

export const HistoryItem = styled.div`
  display: flex;
  min-height: 42px;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${token.colors.blueLine};
  border-radius: ${token.radius.sm};
  padding: 0 ${token.spacing.md};
  color: ${token.colors.navy};
  ${token.typography('caption')}

  strong {
    color: ${token.colors.blue};
  }
`;
