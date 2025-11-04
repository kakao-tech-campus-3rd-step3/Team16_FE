import type { FieldErrors, UseFormRegister } from 'react-hook-form';

interface CreateGroupFormData {
  name: string;
  intro: string;
  imageUrls?: string[];
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

interface ImagePickerProps {
  maxCount?: number;
  setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
  imageFiles: File[];
}

export type { CreateGroupFormData, IntroSectionProps, NameSectionProps, ImagePickerProps };
