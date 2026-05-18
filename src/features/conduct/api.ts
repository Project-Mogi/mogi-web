import { apiClient } from '@/shared/api/client';
import { type ApiResponse } from '@/shared/api/types';

export type ConductGender = 'BOY' | 'GIRL';
export type ConductCategory = 'REWARD' | 'PENALTY';
export type SortDirection = 'ASC' | 'DESC';

export interface ConductInfo {
  userId: number;
  userName: string;
  studentNumber: number;
  roomNumber: number;
  totalRewardPoint: number;
  totalPenaltyPoint: number;
  totalPoint: number;
  gender?: ConductGender;
  grade?: number;
  classNumber?: number;
}

export interface ConductListResponseData {
  conductInfos: ConductInfo[];
}

export interface ConductDetailedInfo {
  conductCategory: ConductCategory;
  rewardCategory: string | null;
  penaltyCategory: string | null;
  givenScore: number;
}

export interface ConductDetail extends ConductInfo {
  conductDetailedInfo: ConductDetailedInfo[];
}

export interface ConductListFilters {
  gender?: ConductGender;
  grade?: number;
  classNumber?: number;
}

export async function getConductInfos(filters: ConductListFilters) {
  const response = await apiClient.get<ApiResponse<ConductListResponseData>>(getConductListPath(filters));

  if (!response.data.success || !response.data.data) {
    throw response.data;
  }

  return response.data.data.conductInfos;
}

export async function getConductDetail(userId: number, sort: SortDirection = 'DESC') {
  const response = await apiClient.get<ApiResponse<ConductDetail>>(`/conduct/id/${userId}`, {
    params: { sort },
  });

  if (!response.data.success || !response.data.data) {
    throw response.data;
  }

  return response.data.data;
}

function getConductListPath({ gender, grade, classNumber }: ConductListFilters) {
  if (grade && classNumber) {
    return `/conduct/grade/${grade}/class/${classNumber}`;
  }

  if (gender) {
    return `/conduct/gender/${gender}`;
  }

  if (grade) {
    return `/conduct/grade/${grade}`;
  }

  return '/conduct/';
}
