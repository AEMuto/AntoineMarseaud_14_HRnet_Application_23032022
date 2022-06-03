import styled from 'styled-components';
import { colors } from '../theme/colors';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../hooks';
import { setEmployees } from '../store/appThunks';
import { employeesMock50 } from '../mocks/employees_50';

/**
 * The error component. It is not agnostic, meaning that for the moment
 * it only handles the case when there is no "employees" key set in the
 * indexed DB and the user is currently on the <Home /> view.
 * @param error
 * @constructor
 */
const Error = (error: {message:string}) => {
  const dispatch = useAppDispatch();

  return (
    <ErrorContainer>
      <h3>It appears that there is currently no employees to display.</h3>
      <p>The error was:</p>
      <code>{error.message}</code>
      <p>You can either: </p>
      <ButtonContainer>
        <StyledLink to="/create-employee">Create a new employee</StyledLink> or{' '}
        <StyledButton onClick={() => dispatch(setEmployees(employeesMock50))}>
          Load mock data
        </StyledButton>
      </ButtonContainer>
    </ErrorContainer>
  );
};

export default Error;

const ErrorContainer = styled.div`
  padding: 1rem;
  margin: auto;
  border: solid 1px ${colors.grey};
  border-radius: 5px;
  background-color: ${colors.white};
  box-shadow: 0 6px 6px 4px rgba(0, 0, 0, 0.2);
  p {
    margin: 0.6rem 0;
  }
  code {
    background-color: ${colors.black};
    padding: 0.25rem;
    font-weight: 700;
    color: ${colors.white};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const StyledButton = styled.div`
  font-size: 1.2rem;
  font-weight: 550;
  padding: 0.6rem;
  border: 3px solid ${colors.primary};
  color: ${colors.dark};
  background-color: transparent;
  cursor: pointer;
  margin: 1.5rem;
  &:hover {
    color: ${colors.white};
    background-color: ${colors.primary};
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 550;
  padding: 0.6rem;
  border: 3px solid ${colors.primary};
  color: ${colors.dark};
  background-color: transparent;
  cursor: pointer;
  margin: 1.5rem;
  &:hover {
    color: ${colors.white};
    background-color: ${colors.primary};
  }
`;
