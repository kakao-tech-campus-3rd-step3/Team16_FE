import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import { spacing } from '@/styles/spacing';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getUsersReview } from '@/api/userApi';
import { useState } from 'react';

interface Review {
  groupId: number;
  groupName: string;
  content: string;
  evaluation: 'POSITIVE' | 'NEGATIVE';
}

interface UserReviewSectionProps {
  userId: number;
}

const UserReviewSection = ({ userId }: UserReviewSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { data: reviews, isError } = useSuspenseQuery<Review[]>({
    queryKey: ['userReviews', userId],
    queryFn: () => getUsersReview(userId),
  });

  if (isError) return <Wrapper>리뷰를 불러오는 중 오류가 발생했습니다.</Wrapper>;

  const displayedReviews = isExpanded ? reviews : reviews.slice(0, 3);
  const hasMoreThanThree = reviews && reviews.length > 3;

  return (
    <Wrapper>
      <Title>받은 리뷰</Title>
      <ReviewList>
        {reviews && reviews.length > 0 ? (
          <>
            {displayedReviews.map((r) => (
              <ReviewListItem key={r.groupId} evaluation={r.evaluation}>
                <GroupName>💬 {r.groupName}</GroupName>
                <ReviewContent>{r.content}</ReviewContent>
              </ReviewListItem>
            ))}

            {hasMoreThanThree && (
              <ToggleButton onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? '접기' : `더보기 (+${reviews.length - 3})`}
              </ToggleButton>
            )}
          </>
        ) : (
          <div>아직 받은 리뷰가 없습니다.</div>
        )}
      </ReviewList>
    </Wrapper>
  );
};

export default UserReviewSection;

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

const ToggleButton = styled.button({
  ...typography.small,
  color: colors.gray600,
  backgroundColor: 'transparent',
  border: 'none',
  padding: `${spacing.spacing2}px 0`,
  cursor: 'pointer',
  textAlign: 'center',
  marginTop: spacing.spacing2,

  '&:hover': {
    color: colors.primary,
  },
});
