import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

type FormValues = {
  title: string;
  date: Date;
  time: string;
  location: { name: string; latitude: number; longitude: number };
  memberCount: number;
};

type Props = {
  children: React.ReactNode;
};

export const CreateScheduleProvider: React.FC<Props> = ({ children }) => {
  const methods = useForm<FormValues>({
    defaultValues: {
      title: '',
      date: new Date(),
      time: '14:00',
      location: {
        name: '전남대학교 용봉탑',
        latitude: 35.17529475708064,
        longitude: 126.90613446497647,
      },
      memberCount: 4,
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default CreateScheduleProvider;
