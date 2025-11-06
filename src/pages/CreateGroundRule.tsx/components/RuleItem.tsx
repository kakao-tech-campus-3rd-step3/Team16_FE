import { FiEdit2, FiTrash2, FiCheck, FiX } from 'react-icons/fi';
import type { Rule } from '@/api/rulesApi';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import styled from '@emotion/styled';

interface Props {
  rule: Rule;
  isEditing: boolean;
  tempText: string;
  setTempText: (val: string) => void;
  onSave: (id: number) => void;
  onDelete: (id: number) => void;
  onCancel: () => void;
  onStartEdit: (rule: Rule) => void;
}

export function RuleItem({
  rule,
  isEditing,
  tempText,
  setTempText,
  onSave,
  onDelete,
  onCancel,
  onStartEdit,
}: Props) {
  return (
    <RuleBox
      isEditing={isEditing}
      hasValue={isEditing ? !!tempText.trim() : !!(rule.text ?? '').trim()}
    >
      {isEditing ? (
        <>
          <EditingInput
            value={tempText}
            onChange={(e) => setTempText(e.target.value)}
            placeholder="그라운드 룰을 입력하세요"
            autoFocus
          />
          <IconGroup>
            <IconButton
              variant="success"
              disabled={!tempText.trim()}
              onClick={() => onSave(rule.id)}
            >
              <FiCheck size={20} />
            </IconButton>
            <IconButton variant="danger" onClick={onCancel}>
              <FiX size={20} />
            </IconButton>
          </IconGroup>
        </>
      ) : (
        <>
          <RuleText>{rule.text ?? ''}</RuleText>
          <IconGroup>
            <IconButton variant="success" onClick={() => onStartEdit(rule)}>
              <FiEdit2 size={20} />
            </IconButton>
            <IconButton variant="danger" onClick={() => onDelete(rule.id)}>
              <FiTrash2 size={20} />
            </IconButton>
          </IconGroup>
        </>
      )}
    </RuleBox>
  );
}

const RuleBox = styled.div<{ hasValue: boolean; isEditing?: boolean }>(
  ({ hasValue, isEditing }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 16px',
    backgroundColor: isEditing ? colors.gray200 : hasValue ? colors.primaryLight : colors.gray200,
    borderRadius: '8px',
  })
);

const RuleText = styled.span({
  ...typography.body,
  color: colors.black,
  flex: 1,
});

const EditingInput = styled.input({
  flex: 1,
  border: 'none',
  outline: 'none',
  backgroundColor: 'transparent',
  ...typography.body,
  color: colors.black,
  '::placeholder': {
    color: colors.gray400,
  },
  fontSize: '16px',
});

const IconGroup = styled.div({
  display: 'flex',
  gap: '8px',
});

const variantColors = {
  success: {
    default: colors.primary,
    hover: colors.primaryDark,
  },
  danger: {
    default: colors.error,
    hover: colors.error,
  },
  edit: {
    default: colors.gray700,
    hover: colors.gray900,
  },
} as const;

const IconButton = styled.button<{
  variant?: 'success' | 'danger' | 'edit';
  disabled?: boolean;
}>(({ variant = 'edit', disabled }) => ({
  border: 'none',
  background: 'transparent',
  cursor: disabled ? 'not-allowed' : 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '4px',
  fontSize: '18px',
  color: disabled ? colors.gray400 : variantColors[variant].default,
  transition: 'color 0.2s ease',
  ':hover': {
    color: disabled ? colors.gray400 : variantColors[variant].hover,
  },
}));
