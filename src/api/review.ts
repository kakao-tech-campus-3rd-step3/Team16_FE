import { apiClient } from './apiClient';

export interface ReviewRequest {
  revieweeID: number;
  content: string;
  evaluation: 'POSITIVE' | 'NEGATIVE';
}

export interface ReviewResponse {
  status: string;
  code: string;
  message: string;
}

export const postReview = async (data: ReviewRequest): Promise<ReviewResponse> => {
  const res = await apiClient.post<ReviewResponse>('/users/review', data);
  return res.data;
};
