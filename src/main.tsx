import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './views/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateEmployee from './views/CreateEmployee';
import NotFound from './views/NotFound';
import Nav from './components/Nav';
import { GlobalStyles } from './theme/GlobalStyle';
import styled from 'styled-components';

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Nav />
      <StyledMain>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-employee" element={<CreateEmployee />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </StyledMain>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

const StyledMain = styled.main`
  width: calc(100vw - 132px);
  padding: 1rem;
`;
