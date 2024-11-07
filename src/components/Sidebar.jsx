import { useState } from "react";
import { Link } from "react-router-dom";
import logoImage from '../assets/logo-reducido.svg';
import controlImage from '../assets/control.svg';
import { useNavigate } from "react-router-dom";

export function Sidebar({ logout }) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/");
    };

    const Menus = [
        { title: "Ventas", src: "Ventas",  link: "/Punto_venta" },
        { title: "Compras", src: "Compras", link: "/ConsultarCompras"  },
        { title: "Reportes", src: "Reportes", gap: true },
        { title: "Inventarios", src: "Inventarios" , link: "/ConsultarProductos"},
        { title: "Clientes", src: "Clientes", link: "/MantenimientoClientes"},
        { title: "Proveedores", src: "Proveedores", link: "/MantenimientoProveedores"},
        { title: "Usuarios", src: "usuarios", link: "/mantenimientousuarios"},
        { title: "Productos", src: "Productos", link: "/MantenimientoProductos"},
        { title: "Estadísticas", src: "Estadisticas", link: "/EstadisticasFacturas" },
        { title: "Configuración", src: "Configuracion", link: "/Settings", gap: true},
        { title: "Cerrar sesión", src: "CerrarSesion", action: logout},
    ];


    return (
        <div className="flex min-h-dvh max-h-full w-full ">
            <div className={`flex-h-grow ${open ? "lg:w-72  pb-36 w-screen bg-slate-50 " : "lg:w-28  w-16 lg:pb-96 lg:bg-slate-50 "} transition-width lg:bg-slate-50 lg:p-5 lg:pt-8 relative ease-in-out duration-150`}>
            <img
                    src={controlImage}
                    className={`absolute cursor-pointer -right-3 top-9  border-slate-100 border-5 rounded-full 
                        ${!open && "rotate-180"} 
                        ${open ? "w-12 -translate-x-10 lg:-translate-x-0" : "w-9 -translate-x-8 lg:-translate-x-0"} 
                        transition duration-300 ease-in-out`}
                    onClick={() => setOpen(!open)}
                    onKeyDown={() => setOpen(!open)}
                    alt="Control"
                />

                <div className="flex gap-x-4 items-center">
                    <img
                        onClick={handleClick}
                        onKeyDown={handleClick}
                        src={logoImage}
                        className={`cursor-pointer duration-500 ${open && "rotate-[360deg]" } 
                        ${open ? "lg:block block lg:w-auto w-36" : "lg:block hidden"}`}                        
                        alt="Logo"
                />

                </div>
                <ul className={`flex-grow pt-6 lg:mb-16 mb-0 transition ease-in-out duration-500 ${open ? "lg:block block" : "lg:block hidden"}`} id="menuOptions">
                    {Menus.map((Menu, index) => (
                        <li
                            key={index}
                            className={`flex lg:text-sm md:text-base text-xl  rounded-md p-2 cursor-pointer py-2 lg:px-3 px-8 my-1 active:slate-200 hover:bg-slate-200 lg:hover:px-1
                                hover:text-indigo-800 font-medium hover:text-bold text-gray-900 items-left gap-x-5 transition ease-in-out
                                ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"}`}>
                                    <span></span>

                            {Menu.title === "Cerrar sesión" ? (
                                <div
                                onClick={Menu.action} 
                                    className="flex items-center gap-x-4 cursor-pointer transition ease-in-out">
                                    <img src={`./src/assets/${Menu.src}.svg`} alt={Menu.title} />
                                    <span className={`${!open && "hidden"} origin-left duration-500 transition ease-in-out`}>{Menu.title}</span>
                                </div>

                            ) : Menu.link ? (
                                    <Link to={Menu.link} className="flex items-center gap-x-4 transition ease-in-out">
                                        <img src={`./src/assets/${Menu.src}.svg`} alt={Menu.title} />
                                        <span className={`${!open && "hidden"} origin-left duration-500 transition ease-in-out`}>{Menu.title}</span>
                                    </Link>

                            ) : (
                                <>
                                    <img src={`./src/assets/${Menu.src}.svg`} alt={Menu.title} />
                                    <span className={`${!open && "hidden"} origin-left duration-500 transition-all`}>{Menu.title}</span>
                                    
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
