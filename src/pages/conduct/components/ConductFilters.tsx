import * as S from '../Conduct.style';
import { classFilters, genderFilters, gradeFilters } from '../constants';

interface ConductFiltersProps {
  selectedClass: string;
  selectedGender: string;
  selectedGrade: string;
  onClassChange: (value: string) => void;
  onCreateClick: () => void;
  onGenderChange: (value: string) => void;
  onGradeChange: (value: string) => void;
}

export function ConductFilters({
  selectedClass,
  selectedGender,
  selectedGrade,
  onClassChange,
  onCreateClick,
  onGenderChange,
  onGradeChange,
}: ConductFiltersProps) {
  return (
    <S.FilterPanel>
      <S.FilterList>
        <S.FilterGroup>
          <S.FilterLabel>성별 : </S.FilterLabel>
          {genderFilters.map((filter) => (
            <S.FilterButton
              key={filter}
              type="button"
              $isSelected={selectedGender === filter}
              onClick={() => onGenderChange(filter)}
            >
              {filter}
            </S.FilterButton>
          ))}
        </S.FilterGroup>
        <S.FilterGroup>
          <S.FilterLabel>학년 : </S.FilterLabel>
          {gradeFilters.map((filter) => (
            <S.FilterButton
              key={filter}
              type="button"
              $isSelected={selectedGrade === filter}
              onClick={() => onGradeChange(filter)}
            >
              {filter}
            </S.FilterButton>
          ))}
        </S.FilterGroup>
        <S.FilterGroup>
          <S.FilterLabel>반 : </S.FilterLabel>
          {classFilters.map((filter) => (
            <S.FilterButton
              key={filter}
              type="button"
              $isSelected={selectedClass === filter}
              onClick={() => onClassChange(filter)}
            >
              {filter}
            </S.FilterButton>
          ))}
        </S.FilterGroup>
      </S.FilterList>
      <S.CreateButton type="button" onClick={onCreateClick}>
        상벌점 부여
      </S.CreateButton>
    </S.FilterPanel>
  );
}
