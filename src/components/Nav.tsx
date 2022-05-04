import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../assets/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleGroup, faPersonCirclePlus } from '@fortawesome/free-solid-svg-icons';

const Nav = () => {
  return (
    <StyledNav>
      <img src={Logo} alt="HRnet Home" className="logo" />
      <StyledLink to="/">
        <FontAwesomeIcon icon={faPeopleGroup} size={"lg"} />
      </StyledLink>
      <StyledLink to="/create-employee">
        <FontAwesomeIcon icon={faPersonCirclePlus} size={"lg"} />
      </StyledLink>
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
  background-color: #7a80dd;
  width: 64px;
  .logo {
    background-color: #fff;
    border-radius: 5px;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  height: 44px;
  width: 44px;
  margin: 1rem auto;
  border-radius: 5px;
  &:visited {
    color: #2b2e4c;
  }
  &:hover {
    color: #7a80dd;
  }
`
