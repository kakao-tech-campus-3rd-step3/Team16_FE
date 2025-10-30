import { useParams } from 'react-router-dom';
import MyPage from './MyPage';
import UserPage from './UserPage';

const MypageRouter = () => {
  const { userId } = useParams<{ userId?: string }>();

  if (userId) {
    return <UserPage userId={Number(userId)} />;
  }

  return <MyPage />;
};

export default MypageRouter;
