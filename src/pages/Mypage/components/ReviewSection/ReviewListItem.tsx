import styled from '@emotion/styled';
import { typography } from '@/styles/typography';
import { colors } from '@/styles/colors';

const ReviewListItem = () => {
  return (
    <Wrapper>
      <ReviewContent>좀 이상한 사람임. 갑자기 성경책을 읽자고 함.</ReviewContent>
    </Wrapper>
  );
};

export default ReviewListItem;

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'row',
});

const ReviewContent = styled.div({
  ...typography.body,
  color: colors.black,
});
