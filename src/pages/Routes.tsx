import { Route, Routes as RouterRoutes } from 'react-router';
import HomePage from './Home/Page';
import LoginPage from './Login/Page';
import NicknamePage from './Nickname/Page';
import StudentPage from './Student/Page';

export const Routes = () => {
  return (
    <RouterRoutes>
      <Route path={'/'} element={<HomePage />} />
      <Route path={'/login'} element={<LoginPage />} />
      <Route path={'/nickname'} element={<NicknamePage />} />
      <Route path={'/student'} element={<StudentPage />} />
    </RouterRoutes>
  );
};

