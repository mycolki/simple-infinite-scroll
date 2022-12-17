import styled from 'styled-components';

function Header() {
  return (
    <StyledHeader>
      <h1>Angular / Angular-cli</h1>
    </StyledHeader>
  );
}

export default Header;

const StyledHeader = styled.header`
  text-align: center;
`;
