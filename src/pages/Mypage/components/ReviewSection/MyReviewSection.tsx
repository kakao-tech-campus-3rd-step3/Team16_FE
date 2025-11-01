import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import { spacing } from '@/styles/spacing';
import useAuthStore from '@/stores/authStore';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getUsersReview } from '@/api/userApi';

interface Review {
  groupId: number;
  groupName: string;
  content: string;
  evaluation: 'POSITIVE' | 'NEGATIVE';
}

const MyReviewSection = () => {
  const { id: myId } = useAuthStore();

  const { data: reviews } = useSuspenseQuery<Review[]>({
    queryKey: ['userReviews', myId],
    queryFn: () => getUsersReview(Number(myId)),
  });

  return (
    <Wrapper>
      <Title>내가 받은 리뷰</Title>
      <ReviewList>
        {reviews && reviews.length > 0 ? (
          reviews.map((r) => (
            <ReviewListItem key={r.groupId} evaluation={r.evaluation}>
              <GroupName>💬 {r.groupName}</GroupName>
              <ReviewContent>{r.content}</ReviewContent>
            </ReviewListItem>
          ))
        ) : (
          <div>아직 받은 리뷰가 없습니다.</div>
        )}
      </ReviewList>
    </Wrapper>
  );
};

export default MyReviewSection;

const Wrapper = styled.section({
  margin: `${spacing.spacing4}px ${spacing.spacing4}px`,
  padding: `${spacing.spacing4}px ${spacing.spacing4}px`,
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.spacing2,
  backgroundColor: colors.white,
  boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
  borderRadius: '16px',
});

const Title = styled.span({
  ...typography.h2,
  color: colors.black,
  marginBottom: spacing.spacing2,
});

const ReviewList = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.spacing2,
});

const ReviewListItem = styled.div<{ evaluation: 'POSITIVE' | 'NEGATIVE' }>(({ evaluation }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.spacing1,
  padding: spacing.spacing3,
  borderRadius: 8,
  backgroundColor: evaluation === 'POSITIVE' ? colors.primaryLight : colors.errorLight,
}));

const GroupName = styled.span({
  ...typography.caption,
  color: colors.gray700,
});

const ReviewContent = styled.div({
  ...typography.body,
  color: colors.black,
});
