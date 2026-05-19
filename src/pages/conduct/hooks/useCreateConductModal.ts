import { type FormEventHandler, useMemo, useState } from 'react';

import { type ConductCategory, type ConductInfo } from '@/features/conduct/api';
import { useCreateConductMutation } from '@/features/conduct/queries';
import { getApiErrorMessage } from '@/shared/api/types';

import { initialCreateConductForm } from '../constants';
import { type CreateConductForm } from '../types';

export function useCreateConductModal(conductInfos: ConductInfo[]) {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState<CreateConductForm>(initialCreateConductForm);
  const [errorMessage, setErrorMessage] = useState('');
  const [studentKeyword, setStudentKeyword] = useState('');

  const selectedStudent = conductInfos.find((student) => student.userId === Number(form.userId));
  const studentResults = useMemo(() => {
    const keyword = studentKeyword.trim();

    if (!keyword) {
      return conductInfos.slice(0, 5);
    }

    return conductInfos
      .filter((student) =>
        [student.userName, String(student.studentNumber), String(student.roomNumber)].some((value) =>
          value.includes(keyword),
        ),
      )
      .slice(0, 6);
  }, [conductInfos, studentKeyword]);

  const createConductMutation = useCreateConductMutation({
    onSuccess: closeModal,
    onError: (error) => {
      setErrorMessage(getApiErrorMessage(error, '상벌점 부여에 실패했습니다'));
    },
  });

  function openModal(defaultUserId?: number | null) {
    setErrorMessage('');
    setForm({
      ...initialCreateConductForm,
      userId: defaultUserId ? String(defaultUserId) : '',
    });
    setStudentKeyword('');
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setErrorMessage('');
    setStudentKeyword('');
    setForm(initialCreateConductForm);
  }

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
    modalProps: isOpen
      ? {
          errorMessage,
          form,
          isPending: createConductMutation.isPending,
          searchKeyword: studentKeyword,
          searchResults: studentResults,
          selectedStudent,
          onCategoryChange: updateCategory,
          onClose: closeModal,
          onScoreChange: updateScore,
          onSearchChange: setStudentKeyword,
          onSelectStudent: selectStudent,
          onSubmit: handleSubmit,
        }
      : null,
    openModal,
  };
}
