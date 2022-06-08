import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../assets/logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPeopleGroup,
  faPersonCirclePlus,
} from '@fortawesome/free-solid-svg-icons';
import { colors } from '../theme/colors';

/**
 * Our Navigation component. It displays a vertical bar on the left side of
 * the window. There are two icons in it, that link to the two existing views
 * Home (the current employee table) and CreateEmployee (the form to create an employee).
 * @constructor
 */
const Nav = () => {
  let location = useLocation();

  return (
    <StyledNav>
      <img src={Logo} alt="HRnet Home" className="logo" />
      <LinkContainer>
        <StyledLink
          to="/"
          color={location.pathname === '/' ? colors.primary : colors.grey}>
          <FontAwesomeIcon icon={faPeopleGroup} size={'lg'} />
        </StyledLink>
        <StyledLink
          to="/create-employee"
          color={
            location.pathname === '/create-employee'
              ? colors.primary
              : colors.grey
          }>
          <FontAwesomeIcon icon={faPersonCirclePlus} size={'lg'} />
        </StyledLink>
      </LinkContainer>
    </StyledNav>
  );
};

export default Nav;

const StyledNav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
  padding: 0.5rem;

  @media (min-width: 426px) {
    position: fixed;
    justify-content: start;
    flex-direction: column;
    min-height: 100vh;
    width: 64px;
  }

  .logo {
    width: 44px;
    @media (min-width: 426px) {
      margin: 0 auto;
      height: auto;
    }
  }

  &:after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: -5px;
    right: -5px;
    z-index: -1;
    box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.1);
    @media (min-width: 426px) {
      top: -5px;
      bottom: -5px;
      left: 0;
      right: 0;
      box-shadow: 3px 0 3px 0 rgba(0, 0, 0, 0.1);
    }
  }
`;

const LinkContainer = styled.div`
  display: flex;
  @media (min-width: 426px) {
    flex-direction: column;
    margin-top: 1rem;
  }
`;

const StyledLink = styled(Link)<{ color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  width: 44px;
  border-radius: 5px;
  border: solid 4px ${(props) => props.color};
  color: ${(props) => props.color};
  margin-right: 0.5rem;
  &:hover {
    border-color: ${colors.primary};
    color: ${colors.primary};
  }
  @media (min-width: 426px) {
    margin: 0.5rem auto;
    border: none;
  }
`;
