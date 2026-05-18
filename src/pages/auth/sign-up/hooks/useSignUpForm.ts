import { type ChangeEvent, useState } from 'react';

import { type Gender, type SignUpRequest } from '@/features/auth/sign-up/api';

import { initialSignUpForm } from '../constants';
import { signUpFormFields, type SignUpStep } from '../types';

export function useSignUpForm() {
  const [form, setForm] = useState(initialSignUpForm);
  const [step, setStep] = useState<SignUpStep>('account');

  const hasValidRoomNumber = Number(form.roomNumber) > 0;
  const hasValidStudentNumber = Number(form.studentNumber) > 0;

  const isAccountStepValid =
    Boolean(form.username.trim()) &&
    Boolean(form.password.trim()) &&
    Boolean(form.email.trim());

  const isProfileStepValid =
    Boolean(form.name.trim()) &&
    Boolean(form.gender) &&
    hasValidRoomNumber &&
    hasValidStudentNumber;

  const isValid = isAccountStepValid && isProfileStepValid;

  const goToNextStep = () => {
    if (isAccountStepValid) {
      setStep('profile');
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const fieldName = event.currentTarget.dataset.field;

    if (!isSignUpFormField(fieldName)) {
      return;
    }

    setForm((prevForm) => ({
      ...prevForm,
      [fieldName]: value,
    }));
  };

  const isSignUpFormField = (fieldName?: string): fieldName is (typeof signUpFormFields)[number] =>
    Boolean(fieldName && signUpFormFields.includes(fieldName as (typeof signUpFormFields)[number]));

  const handleGenderChange = (gender: Gender) => {
    setForm((prevForm) => ({
      ...prevForm,
      gender,
    }));
  };

  const createPayload = (): SignUpRequest | null => {
    if (!isValid || !form.gender) {
      return null;
    }

    return {
      username: form.username.trim(),
      password: form.password,
      email: form.email.trim(),
      name: form.name.trim(),
      gender: form.gender,
      roomNumber: Number(form.roomNumber),
      studentNumber: Number(form.studentNumber),
    };
  };

  return {
    form,
    step,
    isValid,
    isAccountStepValid,
    goToNextStep,
    handleInputChange,
    handleGenderChange,
    createPayload,
  };
}
