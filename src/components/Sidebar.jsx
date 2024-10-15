import { useState } from "react";
import { Link } from "react-router-dom";
import logoImage from '../assets/logo-reducido.svg';
import controlImage from '../assets/control.svg';
import { useNavigate } from "react-router-dom";

export function Sidebar({ logout }) {
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/");
    };

    const Menus = [
        { title: "Ventas", src: "Ventas",  link: "/Punto_venta" },
        { title: "Compras", src: "Compras", link: "/ConsultarCompras"  },
        { title: "Reportes", src: "Reportes", gap: true },
        { title: "Inventarios", src: "Inventarios" , link: "/ConsultarProductos"},
        { title: "Clientes", src: "Clientes", link: "/MantenimientoClientes" },
        { title: "Proveedores", src: "Proveedores", link: "/MantenimientoProveedores" },
        { title: "Productos", src: "Productos", link: "/MantenimientoProductos"},
        { title: "Estadísticas", src: "Estadisticas" },
        { title: "Configuración", src: "Configuracion", gap: true },
        { title: "Cerrar sesión", src: "CerrarSesion", action: logout},
    ];

    return (
        <div className="flex">
            <div className={` ${open ? "w-72 h-1080" : "w-20 h-1080"} bg-slate-50 h-1080 p-5 pt-8 relative duration-300`}>
                <img
                    src={controlImage}
                    className={`absolute cursor-pointer -right-3 top-9 w-7 border-slate-100 border-5 rounded-full 
                        ${!open && "rotate-180"}`}
                    onClick={() => setOpen(!open)}
                    alt="Control"
                />

                <div className="flex gap-x-4 items-center">
                    <img
                        onClick={handleClick}
                        src={logoImage}
                        className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"}`}
                        alt="Logo"
                />

                </div>
                <ul className="pt-6">
                    {Menus.map((Menu, index) => (
                        <li
                            key={index}
                            className={`flex text-sm rounded-md p-2 cursor-pointer py-2 px-3 my-1 active:slate-200 hover:bg-slate-200 
                                hover:text-indigo-700 font-medium hover:text-bold text-gray-900 items-left gap-x-4 
                                ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"}`}>

                            {Menu.title === "Cerrar sesión" ? (

                                <div
                                    onClick={Menu.action} 
                                    className="flex items-center gap-x-4 cursor-pointer">

                                    <img src={`./src/assets/${Menu.src}.svg`} alt={Menu.title} />
                                    <span className={`${!open && "hidden"} origin-left duration-200`}>{Menu.title}</span>
                                </div>

                            ) : Menu.link ? (
                                    <Link to={Menu.link} className="flex items-center gap-x-4">
                                        <img src={`./src/assets/${Menu.src}.svg`} alt={Menu.title} />
                                        <span className={`${!open && "hidden"} origin-left duration-200`}>{Menu.title}</span>
                                    </Link>

                            ) : (
                                <>
                                    <img src={`./src/assets/${Menu.src}.svg`} alt={Menu.title} />
                                    <span className={`${!open && "hidden"} origin-left duration-200`}>{Menu.title}</span>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
