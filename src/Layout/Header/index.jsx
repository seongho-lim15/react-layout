import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Container = styled.header`
    background-color: #00bd94;
    color: #fff;
    padding: 20px;
`;

const Nav = styled.nav`
    margin-top: 10px;
`;

const Logo = styled.img`
    width: 150px;
`;

const HeaderNavLink = styled(NavLink)`
    color: #fff;
    text-decoration: none;
    margin-right: 20px;
    font-size: 18px;

    &.active {
        text-decoration: underline;
        font-weight: bold;
    }

    &:hover {
        text-decoration: underline;
    }
`;

export const Header = () => {
  return (
    <Container>
      {/*<Logo src="https://via.placeholder.com/150" alt="Logo" />*/}
      <Nav>
        <HeaderNavLink to="/main" end>Main</HeaderNavLink>
        <HeaderNavLink to="/matching">Matching</HeaderNavLink>
      </Nav>
    </Container>
  );

};
