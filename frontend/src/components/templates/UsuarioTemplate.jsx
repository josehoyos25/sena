import styled from "styled-components";
import { SidebarCard } from '../../index.js'

export function UsuarioTemplate() {
  return (
    <Container>
      <h1>Vista de Usuarios</h1>
      <>
       <SidebarCard />
      </>
      
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  background-color: ${(props) => props.theme.bgtotal};
  color: ${({ theme }) => theme.text};
  width: 100%;
`;