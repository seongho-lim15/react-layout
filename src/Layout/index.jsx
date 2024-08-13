import styled from 'styled-components';
import { Header } from './Header';
import { Outlet } from 'react-router-dom';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const Content = styled.div`
    display: flex;
    flex: 1;
`;

const Main = styled.main`
    flex: 1;
    padding: 20px;
    display: flex;
`;


export const Layout = (props) => {
  return (
    <Container>
      <Header />
      <Main>
        {/*{props.children}*/}
        <Outlet />
      </Main>
    </Container>
  );
};
