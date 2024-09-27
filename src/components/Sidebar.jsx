import { useState } from "react";
import logoImage from '../assets/logo-reducido.svg';
import controlImage from '../assets/control.svg';

export function Sidebar() {
    const [open, setOpen] = useState(true);
    const Menus = [
    { title: "Ventas", src: "Ventas" },
    { title: "Compras", src: "Compras" }, 
    { title: "Reportes", src: "Reportes" , gap: true  },
    { title: "Inventarios", src: "Inventarios" },
    { title: "Proveedores", src: "Proveedores" },
    { title: "Productos", src: "Productos" },
    { title: "Estadísticas", src: "Estadisticas" },
    { title: "Configuración", src: "Configuracion",  gap: true },
    { title: "Cerrar sesión", src: "CerrarSesion" },
];

return (
    <div className="flex">
    <div
        className={` ${open ? "w-72" : "w-20 "} bg-slate-100 h-900 p-5 pt-8 relative duration-300`}
    >

        
        <img
            src={controlImage}
            className={`absolute cursor-pointer -right-3 top-9 w-7 border-slate-100
            border-5 rounded-full ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)}
            alt="Control"
        />

        
        <div className="flex gap-x-4 items-center">

        
        <img
            src={logoImage}
            className={`cursor-pointer duration-500 ${
            open && "rotate-[360deg]"}`}
            alt="Logo"
        />


        </div>
        <ul className="pt-6">
            {Menus.map((Menu, index) => (
            <li
            key={index}
            className={`flex text-sm rounded-md p-2 cursor-pointer active:slate-200 hover:bg-slate-400 hover:text-slate-700 font-medium hover:text-bold text-gray-900 items-left gap-x-4 
            ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
            } `}
            >
            <img src={`./src/assets/${Menu.src}.svg`} />
            <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
            </span>
            </li>
        ))}
        </ul>
    </div>
    </div>
);
};