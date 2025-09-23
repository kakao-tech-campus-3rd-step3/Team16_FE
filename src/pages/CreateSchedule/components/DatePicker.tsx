import { useState } from 'react';
import { Controller } from 'react-hook-form';
import styled from '@emotion/styled';
import { colors } from '@/styles/colors';

const weekDays = ['일', '월', '화', '수', '목', '금', '토'];

const DateTimePicker = ({ control, date }: { control: any; date: Date }) => {
  const [selectedDate, setSelectedDate] = useState(date);

  const today = new Date();
  const currentYear = selectedDate.getFullYear();
  const currentMonth = selectedDate.getMonth();

  // 달력 데이터 생성
  const generateCalendarDays = () => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const firstDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const days = [];

    // 이전 달의 빈 날들
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }

    // 현재 달의 날들
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const days = generateCalendarDays();

  // 이전/다음 달로 이동
  const goToPrevMonth = () => {
    setSelectedDate(new Date(currentYear, currentMonth - 1));
  };

  const goToNextMonth = () => {
    setSelectedDate(new Date(currentYear, currentMonth + 1));
  };

  // 오늘보다 이전 날짜인지 판별 함수
  const isPrevDay = (day: number | null) => {
    if (!day) return false;
    const dayDate = new Date(currentYear, currentMonth, day);
    return dayDate < today;
  };

  // 달력에서 선택된 날짜인지 판별 함수
  const isSelectedDay = (day: number | null, value: Date | null) => {
    if (!day || !value) return false;
    return (
      value.getFullYear() === currentYear &&
      value.getMonth() === currentMonth &&
      value.getDate() === day
    );
  };

  const isToday = (day: number | null) => {
    if (!day) return false;
    const today = new Date();
    return (
      today.getFullYear() === currentYear &&
      today.getMonth() === currentMonth &&
      today.getDate() === day
    );
  };

  return (
    <DateTimeContainer>
      <CalendarContainer>
        <CalendarHeader>
          <YearMonth>
            {currentYear}년 {currentMonth + 1}월
          </YearMonth>
          <NavButtons>
            <NavButton type="button" onClick={goToPrevMonth}>
              ‹
            </NavButton>
            <NavButton type="button" onClick={goToNextMonth}>
              ›
            </NavButton>
          </NavButtons>
        </CalendarHeader>

        <WeekDaysRow>
          {weekDays.map((day) => (
            <WeekDay key={day} $isWeekend={day === '일' || day === '토'}>
              {day}
            </WeekDay>
          ))}
        </WeekDaysRow>

        <CalendarGrid>
          {days.map((day, index) => (
            <Controller
              key={index}
              name="date"
              control={control}
              render={({ field }) => {
                return (
                  <CalendarDay
                    $isSelected={isSelectedDay(day, field.value)}
                    $isPrevDay={isPrevDay(day)}
                    $isToday={isToday(day)}
                    onClick={() => {
                      if (day && new Date(currentYear, currentMonth, day) >= today) {
                        setSelectedDate(new Date(currentYear, currentMonth, day));
                        field.onChange(new Date(currentYear, currentMonth, day));
                      }
                    }}
                  >
                    {day}
                  </CalendarDay>
                );
              }}
            />
          ))}
        </CalendarGrid>
      </CalendarContainer>
    </DateTimeContainer>
  );
};

const DateTimeContainer = styled.div({});

const CalendarContainer = styled.div({
  borderRadius: 12,
  padding: 16,
});

const CalendarHeader = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 16,
});

const YearMonth = styled.span({
  fontSize: 18,
  fontWeight: 'bold',
});

const NavButtons = styled.div({
  display: 'flex',
  gap: 8,
});

const NavButton = styled.button({
  background: 'transparent',
  border: 'none',
  color: '#aaa',
  fontSize: 30,
});

const WeekDaysRow = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  marginBottom: 8,
});

interface WeekDayProps {
  $isWeekend: boolean;
}
const WeekDay = styled.div<WeekDayProps>(({ $isWeekend }) => ({
  textAlign: 'center',
  fontSize: 12,
  color: $isWeekend ? '#ff6b6b' : '#aaa',
  padding: '8px 0',
  fontWeight: '500',
}));

const CalendarGrid = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: 2,
});

interface CalendarDayProps {
  $isSelected: boolean;
  $isToday: boolean;
  $isPrevDay: boolean;
}
const CalendarDay = styled.div<CalendarDayProps>(({ $isSelected, $isToday, $isPrevDay }) => ({
  textAlign: 'center',
  padding: 12,
  borderRadius: 8,
  fontSize: 14,
  transition: 'all 0.2s',
  backgroundColor: $isSelected ? colors.primary : $isToday ? colors.gray200 : 'transparent',
  color: $isPrevDay ? colors.gray400 : colors.black,
}));

export default DateTimePicker;
