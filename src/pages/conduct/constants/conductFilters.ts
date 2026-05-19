import { type ConductCategory } from '@/features/conduct/api';

import { type CreateConductForm } from '../types';

export const genderFilters = ['전체', '남', '여'];
export const gradeFilters = ['전체', '1학년', '2학년', '3학년'];
export const classFilters = ['전체', '1반', '2반', '3반'];

export const initialCreateConductForm: CreateConductForm = {
  userId: '',
  conductCategory: 'REWARD',
  score: '',
};

export const skeletonColumnWidths = ['48px', '72px', '40px', '68px', '44px', '44px', '44px', '52px'];

export interface ConductScoreOption {
  reason: string;
  score: string;
}

export const conductScoreOptions: Record<ConductCategory, ConductScoreOption[]> = {
  REWARD: [
    { score: '1', reason: '생활 태도 우수' },
    { score: '2', reason: '청소 및 정리정돈 우수' },
    { score: '3', reason: '공동체 활동 참여' },
    { score: '5', reason: '모범 학생 추천' },
  ],
  PENALTY: [
    { score: '1', reason: '생활 규칙 미준수' },
    { score: '2', reason: '점호 및 귀사 시간 위반' },
    { score: '3', reason: '공용 공간 사용 규칙 위반' },
    { score: '5', reason: '기숙사 안전 규칙 위반' },
  ],
};
