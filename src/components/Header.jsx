import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import "../../dev/css/components/_header.css"; // Si necesitas mantener tus estilos personalizados

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="logo">
          <ReactSVG src="src/assets/logo-completo.svg" className="w-36" />
        </Link>
        {/* Menu button for mobile */}
        <div 
          className="menu md:hidden cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="block w-8 h-1 bg-white mb-1"></span>
          <span className="block w-8 h-1 bg-white mb-1"></span>
          <span className="block w-8 h-1 bg-white"></span>
        </div>
        {/* Navigation Links */}
        <ul className={`flex flex-col md:flex-row md:space-x-8 md:items-center absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent z-10 transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
          <li className="my-2 md:my-0 text-center">
            <Link to="/Soluciones" className="hover:text-yellow-500">Soluciones</Link>
          </li>
          <li className="my-2 md:my-0 text-center">
            <Link to="/" className="hover:text-yellow-500">Acerca de</Link>
          </li>
          <li className="my-2 md:my-0 text-center">
            <Link to="/LogIn" className="hover:text-yellow-500">Iniciar sesión</Link>
          </li>
          <li className="my-2 md:my-0 text-center">
            <Link to="/Registro" className="hover:text-yellow-500">Registrarse</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
