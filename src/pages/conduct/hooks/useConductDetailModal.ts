import { useMemo, useState } from 'react';

import { type ConductInfo } from '@/features/conduct/api';
import { useConductDetailQuery } from '@/features/conduct/queries';
import { getApiErrorMessage } from '@/shared/api/types';

export function useConductDetailModal(conductInfos: ConductInfo[], selectedGender: string) {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const selectedStudent = useMemo(
    () => conductInfos.find((student) => student.userId === selectedUserId),
    [conductInfos, selectedUserId],
  );

  const {
    data: selectedStudentDetail,
    error,
    isError,
    isLoading,
  } = useConductDetailQuery(selectedUserId);

  const closeModal = () => {
    setSelectedUserId(null);
  };

  return {
    modalProps: selectedStudent
      ? {
          detail: selectedStudentDetail,
          errorMessage: getApiErrorMessage(error, '상세 상벌점 정보 조회 실패'),
          isError,
          isLoading,
          selectedGender,
          student: selectedStudent,
          onClose: closeModal,
        }
      : null,
    selectedUserId,
    selectUser: setSelectedUserId,
  };
}
