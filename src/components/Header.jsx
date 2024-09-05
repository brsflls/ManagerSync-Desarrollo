import React, { useState } from 'react'
import {Link} from "react-router-dom"
import { ReactSVG } from 'react-svg';
import "../../dev/css/components/_header.css"
export const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    
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
                <Link to="/Soluciones">Soluciones</Link>
            </li>
            <li>
                <Link to="/Acercade">Acerca de</Link>
            </li>
            <li>
                <Link to="/Login">Iniciar sesión</Link>
            </li>
            <li>
                <Link to="/Register">Registrarse</Link>
            </li>

        </ul>
    </nav>)
}
