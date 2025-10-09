import GlobalStyle from './styles/GlobalStyle';
import { Routes } from './pages/Routes';
import { BaseLayout } from './Layout/BaseLayout';
import useUserInfo from '@/hooks/useUserInfo';
import useAuthStore from '@/stores/authStore';
import { useEffect } from 'react';

function App() {
  const { userId, setUserInfo, isAuthenticated } = useAuthStore();
  const { data: userInfo } = useUserInfo(userId!, { enabled: !!userId && isAuthenticated });

  useEffect(() => {
    if (userInfo) {
      setUserInfo(userInfo);
    }
  }, [userInfo, setUserInfo]);

  return (
    <>
      <GlobalStyle />
      <BaseLayout>
        <Routes />
      </BaseLayout>
    </>
  );
}

export default App;
