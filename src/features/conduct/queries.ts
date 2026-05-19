import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createConduct,
  getConductDetail,
  getConductInfos,
  type ConductDetail,
  type ConductInfo,
  type ConductListFilters,
  type CreateConductRequest,
  type CreateConductResponseData,
} from './api';

export const conductQueryKeys = {
  all: ['conduct'] as const,
  detail: (userId: number | null) => [...conductQueryKeys.all, 'detail', userId] as const,
  list: (filters: ConductListFilters) => [...conductQueryKeys.all, 'list', filters] as const,
};

export function useConductInfosQuery(filters: ConductListFilters) {
  return useQuery<ConductInfo[], unknown>({
    queryKey: conductQueryKeys.list(filters),
    queryFn: () => getConductInfos(filters),
  });
}

export function useConductDetailQuery(userId: number | null) {
  return useQuery<ConductDetail, unknown>({
    queryKey: conductQueryKeys.detail(userId),
    queryFn: () => getConductDetail(Number(userId)),
    enabled: Boolean(userId),
  });
}

interface UseCreateConductMutationOptions {
  onError?: (error: unknown) => void;
  onSuccess?: () => void;
}

export function useCreateConductMutation({
  onError,
  onSuccess,
}: UseCreateConductMutationOptions = {}) {
  const queryClient = useQueryClient();

  return useMutation<CreateConductResponseData, unknown, CreateConductRequest>({
    mutationFn: (payload: CreateConductRequest) => createConduct(payload),
    onError,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: conductQueryKeys.all });
      onSuccess?.();
    },
  });
}
