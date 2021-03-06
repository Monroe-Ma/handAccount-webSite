import React from 'react';
import Nav from 'component/Nav';
import styled from 'styled-components';
import TopBar from "component/TopBar"

const Wrapper = styled.div`
height: 100vh;
display: flex;
flex-direction: column;
background: #f6f6f6;
`;
const Main = styled.main`
flex-grow: 1;
display: flex;
flex-direction: column;
overflow-y: scroll;
-webkit-overflow-scrolling: touch;
`;
const Layout = (props: any) => {
  return <Wrapper>
    <TopBar {...props} >
    </TopBar > 
    <Main>
      { props.children}
    </Main>
     <Nav/>
      </Wrapper>
}
export default Layout;