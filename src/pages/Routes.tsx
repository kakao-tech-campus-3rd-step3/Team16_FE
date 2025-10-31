import { Route, Routes as RouterRoutes, Outlet } from 'react-router';
import HomePage from './Home/Page';
import LoginPage from './Login/Page';
import ProfileEditPage from './ProfileEdit/Page';
import StudentPage from './Student/Page';
import GroupPage from './Group/Page';
import SettingPage from './Setting/Page';
import LeavePage from './Leave/Page';
import PendingApplicationPage from './PendingApplicationPage/Page';
import AlarmPage from './Alarm/Page';
import AttendPage from './Attend/Page';
import CreateGroupPage from './CreateGroup/Page';
import AllSchedulePage from './AllSchedule.tsx/Page';
import DemoPage from './DemoPage';
import MemberReview from './MemberReview/Page';
import CreateSchedulePage from './CreateSchedule/Page';
import LocationPage from './LocationInput/Page';
import CreateScheduleProvider from './CreateSchedule/CreateScheduleProvider';
import CreateGroundRule from './CreateGroundRule.tsx/Page';
import GroupPost from './GroupPost/page';
import { PrivateRoute } from '@/components/PrivateRoute';
import ApplyToJoinGroupPage from './ApplyToJoinGroup/Page'; // import the new page component
import MypageRouter from './Mypage';

export const Routes = () => {
  return (
    <RouterRoutes>
      <Route element={<PrivateRoute />}>
        <Route path={'/'} element={<HomePage />} />
        <Route path={'/profile-edit'} element={<ProfileEditPage />} />
        <Route path="/mypage" element={<MypageRouter />} />
        <Route path="/mypage/:userId" element={<MypageRouter />} />
        <Route path={'/setting'} element={<SettingPage />} />
        <Route path={'/group/:groupId'} element={<GroupPage />} />
        <Route path={'/leave'} element={<LeavePage />} />
        <Route path={'/group/:groupId/pending-application'} element={<PendingApplicationPage />} />
        <Route path={'/alarm'} element={<AlarmPage />} />
        <Route path={'/group/:groupId/attend/:planId'} element={<AttendPage />} />
        <Route path={'/create-group'} element={<CreateGroupPage />} />
        <Route path={'/group/:groupId/schedule'} element={<AllSchedulePage />} />
        <Route path={'/member-review'} element={<MemberReview />} />
        <Route path={'/group/:groupId/create-ground-rule'} element={<CreateGroundRule />} />
        <Route path={'/create-post/:groupId'} element={<GroupPost />} />
        <Route path={'/apply-to-join-group/:groupId'} element={<ApplyToJoinGroupPage />} />
        <Route path={'/group/:groupId/leave'} element={<LeavePage />} />
        {/* new route */}
        <Route
          element={
            <CreateScheduleProvider>
              <Outlet />
            </CreateScheduleProvider>
          }
        >
          <Route path={'/create-schedule/:groupId'} element={<CreateSchedulePage />} />
          <Route path={'/create-schedule/:groupId/:planId'} element={<CreateSchedulePage />} />
          <Route path={'/location-input/:groupId'} element={<LocationPage />} />
          <Route path={'/location-input/:groupId/:planId'} element={<LocationPage />} />
        </Route>
      </Route>
      <Route path={'/student'} element={<StudentPage />} />
      <Route path={'/login'} element={<LoginPage />} />
    </RouterRoutes>
  );
};
