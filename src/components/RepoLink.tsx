import { ReactComponent as GithubLogo } from '../assets/github-logo.svg';
import styled from 'styled-components';
import { colors } from '../theme/colors';

const RepoLink = () => {
  return (
    <StyledLink className="repoLink" href="https://github.com/AEMuto/AntoineMarseaud_13_16022022" target="_blank" rel="noopener noreferrer" title="View on GitHub">
      <GithubLogo fill={colors.primary}/>
    </StyledLink>
  );
};

export default RepoLink;

const StyledLink = styled.a`
  position:fixed;
  width: 3rem;
  height: 3rem;
  bottom: 1rem;
  right: 1rem;
  background-color: ${colors.white};
  border-radius: 100%;
  & svg {
    -webkit-filter: drop-shadow( 0px 2px 4px rgba(0, 0, 0, .4));
    filter: drop-shadow( 0px 2px 4px rgba(0, 0, 0, .4));
  }
  &:hover svg {
    fill: ${colors.secondary};
  }
`;