import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { useUser } from "./hooks/UserContext";
import "../../dev/css/components/_header.css";
import { Clock } from "./activity/clock";
import { HashLink, NavHashLink } from 'react-router-hash-link';

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useUser();

  return (
    <nav>
      {/* Condicional para redirigir según el estado de autenticación */}
      <Link to={user ? "/Settings" : "/"} className="logo">
        <ReactSVG src="src/assets/logo-completo.svg" />
      </Link>

      

      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={menuOpen ? "open" : ""}>
        {/* Mostrar solo si el usuario está autenticado */}
        {user ? (
          <li>
          
            <Link to="/Settings" className="text-slate-500 text-l">
              Perfil de usuario
            </Link> 
            
            <div className="flex items-center"><Clock/>
  <div className="m-5 w-3 h-3 bg-green-500 rounded-full mr-1" />
  <span className="leading-none">En línea</span>
</div>

          </li>
        ) : (
          // Mostrar solo si no hay usuario autenticado
          <>
            <li>
            <HashLink smooth to={'/#contacto'} className="active:bg-slate-200">Contacto</HashLink>
            </li>
            <li>
            <HashLink smooth to={'/#servicios'} className="active:bg-slate-200">Servicios</HashLink>
            </li>
            <li>
            <HashLink smooth to={'/#precio'} className="active:bg-slate-200">Precio</HashLink>
            </li>
            <li>
              <Link to="/Login" className="active:bg-slate-200">Iniciar sesión</Link>
            </li>
            <li>
              <Link to="/Registro" className="active:bg-slate-200">Registrarse</Link>
            </li>

          </>
        )}
      </ul>
    </nav>
  );
};
