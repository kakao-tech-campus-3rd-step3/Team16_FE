import React, { useRef, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import styled from '@emotion/styled';
import { colors } from '@/styles/colors';
import { typography } from '@/styles/typography';

const hours = Array.from({ length: 24 }, (_, i) => String(i).padStart(2, '0'));
const minutes = Array.from({ length: 6 }, (_, i) => String(i * 10).padStart(2, '0'));

const TimePicker = ({ control }: { control: any }) => {
  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);

  return (
    <Controller
      name="startTime"
      control={control}
      render={({ field: { onChange, value } }) => {
        const selectedHour = String(value.getHours()).padStart(2, '0');
        const selectedMinute = String(value.getMinutes()).padStart(2, '0');

        // 컴포넌트가 처음 렌더링될 때 현재 시간으로 스크롤을 이동
        useEffect(() => {
          const hourIndex = hours.indexOf(selectedHour);
          if (hourRef.current && hourIndex > -1) {
            hourRef.current.scrollTop = hourIndex * 40; // 각 아이템의 높이(40px)만큼 계산
          }

          const minuteIndex = minutes.indexOf(selectedMinute);
          if (minuteRef.current && minuteIndex > -1) {
            minuteRef.current.scrollTop = minuteIndex * 40;
          }
        }, []);

        const handleScroll = (
          type: 'hour' | 'minute',
          ref: React.RefObject<HTMLDivElement | null>
        ) => {
          if (!ref.current) return;
          const { scrollTop } = ref.current;
          const index = Math.round(scrollTop / 40);

          if (type === 'hour') {
            const newHour = hours[index];
            if (newHour !== selectedHour) {
              const newDate = new Date(value);
              newDate.setHours(Number(newHour));
              onChange(newDate);
            }
          } else {
            const newMinute = minutes[index];
            if (newMinute !== selectedMinute) {
              const newDate = new Date(value);
              newDate.setMinutes(Number(newMinute));
              onChange(newDate);
              console.log(newDate);
            }
          }
        };

        return (
          <PickerContainer>
            <WheelContainer ref={hourRef} onScroll={() => handleScroll('hour', hourRef)}>
              <Wheel>
                {hours.map((hour) => (
                  <TimeItem key={hour} isSelected={hour === selectedHour}>
                    {hour}
                  </TimeItem>
                ))}
              </Wheel>
            </WheelContainer>

            <Colon>:</Colon>

            <WheelContainer ref={minuteRef} onScroll={() => handleScroll('minute', minuteRef)}>
              <Wheel>
                {minutes.map((minute) => (
                  <TimeItem key={minute} isSelected={minute === selectedMinute}>
                    {minute}
                  </TimeItem>
                ))}
              </Wheel>
            </WheelContainer>
          </PickerContainer>
        );
      }}
    />
  );
};

const PickerContainer = styled.div({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 120, // 3개 아이템이 보이도록 높이 설정 (40px * 3)
  padding: '16px 0',
  gap: 32, // 시/분 선택창 사이 간격 넓힘 (예: 8 -> 32)

  // 중앙 선택 영역을 표시하는 가로선
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: colors.gray300,
    zIndex: 1,
  },
  '&::before': {
    top: 'calc(50% - 20px)', // (높이/2) - (아이템 높이/2)
  },
  '&::after': {
    bottom: 'calc(50% - 20px)',
  },
});

const WheelContainer = styled.div({
  height: '100%',
  overflowY: 'auto',
  scrollSnapType: 'y mandatory',
  '::-webkit-scrollbar': { display: 'none' },
  scrollbarWidth: 'none',
  width: 100,
});

const Wheel = styled.div({
  // (컨테이너 높이/2) - (아이템 높이/2) = (120/2) - (40/2) = 40px
  padding: '40px 0',
});

const TimeItem = styled.div<{ isSelected: boolean }>(({ isSelected }) => ({
  ...typography.h1,
  height: 40,
  width: 60, // 너비를 살짝 주어 간격 확보
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  scrollSnapAlign: 'center',
  color: isSelected ? colors.primary : colors.gray600,
  opacity: isSelected ? 1 : 0.5,
  transition: 'color 0.2s, opacity 0.2s',
  margin: '0 auto',
}));

const Colon = styled.span({
  ...typography.h1,
  color: colors.gray600,
  paddingBottom: 4,
});

export default TimePicker;
