import { useState } from 'react';
import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import { typography } from '@/styles/typography';
import { useHeader } from '@/hooks/useHeader';
import PrimaryButton from '@/components/common/PrimaryButton';
import { FiEdit2, FiTrash2, FiCheck, FiX } from 'react-icons/fi';

interface Rule {
  id: number;
  text: string;
  isEditing: boolean;
}

export default function GroundRulePage() {
  useHeader({ centerContent: '그라운드룰 생성' });
  const [rules, setRules] = useState<Rule[]>([]);

  const handleAddRule = () => {
    if (rules.length >= 5) return;
    setRules((prev) => [...prev, { id: Date.now(), text: '', isEditing: true }]);
  };

  const handleChangeRule = (id: number, value: string) => {
    setRules((prev) => prev.map((rule) => (rule.id === id ? { ...rule, text: value } : rule)));
  };

  const handleSaveRule = (id: number) => {
    setRules((prev) => prev.map((rule) => (rule.id === id ? { ...rule, isEditing: false } : rule)));
  };

  const handleCancelRule = (id: number) => {
    setRules((prev) => prev.filter((rule) => rule.id !== id));
  };

  const handleDeleteRule = (id: number) => {
    setRules((prev) => prev.filter((rule) => rule.id !== id));
  };

  const handleEditRule = (id: number) => {
    setRules((prev) => prev.map((rule) => (rule.id === id ? { ...rule, isEditing: true } : rule)));
  };

  return (
    <Wrapper>
      {rules.length === 0 && (
        <EmptyWrapper>
          <EmptyState>
            모임의 원활한 활동을 위해서 <br></br>그라운드룰을 등록해보세요!
          </EmptyState>
        </EmptyWrapper>
      )}

      <RuleList>
        {rules.map((rule) => (
          <RuleBox key={rule.id} hasValue={!!rule.text.trim()}>
            {rule.isEditing ? (
              <>
                <EditingInput
                  value={rule.text}
                  placeholder="그라운드 룰을 입력하세요"
                  onChange={(e) => handleChangeRule(rule.id, e.target.value)}
                  autoFocus
                />
                <IconGroup>
                  <IconButton
                    variant="success"
                    disabled={!rule.text.trim()}
                    onClick={() => handleSaveRule(rule.id)}
                  >
                    <FiCheck size={20} />
                  </IconButton>
                  <IconButton variant="danger" onClick={() => handleCancelRule(rule.id)}>
                    <FiX size={20} />
                  </IconButton>
                </IconGroup>
              </>
            ) : (
              <>
                <RuleText>{rule.text}</RuleText>
                <IconGroup>
                  <IconButton variant="edit" onClick={() => handleEditRule(rule.id)}>
                    <FiEdit2 size={20} />
                  </IconButton>
                  <IconButton variant="danger" onClick={() => handleDeleteRule(rule.id)}>
                    <FiTrash2 size={20} />
                  </IconButton>
                </IconGroup>
              </>
            )}
          </RuleBox>
        ))}
      </RuleList>
      <PrimaryButton text="+ 추가하기" onClick={handleAddRule} disabled={rules.length >= 5} />
    </Wrapper>
  );
}

const Wrapper = styled.div({
  margin: `${spacing.spacing4}px`,
  display: 'flex',
  flexDirection: 'column',
});

const EmptyWrapper = styled.div({
  flex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '100px',
});

const EmptyState = styled.div({
  ...typography.h2,
  color: colors.black,
  textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'center',
});

const RuleList = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  marginBottom: '24px',
});

const RuleBox = styled.div<{ hasValue: boolean }>(({ hasValue }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 16px',
  backgroundColor: hasValue ? colors.primaryLight : colors.gray200,
  borderRadius: '8px',
}));

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
});

const IconGroup = styled.div({
  display: 'flex',
  gap: '8px',
});

const IconButton = styled.button<{
  variant?: 'success' | 'danger' | 'edit';
  disabled?: boolean;
}>(({ variant, disabled }) => ({
  border: 'none',
  background: 'transparent',
  cursor: disabled ? 'not-allowed' : 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '4px',
  fontSize: '18px',
  color: disabled
    ? colors.gray400
    : variant === 'success'
      ? colors.primary
      : variant === 'danger'
        ? colors.error
        : colors.gray700,
  transition: 'color 0.2s ease',
  ':hover': {
    color: disabled
      ? colors.gray400
      : variant === 'success'
        ? colors.primaryDark
        : variant === 'danger'
          ? colors.error
          : variant === 'edit'
            ? colors.gray900
            : colors.primary,
  },
}));
