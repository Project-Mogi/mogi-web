import { type FormEventHandler, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { type ConductCategory } from '@/features/conduct/api';
import { useConductInfosQuery, useCreateConductMutation } from '@/features/conduct/queries';
import { getApiErrorMessage } from '@/shared/api/types';

import { initialCreateConductForm } from '../constants';
import { type CreateConductForm } from '../types';

export function useConductCreatePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultUserId = searchParams.get('userId') ?? '';
  const conductListQuery = useConductInfosQuery({});
  const conductInfos = useMemo(() => conductListQuery.data ?? [], [conductListQuery.data]);
  const [form, setForm] = useState<CreateConductForm>({
    ...initialCreateConductForm,
    userId: defaultUserId,
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [studentKeyword, setStudentKeyword] = useState('');

  const selectedStudent = conductInfos.find((student) => student.userId === Number(form.userId));
  const filteredStudents = useMemo(() => {
    const keyword = studentKeyword.trim();

    if (!keyword) {
      return conductInfos;
    }

    return conductInfos
      .filter((student) =>
        [student.userName, String(student.studentNumber), String(student.roomNumber)].some((value) =>
          value.includes(keyword),
        ),
      );
  }, [conductInfos, studentKeyword]);
  const studentResults = filteredStudents;

  const createConductMutation = useCreateConductMutation({
    onSuccess: () => navigate('/conduct'),
    onError: (error) => {
      setErrorMessage(getApiErrorMessage(error, '상벌점 부여에 실패했습니다'));
    },
  });

  function updateForm<K extends keyof CreateConductForm>(fieldName: K, value: CreateConductForm[K]) {
    setForm((prevForm) => ({
      ...prevForm,
      [fieldName]: value,
    }));
  }

  function selectStudent(userId: number) {
    updateForm('userId', String(userId));
    setErrorMessage('');
  }

  function updateCategory(conductCategory: ConductCategory) {
    updateForm('conductCategory', conductCategory);
  }

  function updateScore(score: string) {
    updateForm('score', score);
  }

  function clearSearchKeyword() {
    setStudentKeyword('');
  }

  function goBackToList() {
    navigate('/conduct');
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const userId = Number(form.userId);
    const score = Number(form.score);

    if (!userId) {
      setErrorMessage('학생을 선택해 주세요');
      return;
    }

    if (!Number.isInteger(score) || score < 1) {
      setErrorMessage('점수는 1점 이상으로 입력해 주세요');
      return;
    }

    setErrorMessage('');
    createConductMutation.mutate({
      userId,
      conductCategory: form.conductCategory,
      rewardCategory: null,
      penaltyCategory: null,
      score,
    });
  };

  return {
    formProps: {
      errorMessage,
      form,
      isPending: createConductMutation.isPending,
      searchKeyword: studentKeyword,
      searchResultCount: filteredStudents.length,
      searchResults: studentResults,
      selectedStudent,
      totalStudentCount: conductInfos.length,
      onCancel: goBackToList,
      onCategoryChange: updateCategory,
      onClearSearch: clearSearchKeyword,
      onScoreChange: updateScore,
      onSearchChange: setStudentKeyword,
      onSelectStudent: selectStudent,
      onSubmit: handleSubmit,
    },
    isStudentListError: conductListQuery.isError,
    isStudentListLoading: conductListQuery.isLoading,
    studentListErrorMessage: getApiErrorMessage(
      conductListQuery.error,
      '학생 정보를 불러오지 못했습니다',
    ),
    onCancel: goBackToList,
  };
}
