import { useMutation } from '@tanstack/react-query';
import { postReview, type ReviewRequest, type ReviewResponse } from '@/api/review';

export const useReview = () => {
  return useMutation<ReviewResponse, Error, ReviewRequest>({
    mutationFn: postReview,
  });
};
