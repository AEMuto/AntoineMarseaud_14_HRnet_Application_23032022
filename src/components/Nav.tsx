import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../assets/logo.svg';

const Nav = () => {
  return (
    <StyledNav>
      <img src={Logo} alt="HRnet Home" />
      <Link to="/">Current Employees</Link>
      <Link to="/create-employee">Create Employee</Link>
    </StyledNav>
  );
};

export default Nav;

const StyledNav = styled.nav`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: auto;
  padding: 1rem;
  background-color: #7A80DD;
  width: 64px;
  img {
    background-color: #fff;
  }
`;
