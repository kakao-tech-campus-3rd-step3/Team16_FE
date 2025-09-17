import styled from '@emotion/styled';
import BaseModal from '@/components/common/BaseModal';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import { typography } from '@/styles/typography';
import TextLength from './common/TextLength';
import { useForm, Controller } from 'react-hook-form';
import { useReport } from '@/hooks/useReport';
import { useEffect } from 'react';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetType: 'USER' | 'GROUP' | 'POST' | 'COMMENT';
  targetId: number;
}

interface ReportForm {
  reason: string;
  detail: string;
}

const REPORT_REASONS = [
  { code: 'RELIGION_SUSPECT', label: '종교 의심됨' },
  { code: 'NOT_HEALTHY_PURPOSE', label: '건전한 목적이 아님' },
  { code: 'INAPPROPRIATE', label: '불쾌한 내용' },
  { code: 'FRAUD_OR_PRIVACY', label: '사기·개인정보 요구' },
  { code: 'OTHER', label: '기타' },
];

const MAX_LENGTH = 500;

const ReportModal = ({ isOpen, onClose, targetId, targetType }: ReportModalProps) => {
  const { mutate } = useReport(targetType, targetId);

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ReportForm>({
    defaultValues: { reason: '', detail: '' },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const errorMessage = errors.reason?.message || errors.detail?.message || '';

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const detail = watch('detail');

  const submitHandler = (data: ReportForm) => {
    mutate(
      { reasonCode: data.reason, reason: data.detail },
      {
        onSuccess: () => {
          alert('신고가 접수되었습니다.');
          onClose();
        },
        onError: () => {
          alert('신고 처리 중 오류가 발생했습니다.');
        },
      }
    );
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} variant="center" maxWidth={320}>
      <Title>신고하기</Title>

      <form onSubmit={handleSubmit(submitHandler)}>
        <ReasonList>
          {REPORT_REASONS.map(({ code, label }) => (
            <ReasonItem key={code}>
              <Controller
                name="reason"
                control={control}
                rules={{ required: '신고 사유를 선택해주세요.' }}
                render={({ field }) => (
                  <CustomCheckbox
                    type="checkbox"
                    checked={field.value === code}
                    onChange={() => field.onChange(field.value === code ? '' : code)}
                  />
                )}
              />
              <span>{label}</span>
            </ReasonItem>
          ))}
        </ReasonList>

        <DetailTextarea
          placeholder="신고사유를 적어주세요."
          {...register('detail', {
            maxLength: {
              value: MAX_LENGTH,
              message: `최대 ${MAX_LENGTH}자까지 입력 가능합니다.`,
            },
          })}
        />
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

        <Bottom>
          <TextLength currentLength={detail.length} maxLength={MAX_LENGTH} />
        </Bottom>

        <ButtonGroup>
          <CancelButton type="button" onClick={onClose}>
            취소하기
          </CancelButton>
          <SubmitButton type="submit">신고하기</SubmitButton>
        </ButtonGroup>
      </form>
    </BaseModal>
  );
};

export default ReportModal;

const Title = styled.h2({
  ...typography.h2,
  marginBottom: spacing.spacing3,
  textAlign: 'center',
});

const ReasonList = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.spacing2,
  marginBottom: spacing.spacing3,
});

const ReasonItem = styled.label({
  display: 'flex',
  alignItems: 'center',
  gap: spacing.spacing2,
  ...typography.body,
});

const CustomCheckbox = styled.input({
  appearance: 'none',
  width: '18px',
  height: '18px',
  border: `1px solid ${colors.gray400}`,
  borderRadius: '4px',
  cursor: 'pointer',
  '&:checked': {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
});

const DetailTextarea = styled.textarea({
  ...typography.body,
  fontFamily: typography.fontFamily,
  width: '100%',
  maxWidth: '100%',
  minHeight: '136px',
  padding: spacing.spacing2,
  border: `1px solid ${colors.gray300}`,
  borderRadius: '8px',
  resize: 'none',
  boxSizing: 'border-box',
  backgroundColor: colors.backgroundGray,
  outline: 'none',
  '&:focus': {
    borderColor: colors.primary,
  },
  marginBottom: spacing.spacing1,
});

const Bottom = styled.div({
  display: 'flex',
});

const ErrorMessage = styled.span({
  ...typography.caption,
  color: colors.error,
  marginLeft: spacing.spacing1,
});

const ButtonGroup = styled.div({
  display: 'flex',
  gap: spacing.spacing2,
  marginTop: spacing.spacing2,
});

const CancelButton = styled.button({
  flex: 1,
  padding: spacing.spacing3,
  borderRadius: '8px',
  border: `1px solid ${colors.gray300}`,
  backgroundColor: colors.white,
  cursor: 'pointer',
  ...typography.body,
});

const SubmitButton = styled.button({
  flex: 1,
  padding: spacing.spacing3,
  borderRadius: '8px',
  border: 'none',
  backgroundColor: colors.primary,
  color: colors.white,
  cursor: 'pointer',
  ...typography.body,
  fontWeight: 600,
});
