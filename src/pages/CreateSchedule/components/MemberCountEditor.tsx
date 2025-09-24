import { Controller } from 'react-hook-form';
import styled from '@emotion/styled';
import { colors } from '@/styles/colors';

const MemberCountEditor = ({ control }: { control: any }) => (
  <EditorContainer>
    <Controller
      name="capacity"
      control={control}
      render={({ field: { value, onChange } }) => (
        <MemberCountContainer>
          <MemberCountInput value={value} readOnly />
          <CountLabel>명</CountLabel>
          <ButtonContainer>
            <DecrementButton
              type="button"
              onClick={() => onChange(Math.max(1, value - 1))}
              disabled={value <= 1}
            >
              −
            </DecrementButton>
            <IncrementButton
              type="button"
              onClick={() => onChange(Math.min(10, value + 1))}
              disabled={value >= 10}
            >
              +
            </IncrementButton>
          </ButtonContainer>
        </MemberCountContainer>
      )}
    />
  </EditorContainer>
);

const EditorContainer = styled.div({
  padding: '16px 0',
});

const MemberCountContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  borderRadius: 8,
  padding: '12px 16px',
  gap: 8,
  border: `1px solid ${colors.gray300}`,
});

const MemberCountInput = styled.input({
  border: 'none',
  fontSize: 16,
  fontWeight: 'bold',
  width: 20,
  textAlign: 'center',
  outline: 'none',
});

const CountLabel = styled.span({
  fontSize: 16,
});

const ButtonContainer = styled.div({
  display: 'flex',
  gap: 8,
  marginLeft: 'auto',
});

const DecrementButton = styled.button({
  border: `1px solid ${colors.gray600}`,
  borderRadius: 4,
  width: 32,
  height: 32,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 16,
  fontWeight: 'bold',
});

const IncrementButton = styled.button({
  backgroundColor: 'transparent',
  border: `1px solid ${colors.gray600}`,
  borderRadius: 4,
  width: 32,
  height: 32,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 16,
  fontWeight: 'bold',
});

export default MemberCountEditor;
