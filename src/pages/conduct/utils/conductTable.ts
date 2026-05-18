import { type ConductGender, type ConductInfo } from '@/features/conduct/api';

import { skeletonColumnWidths } from '../constants';
import { type SortOption } from '../types';

export function getGenderValue(filter: string): ConductGender | undefined {
  if (filter === '남') {
    return 'BOY';
  }

  if (filter === '여') {
    return 'GIRL';
  }

  return undefined;
}

export function getGenderLabel(gender: ConductGender | undefined, selectedGender: string) {
  if (gender === 'BOY') {
    return '남';
  }

  if (gender === 'GIRL') {
    return '여';
  }

  return selectedGender === '전체' ? '-' : selectedGender;
}

export function getNumberFromFilter(filter: string) {
  if (filter === '전체') {
    return undefined;
  }

  const numberValue = Number(filter.replace(/[^0-9]/g, ''));

  return numberValue || undefined;
}

export function filterConductRows(rows: ConductInfo[], searchKeyword: string) {
  const keyword = searchKeyword.trim();

  if (!keyword) {
    return rows;
  }

  return rows.filter((row) => row.userName.includes(keyword));
}

export function sortConductRows(rows: ConductInfo[], sortOption: SortOption) {
  const sortedRows = [...rows];

  switch (sortOption) {
    case 'reward':
      return sortedRows.sort((prev, next) => next.totalRewardPoint - prev.totalRewardPoint);
    case 'penalty':
      return sortedRows.sort((prev, next) => next.totalPenaltyPoint - prev.totalPenaltyPoint);
    case 'total':
      return sortedRows.sort((prev, next) => next.totalPoint - prev.totalPoint);
    case 'latest':
    default:
      return sortedRows.sort((prev, next) => next.userId - prev.userId);
  }
}

export function getSkeletonWidth(cellIndex: number) {
  return skeletonColumnWidths[cellIndex] ?? '60px';
}

export function getTodayDateValue() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function formatDateLabel(dateValue: string) {
  const [year, month, day] = dateValue.split('-');

  if (!year || !month || !day) {
    return '';
  }

  return `${year}. ${month}. ${day}.`;
}
