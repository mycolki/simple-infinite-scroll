import { Route, BrowserRouter, Routes } from 'react-router-dom';
import styled from 'styled-components';

import Header from './components/Header';
import IssueDetail from './components/IssueDetail';
import IssueList from './components/IssueList';

function App() {
  return (
    <AppContainer>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IssueList />} />
          <Route path="/detail/:id" element={<IssueDetail />} />
        </Routes>
      </BrowserRouter>
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  height: 100vh;
`;
