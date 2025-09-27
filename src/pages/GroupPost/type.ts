import type { FieldErrors, UseFormRegister } from 'react-hook-form';

interface GroupPostFormData {
  title: string;
  content: string;
  imageUrls?: string[];
  imageFiles?: File[];
}

interface ContentSectionProps {
  register: UseFormRegister<GroupPostFormData>;
  errors: FieldErrors<GroupPostFormData>;
  content: string;
}

interface TitleSectionProps {
  register: UseFormRegister<GroupPostFormData>;
  errors: FieldErrors<GroupPostFormData>;
  title: string;
}

interface ImagePickerProps {
  maxCount?: number;
  setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
  imageFiles: File[];
}

export type { GroupPostFormData, ContentSectionProps, TitleSectionProps, ImagePickerProps };
