import { Route, BrowserRouter, Routes } from 'react-router-dom';
import styled from 'styled-components';

import Header from './components/Header';
import Issue from './components/Issue';

function App() {
  return (
    <AppContainer>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Issue />} />
        </Routes>
      </BrowserRouter>
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  height: 100vh;
`;
