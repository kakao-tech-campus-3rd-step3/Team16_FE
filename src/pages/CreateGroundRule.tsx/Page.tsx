import { useState } from 'react';
import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { spacing } from '@/styles/spacing';
import { typography } from '@/styles/typography';
import { useHeader } from '@/hooks/useHeader';
import PrimaryButton from '@/components/common/PrimaryButton';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getRules } from '@/api/rulesApi';
import { useRuleMutations } from '@/hooks/useRuleMutation';
import { RuleItem } from './components/RuleItem';

const MAX_RULE_COUNT = 5;

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
    if (rules.length >= MAX_RULE_COUNT) return;
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
        {rules.map((rule) => (
          <RuleItem
            key={rule.id}
            rule={rule}
            isEditing={editingId === rule.id}
            tempText={tempText}
            setTempText={setTempText}
            onSave={handleSaveRule}
            onDelete={(id) => deleteMutation.mutate(id)}
            onCancel={() => setEditingId(null)}
            onStartEdit={(r) => {
              setEditingId(r.id);
              setTempText(r.text ?? '');
            }}
          />
        ))}

        {editingId === -1 && (
          <RuleItem
            key="new"
            rule={{ id: -1, text: '', createdAt: '', updatedAt: '' }}
            isEditing
            tempText={tempText}
            setTempText={setTempText}
            onSave={handleSaveRule}
            onDelete={() => {}}
            onCancel={() => setEditingId(null)}
            onStartEdit={() => {}}
          />
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
