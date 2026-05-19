import { useEffect, useRef, useState } from 'react';

import searchIcon from '@/assets/icons/iconamoon_search.svg';

import { conductScoreOptions } from '../constants';
import * as S from '../Conduct.style';
import { type ConductCreateFormProps } from '../types';

export function ConductCreateForm({
  form,
  historyErrorMessage,
  historyItems,
  historySummary,
  isHistoryError,
  isHistoryLoading,
  isPending,
  searchKeyword,
  searchResultCount,
  searchResults,
  selectedStudent,
  totalStudentCount,
  onCancel,
  onCategoryChange,
  onClearSearch,
  onScoreChange,
  onSearchChange,
  onSelectStudent,
  onSubmit,
}: ConductCreateFormProps) {
  const [isScoreDropdownOpen, setIsScoreDropdownOpen] = useState(false);
  const scoreDropdownRef = useRef<HTMLDivElement>(null);
  const scoreOptions = conductScoreOptions[form.conductCategory];
  const selectedScoreOption = scoreOptions.find((option) => option.score === form.score);
  const scorePrefix = form.conductCategory === 'PENALTY' ? '-' : '+';

  useEffect(() => {
    if (!isScoreDropdownOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!scoreDropdownRef.current?.contains(event.target as Node)) {
        setIsScoreDropdownOpen(false);
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isScoreDropdownOpen]);

  const handleCategoryChange = (category: typeof form.conductCategory) => {
    onCategoryChange(category);
    setIsScoreDropdownOpen(false);
  };

  const handleScoreSelect = (score: string) => {
    onScoreChange(score);
    setIsScoreDropdownOpen(false);
  };

  return (
    <S.ConductForm onSubmit={onSubmit}>
      <S.StudentPickerPanel>
        <S.CreateSectionHeader>
          <S.CreateSectionTitle>학생 선택</S.CreateSectionTitle>
          <S.CreateSectionMeta>
            {searchKeyword ? `${searchResultCount}명 검색됨` : `전체 ${totalStudentCount}명 · 호실순`}
          </S.CreateSectionMeta>
        </S.CreateSectionHeader>

        <S.StudentSearchBox>
          <S.StudentSearchIcon src={searchIcon} alt="" />
          <S.StudentSearchInput
            id="conduct-student"
            value={searchKeyword}
            placeholder="이름, 학번, 방 번호로 검색"
            onChange={(event) => onSearchChange(event.target.value)}
          />
          {searchKeyword && (
            <S.SearchClearButton type="button" onClick={onClearSearch}>
              지우기
            </S.SearchClearButton>
          )}
        </S.StudentSearchBox>

        <S.StudentResultList>
          {searchResults.map((student) => (
            <S.StudentResultButton
              key={student.userId}
              type="button"
              $isSelected={form.userId === String(student.userId)}
              onClick={() => onSelectStudent(student.userId)}
            >
              <S.StudentResultMain>
                <strong>{student.userName}</strong>
                <span>{student.studentNumber}</span>
              </S.StudentResultMain>
              <S.StudentResultAside>
                <span>{student.roomNumber}호</span>
                <S.StudentSelectLabel>
                  {form.userId === String(student.userId) ? '선택됨' : '선택'}
                </S.StudentSelectLabel>
              </S.StudentResultAside>
            </S.StudentResultButton>
          ))}
        </S.StudentResultList>
        {searchKeyword && searchResults.length === 0 && (
          <S.StudentEmptyText>검색 결과가 없습니다.</S.StudentEmptyText>
        )}
      </S.StudentPickerPanel>

      <S.ConductAssignPanel>
        <S.CreateSectionHeader>
          <S.CreateSectionTitle>부여 내용</S.CreateSectionTitle>
        </S.CreateSectionHeader>

        <S.SelectedStudentCard $isEmpty={!selectedStudent}>
          {selectedStudent ? (
            <>
              <strong>{selectedStudent.userName}</strong>
              <span>
                {selectedStudent.studentNumber} · {selectedStudent.roomNumber}호
              </span>
            </>
          ) : (
            <>
              <strong>학생을 선택해 주세요</strong>
              <span>왼쪽 목록에서 학생을 누르면 선택됩니다.</span>
            </>
          )}
        </S.SelectedStudentCard>

        <S.PreviousHistoryPanel>
          <S.PreviousHistoryHeader>
            <S.PreviousHistoryTitle>이전 이력</S.PreviousHistoryTitle>
            {selectedStudent && (
              <S.CreateSectionMeta>{historyItems.length}건</S.CreateSectionMeta>
            )}
          </S.PreviousHistoryHeader>

          {!selectedStudent && (
            <S.PreviousHistoryState>학생 선택 후 이력이 표시됩니다.</S.PreviousHistoryState>
          )}
          {selectedStudent && isHistoryLoading && (
            <S.PreviousHistorySkeleton>
              <S.SkeletonBar $width="86%" />
              <S.SkeletonBar $width="72%" />
              <S.SkeletonBar $width="64%" />
            </S.PreviousHistorySkeleton>
          )}
          {selectedStudent && isHistoryError && (
            <S.PreviousHistoryState>{historyErrorMessage}</S.PreviousHistoryState>
          )}
          {selectedStudent && !isHistoryLoading && !isHistoryError && (
            <>
              {historySummary && (
                <S.HistorySummaryGrid>
                  <S.HistorySummaryItem $variant="reward">
                    <span>상점</span>
                    <strong>{historySummary.totalRewardPoint}</strong>
                  </S.HistorySummaryItem>
                  <S.HistorySummaryItem $variant="penalty">
                    <span>벌점</span>
                    <strong>{historySummary.totalPenaltyPoint}</strong>
                  </S.HistorySummaryItem>
                  <S.HistorySummaryItem $variant="total">
                    <span>합계</span>
                    <strong>{historySummary.totalPoint}</strong>
                  </S.HistorySummaryItem>
                </S.HistorySummaryGrid>
              )}

              {historyItems.length === 0 && (
                <S.PreviousHistoryState>이전 상벌점 이력이 없습니다.</S.PreviousHistoryState>
              )}
            </>
          )}
        </S.PreviousHistoryPanel>

        <S.FormField>
          <S.FormLabel>구분</S.FormLabel>
          <S.CategoryGroup>
            <S.CategoryButton
              type="button"
              $variant="reward"
              $isSelected={form.conductCategory === 'REWARD'}
              onClick={() => handleCategoryChange('REWARD')}
            >
              상점
            </S.CategoryButton>
            <S.CategoryButton
              type="button"
              $variant="penalty"
              $isSelected={form.conductCategory === 'PENALTY'}
              onClick={() => handleCategoryChange('PENALTY')}
            >
              벌점
            </S.CategoryButton>
          </S.CategoryGroup>
        </S.FormField>

        <S.FormField>
          <S.FormLabel htmlFor="conduct-score">점수</S.FormLabel>
          <S.ScoreDropdown ref={scoreDropdownRef}>
            <S.ScoreDropdownButton
              id="conduct-score"
              type="button"
              aria-haspopup="listbox"
              aria-expanded={isScoreDropdownOpen}
              onClick={() => setIsScoreDropdownOpen((isOpen) => !isOpen)}
            >
              {selectedScoreOption ? (
                <S.ScoreDropdownValue>
                  <strong>
                    {scorePrefix}
                    {selectedScoreOption.score}점
                  </strong>
                  <span>{selectedScoreOption.reason}</span>
                </S.ScoreDropdownValue>
              ) : (
                <S.ScoreDropdownPlaceholder>점수와 사유를 선택하세요</S.ScoreDropdownPlaceholder>
              )}
              <S.ScoreDropdownArrow $isOpen={isScoreDropdownOpen} aria-hidden="true" />
            </S.ScoreDropdownButton>

            {isScoreDropdownOpen && (
              <S.ScoreOptionList role="listbox" aria-labelledby="conduct-score">
                {scoreOptions.map((option) => (
                  <S.ScoreOptionButton
                    key={`${form.conductCategory}-${option.score}`}
                    type="button"
                    role="option"
                    aria-selected={form.score === option.score}
                    $isSelected={form.score === option.score}
                    $variant={form.conductCategory === 'PENALTY' ? 'penalty' : 'reward'}
                    onClick={() => handleScoreSelect(option.score)}
                  >
                    <strong>
                      {scorePrefix}
                      {option.score}점
                    </strong>
                    <span>{option.reason}</span>
                  </S.ScoreOptionButton>
                ))}
              </S.ScoreOptionList>
            )}
          </S.ScoreDropdown>
        </S.FormField>

        <S.FormActions>
          <S.SecondaryButton type="button" onClick={onCancel}>
            취소
          </S.SecondaryButton>
          <S.SubmitButton type="submit" disabled={isPending}>
            {isPending ? '부여 중' : '부여'}
          </S.SubmitButton>
        </S.FormActions>
      </S.ConductAssignPanel>
    </S.ConductForm>
  );
}
