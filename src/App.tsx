import GlobalStyle from './styles/GlobalStyle';
import { Routes } from './pages/Routes';
import { BaseLayout } from './Layout/BaseLayout';

function App() {
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
