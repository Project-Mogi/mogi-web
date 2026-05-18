import calendarIcon from '@/assets/icons/guidance_calendar.svg';
import searchIcon from '@/assets/icons/iconamoon_search.svg';

import * as S from '../Conduct.style';
import { type SortOption } from '../types';

interface ConductControlsProps {
  searchKeyword: string;
  selectedDate: string;
  selectedDateLabel: string;
  sortOption: SortOption;
  onDateChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onSortChange: (value: SortOption) => void;
}

export function ConductControls({
  searchKeyword,
  selectedDate,
  selectedDateLabel,
  sortOption,
  onDateChange,
  onSearchChange,
  onSortChange,
}: ConductControlsProps) {
  return (
    <S.ControlBar>
      <S.ControlLeft>
        <S.DatePicker>
          <span>{selectedDateLabel}</span>
          <S.CalendarIcon src={calendarIcon} alt="" />
          <S.DateInput
            aria-label="조회 날짜"
            type="date"
            value={selectedDate}
            onChange={(event) => onDateChange(event.target.value)}
          />
        </S.DatePicker>
        <S.SearchBox>
          <S.SearchIcon src={searchIcon} alt="" />
          <S.SearchInput
            value={searchKeyword}
            placeholder="이름으로 검색..."
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </S.SearchBox>
      </S.ControlLeft>
      <S.ControlRight>
        <S.SortBox>
          <S.SortSelect
            id="conduct-sort"
            value={sortOption}
            onChange={(event) => onSortChange(event.target.value as SortOption)}
          >
            <option value="latest">최신순</option>
            <option value="reward">상점순</option>
            <option value="penalty">벌점순</option>
            <option value="total">합계순</option>
          </S.SortSelect>
        </S.SortBox>
      </S.ControlRight>
    </S.ControlBar>
  );
}
