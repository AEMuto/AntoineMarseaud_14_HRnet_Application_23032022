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
import RepoLink from "./components/RepoLink";

const App = () => {
  const dispatch = useAppDispatch()
  // Try to get the employees' data from the Indexed DB
  // If there is none we'll get an error in our redux state
  // Then this error will be displayed if the user access
  // the employee list page (currently the home page)
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
      <RepoLink />
    </Provider>
  </React.StrictMode>,
);

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  @media (min-width: 426px) {
    // Subtract the Nav width
    width: calc(100% - 80px);
    margin-left: 80px;
    max-width: 1280px;
  }
`;
