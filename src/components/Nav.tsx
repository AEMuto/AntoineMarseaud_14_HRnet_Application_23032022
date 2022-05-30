import {Link, useLocation} from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../assets/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPeopleGroup, faPersonCirclePlus } from '@fortawesome/free-solid-svg-icons';
import {colors} from "../theme/colors";

const Nav = () => {
  let location = useLocation();

  return (
    <StyledNav>
      <img src={Logo} alt="HRnet Home" className="logo" />
      <StyledLink to="/" color={location.pathname === '/' ? colors.primary : colors.grey}>
        <FontAwesomeIcon icon={faPeopleGroup} size={"lg"} />
      </StyledLink>
      <StyledLink to="/create-employee" color={location.pathname === '/create-employee' ? colors.primary : colors.grey}>
        <FontAwesomeIcon icon={faPersonCirclePlus} size={"lg"} />
      </StyledLink>
    </StyledNav>
  );
};

export default Nav;

const StyledNav = styled.nav`
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 100vh;
  height: auto;
  width: 64px;
  padding: 0.5rem;
  
  .logo {
    width: 44px;
    margin: 1rem auto;
  }
  
  &:after {
    content: '';
    position: absolute;
    top: -5px;
    bottom: -5px;
    left: 0;
    right: 0;
    z-index: -1;
    box-shadow: 3px 0 3px 0 rgba(0, 0, 0, 0.10);
  }
  
`;

const StyledLink = styled(Link)<{color: string}>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  width: 44px;
  margin: .5rem auto;
  border-radius: 5px;
  color: ${(props) => props.color};
  &:hover {
    color: ${colors.primary};
  }
`
