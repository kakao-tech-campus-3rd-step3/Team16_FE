import type { FieldErrors, UseFormRegister } from 'react-hook-form';

interface CreateGroupFormData {
  name: string;
  intro: string;
}

interface IntroSectionProps {
  register: UseFormRegister<CreateGroupFormData>;
  errors: FieldErrors<CreateGroupFormData>;
  intro: string;
}

interface NameSectionProps {
  register: UseFormRegister<CreateGroupFormData>;
  errors: FieldErrors<CreateGroupFormData>;
  name: string;
}

export type { CreateGroupFormData, IntroSectionProps, NameSectionProps };
