import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createRule, updateRule, deleteRule } from '@/api/rulesApi';
import type { Rule } from '@/api/rulesApi';

export function useRuleMutations(groupId: number) {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (text: string) => createRule(groupId, text),
    onSuccess: (newRule) => {
      queryClient.setQueryData<Rule[]>(['rules', groupId], (oldRules = []) => [
        ...oldRules,
        newRule,
      ]);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ ruleId, text }: { ruleId: number; text: string }) =>
      updateRule(groupId, ruleId, text),
    onSuccess: (updatedRule) => {
      queryClient.setQueryData<Rule[]>(['rules', groupId], (oldRules = []) =>
        oldRules.map((r) => (r.id === updatedRule.id ? updatedRule : r))
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (ruleId: number) => deleteRule(groupId, ruleId),
    onSuccess: (_, ruleId) => {
      queryClient.setQueryData<Rule[]>(['rules', groupId], (oldRules = []) =>
        oldRules.filter((r) => r.id !== ruleId)
      );
    },
  });

  return { createMutation, updateMutation, deleteMutation };
}
