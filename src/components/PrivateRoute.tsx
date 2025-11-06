import { Navigate, Outlet } from 'react-router';
import useAuthStore from '@/stores/authStore';

export const PrivateRoute = () => {
  const { isAuthenticated, studentVerifiedStatus } = useAuthStore();

  //로그인이 되어있지 않은경우
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  //학생인증이 되어있지 않은 경우
  if (studentVerifiedStatus === 'UNVERIFIED' || studentVerifiedStatus === 'PENDING') {
    return <Navigate to="/student" replace />;
  }

  //로그인이 되었고 학생 인증이 완료된 경우
  return <Outlet />;
};
