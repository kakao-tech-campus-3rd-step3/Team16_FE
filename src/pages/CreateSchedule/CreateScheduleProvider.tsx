import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

type FormValues = {
  title: string;
  startTime: Date;
  location: { name: string; latitude: number; longitude: number };
  capacity: number;
  description: string;
};

type Props = {
  children: React.ReactNode;
};

export const CreateScheduleProvider: React.FC<Props> = ({ children }) => {
  const methods = useForm<FormValues>({
    defaultValues: {
      title: '',
      startTime: (() => {
        const d = new Date();
        d.setHours(d.getHours() + 1, 0, 0, 0);
        return d;
      })(),
      location: {
        name: '전남대학교 용봉탑',
        latitude: 35.17529475708064,
        longitude: 126.90613446497647,
      },
      capacity: 4,
      description: '',
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default CreateScheduleProvider;
