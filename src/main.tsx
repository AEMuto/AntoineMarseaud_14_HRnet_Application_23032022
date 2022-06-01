import React, {useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import Home from './views/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreateEmployee from './views/CreateEmployee';
import NotFound from './views/NotFound';
import Nav from './components/Nav';
import { GlobalStyles } from './theme/GlobalStyle';
import styled from 'styled-components';
import { Provider } from 'react-redux';
import { store } from './store/store';
import {useAppDispatch} from "./hooks";
import {getEmployees} from "./store/appThunks";

const App = () => {
  const dispatch = useAppDispatch()
  // Check if there is employees in the indexedDB
  // if there is none reflect this in the <Home/>
  useEffect(() => {
    dispatch(getEmployees({key:'employees'}))
  }, [])

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
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  width: calc(100vw - 80px); // Subtract the Nav width
  padding: 1rem;
`;
