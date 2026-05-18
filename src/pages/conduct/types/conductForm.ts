import { type ConductCategory } from '@/features/conduct/api';

export type SortOption = 'latest' | 'reward' | 'penalty' | 'total';

export interface CreateConductForm {
  userId: string;
  conductCategory: ConductCategory;
  score: string;
}
