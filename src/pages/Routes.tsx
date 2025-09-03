import { Route, Routes as RouterRoutes } from 'react-router';
import HomePage from './Home/Page';
import LoginPage from './Login/Page';
import NicknamePage from './Nickname/Page';
import StudentPage from './Student/Page';
import { PrivateRoute } from '@/components/PrivateRoute';
import Mypage from './Mypage/Page';

export const Routes = () => {
  return (
    <RouterRoutes>
      {/* <Route element={<PrivateRoute />}> */}
      <Route path={'/'} element={<HomePage />} />
      <Route path={'/nickname'} element={<NicknamePage />} />
      <Route path={'/student'} element={<StudentPage />} />
      <Route path={'/mypage'} element={<Mypage />} />
      {/* </Route> */}
      <Route path={'/login'} element={<LoginPage />} />
    </RouterRoutes>
  );
};
