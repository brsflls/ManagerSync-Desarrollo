import React, { useState } from "react";
import "../../index.css";
import { Header } from "../Header.jsx";
import { Footer } from "../Footer.jsx";
import { BackgroundAnimation } from "./Background.jsx";
import { Emisor } from "./Emisor_proveedor.jsx";
import { Exonera } from "./Exonera_compra.jsx";
import { ProdsServs } from "./ProdsServs.jsx";
import { Refers } from "./Refers.jsx";
import { Finalizar } from "./Finalizar_Compra.jsx";
import { Inicio } from "./InicioCompras"; // Importamos el componente de Inicio
import { useAccountManagement } from "../hooks/useAccountManagement"; // Importa el hook
import { Sidebar } from "../Sidebar.jsx";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

// Componente principal de Compras
export function Compras() {
  // Estados para almacenar los datos de cada módulo
  const { logout } = useAccountManagement(); // Usa el hook para obtener la función logout
  const [activeTab, setActiveTab] = useState("inicio");
  const [inicioData, setInicioData] = useState({});
  const [emisorData, setEmisorData] = useState({});
  const [prodsServsData, setProdsServsData] = useState([]);
  const [exoneraData, setExoneraData] = useState({});
  const [refersData, setRefersData] = useState([]);
  const [totales, setTotales] = useState({});

  // Función para cambiar la pestaña activa
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Funciones para recoger los datos de cada módulo
  const handleInicioChange = (data) => setInicioData(data);
  const handleEmisorChange = (data) => setEmisorData(data);
  const handleProdsServsChange = (data) => setProdsServsData(data);
  const handleExoneraChange = (data) => setExoneraData(data);
  const handleRefersChange = (data) => setRefersData(data);
  const handleTotalesChange = (data) => setTotales(data);

  return (
    <>
      <BackgroundAnimation />
      <Header />
      <div className="w-screen h-max bg-slate-300 mx-auto relative grid grid-cols-8">
        <div>
          <Sidebar logout={logout} /> {/* Pasa la función logout al Sidebar */}
        </div>
        <div className="max-w-4xl mx-auto col-span-7 my-10 bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Crear documento de Compra Manual
          </h2>
          <div className="tabs flex justify-between border-b-2 mb-4">
            <button
              onClick={() => handleTabClick("inicio")}
              className={`px-4 py-2 ${
                activeTab === "inicio"
                  ? "border-b-2 border-blue-500 text-blue-500 font-bold"
                  : "text-gray-500"
              }`}
            >
              Inicio
            </button>
            <button
              onClick={() => handleTabClick("emisor")}
              className={`px-4 py-2 ${
                activeTab === "emisor"
                  ? "border-b-2 border-blue-500 text-blue-500 font-bold"
                  : "text-gray-500"
              }`}
            >
              Emisor
            </button>
            <button
              onClick={() => handleTabClick("exonera")}
              className={`px-4 py-2 ${
                activeTab === "exonera"
                  ? "border-b-2 border-blue-500 text-blue-500 font-bold"
                  : "text-gray-500"
              }`}
            >
              Exonera
            </button>
            <button
              onClick={() => handleTabClick("prodsServs")}
              className={`px-4 py-2 ${
                activeTab === "prodsServs"
                  ? "border-b-2 border-blue-500 text-blue-500 font-bold"
                  : "text-gray-500"
              }`}
            >
              Prods/Servs
            </button>
            <button
              onClick={() => handleTabClick("refers")}
              className={`px-4 py-2 ${
                activeTab === "refers"
                  ? "border-b-2 border-blue-500 text-blue-500 font-bold"
                  : "text-gray-500"
              }`}
            >
              Refers
            </button>
            <button
              onClick={() => handleTabClick("finalizar")}
              className={`px-4 py-2 ${
                activeTab === "finalizar"
                  ? "border-b-2 border-blue-500 text-blue-500 font-bold"
                  : "text-gray-500"
              }`}
            >
              Finalizar
            </button>
          </div>

          {/* Condicional de las pestañas */}
          {activeTab === "inicio" && <Inicio onChange={handleInicioChange} />}
          {activeTab === "emisor" && <Emisor onChange={handleEmisorChange} />}
          {activeTab === "exonera" && (
            <Exonera onChange={handleExoneraChange} />
          )}
          {activeTab === "prodsServs" && (
            <ProdsServs onChange={handleProdsServsChange} />
          )}
          {activeTab === "refers" && <Refers onChange={handleRefersChange} />}
          {activeTab === "finalizar" && (
            <Finalizar
              inicioData={inicioData}
              emisorData={emisorData}
              prodsServsData={prodsServsData}
              exoneraData={exoneraData}
              refersData={refersData}
              totales={totales}
              onTotalesChange={handleTotalesChange}
              // Pasa aquí la función para mostrar el modal
              onApplyDocument={() => setShowModal(true)}
            />
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
