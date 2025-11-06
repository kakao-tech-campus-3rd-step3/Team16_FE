/**
 * 출석 시간과 시작 시간의 차이를 계산하여 문자열로 반환
 * @param attendAt 출석 시간
 * @param startTime 시작 시간
 * @returns "n시간 m분 전" 또는 "n시간 m분 후" 형태의 문자열
 */
export const formatAttendanceTime = (attendAt: string, startTime: string): string => {
  const attendDate = new Date(attendAt);
  const startDate = new Date(startTime);

  // 시간 차이를 밀리초로 계산
  const diffMs = attendDate.getTime() - startDate.getTime();
  const absDiffMs = Math.abs(diffMs);

  // 시간과 분으로 변환
  const hours = Math.floor(absDiffMs / (1000 * 60 * 60));
  const minutes = Math.floor((absDiffMs % (1000 * 60 * 60)) / (1000 * 60));

  // 결과 문자열 생성
  const timeString = hours > 0 ? `${hours}시간 ${minutes}분` : `${minutes}분`;
  const suffix = diffMs < 0 ? '전' : '후';

  return `${timeString} ${suffix}`;
};
