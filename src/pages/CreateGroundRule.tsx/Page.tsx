import { useState } from 'react';
import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import { typography } from '@/styles/typography';
import { useHeader } from '@/hooks/useHeader';
import PrimaryButton from '@/components/common/PrimaryButton';
import { FiEdit2, FiTrash2, FiCheck, FiX } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getRules } from '@/api/rulesApi';
import { useRuleMutations } from '@/hooks/useRuleMutation';

export default function GroundRulePage() {
  useHeader({ centerContent: '그라운드룰 생성' });
  const { groupId } = useParams();
  const numericGroupId = Number(groupId);

  const { data: rules = [] } = useQuery({
    queryKey: ['rules', numericGroupId],
    queryFn: () => getRules(numericGroupId),
    enabled: !!numericGroupId,
  });

  const { createMutation, updateMutation, deleteMutation } = useRuleMutations(numericGroupId);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [tempText, setTempText] = useState('');

  const handleAddRule = () => {
    if (rules.length >= 5) return;
    setEditingId(-1);
    setTempText('');
  };

  const handleSaveRule = (id: number) => {
    if (id === -1) {
      createMutation.mutate(tempText);
    } else {
      updateMutation.mutate({ ruleId: id, text: tempText });
    }
    setEditingId(null);
    setTempText('');
  };

  const handleDeleteRule = (id: number) => {
    deleteMutation.mutate(id);
  };

  return (
    <Wrapper>
      {rules.length === 0 && editingId === null && (
        <EmptyWrapper>
          <EmptyState>
            모임의 원활한 활동을 위해서 <br />
            그라운드룰을 등록해보세요!
          </EmptyState>
        </EmptyWrapper>
      )}

      <RuleList>
        {rules.map((rule) => {
          const isEditing = editingId === rule.id;
          return (
            <RuleBox
              key={rule.id}
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
                      onClick={() => handleSaveRule(rule.id)}
                    >
                      <FiCheck size={20} />
                    </IconButton>
                    <IconButton variant="danger" onClick={() => setEditingId(null)}>
                      <FiX size={20} />
                    </IconButton>
                  </IconGroup>
                </>
              ) : (
                <>
                  <RuleText>{rule.text ?? ''}</RuleText>
                  <IconGroup>
                    <IconButton
                      variant="success"
                      onClick={() => {
                        setEditingId(rule.id);
                        setTempText(rule.text ?? '');
                      }}
                    >
                      <FiEdit2 size={20} />
                    </IconButton>
                    <IconButton variant="danger" onClick={() => handleDeleteRule(rule.id)}>
                      <FiTrash2 size={20} />
                    </IconButton>
                  </IconGroup>
                </>
              )}
            </RuleBox>
          );
        })}

        {editingId === -1 && (
          <RuleBox key="new" isEditing hasValue={!!tempText.trim()}>
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
                onClick={() => handleSaveRule(-1)}
              >
                <FiCheck size={20} />
              </IconButton>
              <IconButton variant="danger" onClick={() => setEditingId(null)}>
                <FiX size={20} />
              </IconButton>
            </IconGroup>
          </RuleBox>
        )}
      </RuleList>

      <PrimaryButton
        text="+ 추가하기"
        onClick={handleAddRule}
        disabled={rules.length >= 5 || editingId !== null}
      />
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
