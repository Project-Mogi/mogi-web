import { type FormEventHandler } from 'react';

import {
  type ConductCategory,
  type ConductInfo,
} from '@/features/conduct/api';

import { type CreateConductForm } from './conductForm';

export interface ConductCreateFormProps {
  form: CreateConductForm;
  historyErrorMessage: string;
  historySummary?: {
    totalPenaltyPoint: number;
    totalPoint: number;
    totalRewardPoint: number;
  };
  isHistoryError: boolean;
  isHistoryLoading: boolean;
  isPending: boolean;
  searchKeyword: string;
  searchResultCount: number;
  searchResults: ConductInfo[];
  selectedStudent?: ConductInfo;
  totalStudentCount: number;
  onCancel: () => void;
  onCategoryChange: (category: ConductCategory) => void;
  onClearSearch: () => void;
  onScoreChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onSelectStudent: (userId: number) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
}
