import { Route, Routes as RouterRoutes } from 'react-router';
import HomePage from './Home/Page';
import LoginPage from './Login/Page';
import NicknamePage from './Nickname/Page';
import StudentPage from './Student/Page';
import Mypage from './Mypage/Page';
import GroupPage from './Group/Page';
import SettingPage from './Setting/Page';
import LeavePage from './Leave/Page';
import PendingApplicationPage from './PendingApplicationPage/Page';
import AlarmPage from './Alarm/Page';
import AttendPage from './Attend/Page';
import CreateGroupPage from './CreateGroup/Page';
//import { PrivateRoute } from '@/components/PrivateRoute';

export const Routes = () => {
  return (
    <RouterRoutes>
      {/* <Route element={<PrivateRoute />}> */}
      <Route path={'/'} element={<HomePage />} />
      <Route path={'/nickname'} element={<NicknamePage />} />
      <Route path={'/student'} element={<StudentPage />} />
      <Route path={'/mypage'} element={<Mypage />} />
      <Route path={'/setting'} element={<SettingPage />} />
      <Route path={'/group/:groupId'} element={<GroupPage />} />
      <Route path={'/leave'} element={<LeavePage />} />
      <Route path={'/pending-application'} element={<PendingApplicationPage />} />
      <Route path={'/alarm'} element={<AlarmPage />} />
      <Route path={'/group/:groupId/attend/:planId'} element={<AttendPage />} />
      <Route path={'/create-group'} element={<CreateGroupPage />} />
      {/* </Route> */}
      <Route path={'/login'} element={<LoginPage />} />
    </RouterRoutes>
  );
};
