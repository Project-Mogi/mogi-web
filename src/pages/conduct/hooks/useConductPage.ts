import { useConductInfosQuery } from '@/features/conduct/queries';
import { getApiErrorMessage } from '@/shared/api/types';

import { useConductDetailModal } from './useConductDetailModal';
import { useConductFilters, useConductTableRows } from './useConductFilters';
import { useCreateConductModal } from './useCreateConductModal';

export function useConductPage() {
  const filterState = useConductFilters();
  const conductListQuery = useConductInfosQuery(filterState.queryFilters);
  const conductInfos = conductListQuery.data ?? [];
  const tableRows = useConductTableRows(
    conductInfos,
    filterState.searchKeyword,
    filterState.sortOption,
  );
  const detailModal = useConductDetailModal(conductInfos, filterState.selectedGender);
  const createModal = useCreateConductModal(conductInfos);

  return {
    controlsProps: filterState.controlsProps,
    filtersProps: {
      ...filterState.filtersProps,
      onCreateClick: () => createModal.openModal(detailModal.selectedUserId),
    },
    tableProps: {
      errorMessage: getApiErrorMessage(
        conductListQuery.error,
        '상벌점 정보를 불러오지 못했습니다',
      ),
      isError: conductListQuery.isError,
      isLoading: conductListQuery.isLoading,
      rows: tableRows,
      selectedGender: filterState.selectedGender,
      selectedUserId: detailModal.selectedUserId,
      onSelectUser: detailModal.selectUser,
    },
    detailModalProps: detailModal.modalProps,
    createModalProps: createModal.modalProps,
  };
}
