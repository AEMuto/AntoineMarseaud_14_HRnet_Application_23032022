import { Link } from 'react-router-dom';
import styled from "styled-components";

/**
 * View for displaying a 404 not found page.
 * @constructor
 */
const NotFound = () => {
  return (
    <Container>
      <Title>404</Title>
      <h3>Not Found</h3>
      <p>This page doesn't exists</p>
      <Link to="/">Return</Link>
    </Container>
  );
};

export default NotFound;

const Container = styled.div`
  flex: 1;
  display: grid;
  place-content: center;
  text-align: center;
`

const Title = styled.h1`
  font-weight: 700;
  font-size: 4rem;
`
