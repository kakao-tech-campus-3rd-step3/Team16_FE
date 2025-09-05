import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';
import { spacing } from '@/styles/spacing';

const ReviewSection = () => {
  return (
    <Wrapper>
      <Title>내가 받은 리뷰 보기</Title>
      <ReviewList>
        <ReviewListItem>
          <ReviewContent>친절해요!</ReviewContent>
        </ReviewListItem>
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
  gap: spacing.spacing5,
});

const ReviewListItem = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.spacing1,
  cursor: 'pointer',
});

const ReviewContent = styled.div({
  ...typography.body,
  color: colors.black,
});
