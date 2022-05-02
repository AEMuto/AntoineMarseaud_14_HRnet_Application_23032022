import { Link } from 'react-router-dom';
import styled from "styled-components";

const Nav = () => {
  return (
    <nav>
      <Link to="/">Current Employees</Link>
      <Link to="/create-employee">Create Employee</Link>
    </nav>
  );
};

export default Nav;

const StyledNav = styled.nav`
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  height: 100vh;
  background-color: cornflowerblue;
`