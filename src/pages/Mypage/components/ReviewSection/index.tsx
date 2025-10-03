import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import { spacing } from '@/styles/spacing';

interface Review {
  id: number;
  content: string;
  evaluation: 'POSITIVE' | 'NEGATIVE';
}

const reviews: Review[] = [
  { id: 1, content: '조용하고 친절했어요.', evaluation: 'POSITIVE' },
  { id: 2, content: '시간 약속을 잘 안 지켜요.', evaluation: 'NEGATIVE' },
];

const ReviewSection = () => {
  return (
    <Wrapper>
      <Title>내가 받은 리뷰 보기</Title>
      <ReviewList>
        {reviews.map((r) => (
          <ReviewListItem key={r.id} evaluation={r.evaluation}>
            <ReviewContent>{r.content}</ReviewContent>
          </ReviewListItem>
        ))}
      </ReviewList>
    </Wrapper>
  );
};

export default ReviewSection;

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
  cursor: 'pointer',
}));

const ReviewContent = styled.div({
  ...typography.body,
  color: colors.black,
});
