import { Routes, Route } from "react-router-dom";
import { Home,Admin,Fichas, Instructores, Horarios, Usuarios } from "../index";
export function MyRoutes() {
  return ( 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/fichas" element={<Fichas />} />
        <Route path="/instructores" element={<Instructores/>}></Route>
        <Route path="/horarios" element={<Horarios/>}></Route>
        <Route path="/usuarios" element={<Usuarios/>}></Route>
      </Routes>
    
      
  );
}
