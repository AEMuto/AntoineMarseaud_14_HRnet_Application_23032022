import styled from 'styled-components';
import loaderWhite from '../assets/loader-white.svg';
import loaderPrimary from '../assets/loader-primary.svg';

type sizeProp = 'stretch' | 'sm' | 'md' | 'lg' | string;

type loaderProps = {
  color?: 'primary' | 'white';
  size?: sizeProp;
};

/**
 * A component that render a loading spinner. It can have a color and a size prop
 * which make it easy to change its basic styling.
 * @param prop
 * @constructor
 */
function Loader(prop: loaderProps) {
  const { color, size } = prop;
  return (
    <LoaderContainer size={size}>
      <img
        src={color === 'white' ? loaderWhite : loaderPrimary}
        alt="loading spinner"
      />
    </LoaderContainer>
  );
}

export default Loader;

function getSize(value: string): string {
  switch (value) {
    case 'stretch':
      return '100%';
    case 'sm':
      return '5rem';
    case 'md':
      return '10rem';
    case 'lg':
      return '20rem';
    default:
      return value;
  }
}

const LoaderContainer = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
  img {
    height: ${(props: loaderProps) => props.size && getSize(props.size)};
`;
