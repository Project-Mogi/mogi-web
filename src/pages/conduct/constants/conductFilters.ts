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
