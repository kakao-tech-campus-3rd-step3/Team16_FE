import GlobalStyle from './styles/GlobalStyle';
import { Routes } from './pages/Routes';
import { BaseLayout } from './Layout/BaseLayout';
import useUserInfo from '@/hooks/useUserInfo';
import useAuthStore from '@/stores/authStore';
import PWAUpdatePrompt from '@/components/common/PWAUpdatePrompt';
import { useEffect } from 'react';

function App() {
  const { setUserInfo } = useAuthStore();
  const { data: userInfo } = useUserInfo();

  useEffect(() => {
    if (userInfo) {
      setUserInfo(userInfo);
    }
  }, [userInfo]);

  return (
    <>
      <GlobalStyle />
      <PWAUpdatePrompt />
      <BaseLayout>
        <Routes />
      </BaseLayout>
    </>
  );
}

export default App;
