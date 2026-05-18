import { type ComponentPropsWithoutRef, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createConduct,
  getConductDetail,
  getConductInfos,
  type ConductCategory,
} from '@/features/conduct/api';
import { getApiErrorMessage } from '@/shared/api/types';

import { initialCreateConductForm } from '../constants';
import { type CreateConductForm, type SortOption } from '../types';
import {
  filterConductRows,
  formatDateLabel,
  getGenderValue,
  getNumberFromFilter,
  getTodayDateValue,
  sortConductRows,
} from '../utils';

export function useConductPage() {
  const queryClient = useQueryClient();
  const [selectedGender, setSelectedGender] = useState('전체');
  const [selectedGrade, setSelectedGrade] = useState('전체');
  const [selectedClass, setSelectedClass] = useState('전체');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(getTodayDateValue);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('latest');
  const [createConductForm, setCreateConductForm] = useState<CreateConductForm>(initialCreateConductForm);
  const [createConductError, setCreateConductError] = useState('');
  const [createStudentKeyword, setCreateStudentKeyword] = useState('');

  const conductFilters = useMemo(
    () => ({
      gender: getGenderValue(selectedGender),
      grade: getNumberFromFilter(selectedGrade),
      classNumber: getNumberFromFilter(selectedClass),
    }),
    [selectedClass, selectedGender, selectedGrade],
  );

  const {
    data: conductInfos = [],
    isError: isConductError,
    isLoading: isConductLoading,
    error: conductError,
  } = useQuery({
    queryKey: ['conduct', 'list', conductFilters],
    queryFn: () => getConductInfos(conductFilters),
  });

  const selectedStudent = conductInfos.find((row) => row.userId === selectedUserId);

  const {
    data: selectedStudentDetail,
    isError: isDetailError,
    isLoading: isDetailLoading,
    error: detailError,
  } = useQuery({
    queryKey: ['conduct', 'detail', selectedUserId],
    queryFn: () => getConductDetail(Number(selectedUserId)),
    enabled: Boolean(selectedUserId),
  });

  const tableRows = useMemo(
    () => sortConductRows(filterConductRows(conductInfos, searchKeyword), sortOption),
    [conductInfos, searchKeyword, sortOption],
  );
  const selectedCreateStudent = conductInfos.find((student) => student.userId === Number(createConductForm.userId));
  const createStudentResults = useMemo(() => {
    const keyword = createStudentKeyword.trim();

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
  }, [conductInfos, createStudentKeyword]);

  const createConductMutation = useMutation({
    mutationFn: createConduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['conduct'] });
      closeCreateModal();
    },
    onError: (error) => {
      setCreateConductError(getApiErrorMessage(error, '상벌점 부여에 실패했습니다'));
    },
  });

  const openCreateModal = () => {
    setCreateConductError('');
    setCreateConductForm({
      ...initialCreateConductForm,
      userId: selectedUserId ? String(selectedUserId) : '',
    });
    setCreateStudentKeyword('');
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
    setCreateConductError('');
    setCreateStudentKeyword('');
    setCreateConductForm(initialCreateConductForm);
  };

  const updateCreateConductForm = <K extends keyof CreateConductForm>(
    fieldName: K,
    value: CreateConductForm[K],
  ) => {
    setCreateConductForm((prevForm) => ({
      ...prevForm,
      [fieldName]: value,
    }));
  };

  const setCreateConductCategory = (conductCategory: ConductCategory) => {
    updateCreateConductForm('conductCategory', conductCategory);
  };

  const selectCreateStudent = (userId: number) => {
    updateCreateConductForm('userId', String(userId));
    setCreateConductError('');
  };

  const handleCreateConductSubmit: NonNullable<ComponentPropsWithoutRef<'form'>['onSubmit']> = (event) => {
    event.preventDefault();

    const userId = Number(createConductForm.userId);
    const score = Number(createConductForm.score);

    if (!userId) {
      setCreateConductError('학생을 선택해 주세요');
      return;
    }

    if (!Number.isInteger(score) || score < 1) {
      setCreateConductError('점수는 1점 이상으로 입력해 주세요');
      return;
    }

    setCreateConductError('');
    createConductMutation.mutate({
      userId,
      conductCategory: createConductForm.conductCategory,
      rewardCategory: null,
      penaltyCategory: null,
      score,
    });
  };

  return {
    conductErrorMessage: getApiErrorMessage(conductError, '상벌점 정보를 불러오지 못했습니다'),
    conductInfos,
    createConductError,
    createConductForm,
    createStudentKeyword,
    createStudentResults,
    detailErrorMessage: getApiErrorMessage(detailError, '상세 상벌점 정보를 불러오지 못했습니다.'),
    handleCreateConductSubmit,
    isConductError,
    isConductLoading,
    isCreateConductPending: createConductMutation.isPending,
    isCreateModalOpen,
    isDetailError,
    isDetailLoading,
    openCreateModal,
    closeCreateModal,
    searchKeyword,
    selectedClass,
    selectedDate,
    selectedDateLabel: formatDateLabel(selectedDate),
    selectedGender,
    selectedGrade,
    selectedStudent,
    selectedStudentDetail,
    selectedUserId,
    selectedCreateStudent,
    setCreateConductCategory,
    selectCreateStudent,
    setCreateStudentKeyword,
    setSearchKeyword,
    setSelectedDate,
    setSelectedClass,
    setSelectedGender,
    setSelectedGrade,
    setSelectedUserId,
    setSortOption,
    sortOption,
    tableRows,
    updateCreateConductForm,
  };
}
