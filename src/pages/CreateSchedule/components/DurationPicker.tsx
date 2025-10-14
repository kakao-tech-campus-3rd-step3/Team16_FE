import { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

//30간격으로 30부터 720까지
const durationOptions = Array.from({ length: 24 }, (_, i) => (i + 1) * 30);

interface DurationPickerProps {
  duration: number;
  onChange: (newTotalMinutes: number) => void; // onChange 추가
}

export const ConvertTimeString = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}시간 ${minutes}분`;
};

const DurationPicker = ({ duration = 30, onChange }: DurationPickerProps) => {
  const pickerRef = useRef<HTMLDivElement>(null);
  const selectedIndex = durationOptions.indexOf(duration);

  // 컴포넌트가 처음 렌더링될 때 선택된 시간으로 스크롤을 이동
  useEffect(() => {
    if (pickerRef.current && selectedIndex > -1) {
      pickerRef.current.scrollTop = selectedIndex * 40; // 각 아이템의 높이(40px)만큼 계산
    }
  }, []);

  const handleScroll = () => {
    if (!pickerRef.current) return;
    const { scrollTop } = pickerRef.current;
    const index = Math.round(scrollTop / 40);
    const newDuration = durationOptions[index];
    if (newDuration && newDuration !== duration) {
      onChange(newDuration); // onChange 호출
    }
  };

  return (
    <PickerContainer ref={pickerRef} onScroll={handleScroll}>
      <WheelContainer>
        {durationOptions.map((option) => (
          <PickerItem key={option} isSelected={option === duration}>
            {ConvertTimeString(option)}
          </PickerItem>
        ))}
      </WheelContainer>
    </PickerContainer>
  );
};

const PickerContainer = styled.div({
  position: 'relative',
  display: 'flex',
  width: '100%',
  height: '120px',
  justifyContent: 'center',
  overflowY: 'auto',
  scrollSnapType: 'y mandatory',
  '::-webkit-scrollbar': { display: 'none' },
});

const PickerItem = styled.div<{ isSelected: boolean }>(({ isSelected }) => ({
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  scrollSnapAlign: 'center',
  color: isSelected ? colors.primary : colors.gray600,
  transition: 'color 0.2s, opacity 0.2s',
  opacity: isSelected ? 1 : 0.5,
  ...typography.body,
}));

const WheelContainer = styled.div({
  padding: '40px 0',
  paddingBottom: '1000px',
});

export default DurationPicker;
