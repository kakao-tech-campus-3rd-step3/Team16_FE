import { apiClient } from './apiClient';

export interface Rule {
  id: number;
  text: string;
  createdAt: string;
  updatedAt: string;
}

export const getRules = async (groupId: number): Promise<Rule[]> => {
  const res = await apiClient.get(`/groups/${groupId}/rule`);
  return res.data.map((r: any) => ({
    id: r.id,
    text: r.content ?? '',
    createdAt: r.createdAt,
    updatedAt: r.updatedAt,
  }));
};

export const getRule = async (groupId: number, ruleId: number): Promise<Rule> => {
  const res = await apiClient.get(`/groups/${groupId}/rule/${ruleId}`);
  const r = res.data;
  return {
    id: r.id,
    text: r.content,
    createdAt: r.createdAt,
    updatedAt: r.updatedAt,
  };
};

export const createRule = async (groupId: number, text: string): Promise<Rule> => {
  const res = await apiClient.post(`/groups/${groupId}/rule`, { content: text });
  const r = res.data;
  return {
    id: r.id,
    text: r.content,
    createdAt: r.createdAt,
    updatedAt: r.updatedAt,
  };
};

export const updateRule = async (groupId: number, ruleId: number, text: string): Promise<Rule> => {
  const res = await apiClient.put(`/groups/${groupId}/rule/${ruleId}`, { content: text });
  const r = res.data;
  return {
    id: r.id,
    text: r.content,
    createdAt: r.createdAt,
    updatedAt: r.updatedAt,
  };
};

export const deleteRule = async (groupId: number, ruleId: number) => {
  await apiClient.delete(`/groups/${groupId}/rule/${ruleId}`);
};
