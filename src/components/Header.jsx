import React, { useState } from 'react'
import {Link} from "react-router-dom"
import { ReactSVG } from 'react-svg';
import { useUser } from './hooks/UserContext'; 
import "../../dev/css/components/_header.css";

export const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const { user } = useUser();
    
    return (
    <nav>
            <Link to="/" className="logo">
            <ReactSVG src="src/assets/logo-completo.svg" />

            </Link>
            <div className="menu" onClick={()=>{setMenuOpen(!menuOpen)}}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        <ul className={menuOpen ? "open" : ""}>
            <li>
                <Link to="/MantenimientoProductos">Mantenimiento de Productos</Link>
            </li>
            <li>
                <Link to="/MantenimientoProveedores">Mantenimiento de Proveedores</Link>
            </li>
            <li>
                <Link to="/Settings">Perfil de usuario</Link>

                {user && ( // Mostrar el círculo verde si hay un usuario autenticado
                <div className="relative">
                    <div className="w-3 h-3 bg-green-500 rounded-full absolute top-2 right-2" />En linea
                </div>
            )}
            </li>
            <li>
                <Link to="/Login">Iniciar sesión</Link>
            </li>
            <li>
                <Link to="/Registro">Registrarse</Link>
            </li>

        </ul>
    </nav>)
}