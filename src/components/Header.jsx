import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { useUser } from "./hooks/UserContext";
import "../../dev/css/components/_header.css";

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
            <Link to="/Settings" className="text-blue-500 text-2xl">
              Perfil de usuario
            </Link>
            <div className="flex items-center">
  <div className="m-5 w-3 h-3 bg-green-500 rounded-full mr-1" />
  <span className="leading-none">En línea</span>
</div>

          </li>
        ) : (
          // Mostrar solo si no hay usuario autenticado
          <>
            <li>
              <Link to="/Login">Iniciar sesión</Link>
            </li>
            <li>
              <Link to="/Registro">Registrarse</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};
