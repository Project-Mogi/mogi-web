import { useMemo, useState } from 'react';

import { type ConductInfo } from '@/features/conduct/api';

import { type SortOption } from '../types';
import {
  filterConductRows,
  formatDateLabel,
  getGenderValue,
  getNumberFromFilter,
  getTodayDateValue,
  sortConductRows,
} from '../utils';

export function useConductFilters() {
  const [selectedGender, setSelectedGender] = useState('전체');
  const [selectedGrade, setSelectedGrade] = useState('전체');
  const [selectedClass, setSelectedClass] = useState('전체');
  const [selectedDate, setSelectedDate] = useState(getTodayDateValue);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('latest');

  const queryFilters = useMemo(
    () => ({
      gender: getGenderValue(selectedGender),
      grade: getNumberFromFilter(selectedGrade),
      classNumber: getNumberFromFilter(selectedClass),
    }),
    [selectedClass, selectedGender, selectedGrade],
  );

  return {
    controlsProps: {
      searchKeyword,
      selectedDate,
      selectedDateLabel: formatDateLabel(selectedDate),
      sortOption,
      onDateChange: setSelectedDate,
      onSearchChange: setSearchKeyword,
      onSortChange: setSortOption,
    },
    filtersProps: {
      selectedClass,
      selectedGender,
      selectedGrade,
      onClassChange: setSelectedClass,
      onGenderChange: setSelectedGender,
      onGradeChange: setSelectedGrade,
    },
    queryFilters,
    searchKeyword,
    selectedGender,
    sortOption,
  };
}

export function useConductTableRows(
  conductInfos: ConductInfo[],
  searchKeyword: string,
  sortOption: SortOption,
) {
  return useMemo(
    () => sortConductRows(filterConductRows(conductInfos, searchKeyword), sortOption),
    [conductInfos, searchKeyword, sortOption],
  );
}
