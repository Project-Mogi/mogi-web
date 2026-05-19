import { type FormEventHandler } from 'react';

import searchIcon from '@/assets/icons/iconamoon_search.svg';
import { type ConductCategory, type ConductInfo } from '@/features/conduct/api';

import * as S from '../Conduct.style';
import { type CreateConductForm } from '../types';

interface ConductCreateModalProps {
  errorMessage: string;
  form: CreateConductForm;
  isPending: boolean;
  searchKeyword: string;
  searchResults: ConductInfo[];
  selectedStudent?: ConductInfo;
  onCategoryChange: (category: ConductCategory) => void;
  onClose: () => void;
  onScoreChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onSelectStudent: (userId: number) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

export function ConductCreateModal({
  errorMessage,
  form,
  isPending,
  searchKeyword,
  searchResults,
  selectedStudent,
  onCategoryChange,
  onClose,
  onScoreChange,
  onSearchChange,
  onSelectStudent,
  onSubmit,
}: ConductCreateModalProps) {
  return (
    <S.ModalOverlay role="presentation" onClick={onClose}>
      <S.Modal
        role="dialog"
        aria-modal="true"
        aria-labelledby="conduct-create-title"
        onClick={(event) => event.stopPropagation()}
      >
        <S.ModalHeader>
          <S.ModalTitle id="conduct-create-title">상벌점 부여</S.ModalTitle>
          <S.ModalCloseButton type="button" onClick={onClose}>
            닫기
          </S.ModalCloseButton>
        </S.ModalHeader>
        <S.ConductForm onSubmit={onSubmit}>
          <S.FormField>
            <S.FormLabel htmlFor="conduct-student">학생</S.FormLabel>
            <S.StudentSearchBox>
              <S.StudentSearchIcon src={searchIcon} alt="" />
              <S.StudentSearchInput
                id="conduct-student"
                value={searchKeyword}
                placeholder="이름, 학번, 방 번호 검색"
                onChange={(event) => onSearchChange(event.target.value)}
              />
            </S.StudentSearchBox>
            {selectedStudent && (
              <S.SelectedStudentCard>
                <strong>{selectedStudent.userName}</strong>
                <span>
                  {selectedStudent.studentNumber} · {selectedStudent.roomNumber}호
                </span>
              </S.SelectedStudentCard>
            )}
            <S.StudentResultList>
              {searchResults.map((student) => (
                <S.StudentResultButton
                  key={student.userId}
                  type="button"
                  $isSelected={form.userId === String(student.userId)}
                  onClick={() => onSelectStudent(student.userId)}
                >
                  <strong>{student.userName}</strong>
                  <S.StudentMeta>
                    {student.studentNumber} · {student.roomNumber}호
                  </S.StudentMeta>
                </S.StudentResultButton>
              ))}
            </S.StudentResultList>
            {searchKeyword && searchResults.length === 0 && (
              <S.StudentEmptyText>검색 결과가 없습니다.</S.StudentEmptyText>
            )}
          </S.FormField>

          <S.FormField>
            <S.FormLabel>구분</S.FormLabel>
            <S.CategoryGroup>
              <S.CategoryButton
                type="button"
                $isSelected={form.conductCategory === 'REWARD'}
                onClick={() => onCategoryChange('REWARD')}
              >
                상점
              </S.CategoryButton>
              <S.CategoryButton
                type="button"
                $isSelected={form.conductCategory === 'PENALTY'}
                onClick={() => onCategoryChange('PENALTY')}
              >
                벌점
              </S.CategoryButton>
            </S.CategoryGroup>
          </S.FormField>

          <S.FormField>
            <S.FormLabel htmlFor="conduct-score">점수</S.FormLabel>
            <S.FormInput
              id="conduct-score"
              type="number"
              min={1}
              value={form.score}
              placeholder="점수를 입력하세요"
              onChange={(event) => onScoreChange(event.target.value)}
            />
          </S.FormField>

          {errorMessage && <S.FormError>{errorMessage}</S.FormError>}

          <S.ModalActions>
            <S.SecondaryButton type="button" onClick={onClose}>
              취소
            </S.SecondaryButton>
            <S.SubmitButton type="submit" disabled={isPending}>
              {isPending ? '부여 중' : '부여'}
            </S.SubmitButton>
          </S.ModalActions>
        </S.ConductForm>
      </S.Modal>
    </S.ModalOverlay>
  );
}
