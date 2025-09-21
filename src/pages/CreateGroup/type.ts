import type { FieldErrors, UseFormRegister } from 'react-hook-form';

interface CreateGroupFormData {
  groupName: string;
  groupIntro: string;
}

interface IntroSectionProps {
  register: UseFormRegister<CreateGroupFormData>;
  errors: FieldErrors<CreateGroupFormData>;
  groupIntro: string;
}

interface NameSectionProps {
  register: UseFormRegister<CreateGroupFormData>;
  errors: FieldErrors<CreateGroupFormData>;
  groupName: string;
}



export type { CreateGroupFormData, IntroSectionProps, NameSectionProps };