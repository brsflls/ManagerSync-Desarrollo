import React, { useState } from "react";
import "../../index.css";
import { Header } from '../Header.jsx';
import { Footer } from '../Footer.jsx';
import { BackgroundAnimation } from './Background.jsx';
import { Emisor } from './Emisor_proveedor.jsx';  
import { Exonera } from './Exonera_compra.jsx';  
import { ProdsServs } from './ProdsServs.jsx';  
import { Refers } from "./Refers.jsx";
import { Finalizar } from "./Finalizar_Compra.jsx";

// Componente principal de Compras
export function Compras() {
  // Estados para almacenar los datos de cada módulo
  const [activeTab, setActiveTab] = useState('inicio');
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
    <div className="bg-blue-100 relative">
      <BackgroundAnimation />
      <Header />
      <div className="container mx-auto py-10 relative z-10">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">Crear documento de Compra Manual</h2>
          <div className="tabs flex justify-between border-b-2 mb-4">
            <button onClick={() => handleTabClick('inicio')} className={`px-4 py-2 ${activeTab === 'inicio' ? 'border-b-2 border-blue-500 text-blue-500 font-bold' : 'text-gray-500'}`}>
              Inicio
            </button>
            <button onClick={() => handleTabClick('emisor')} className={`px-4 py-2 ${activeTab === 'emisor' ? 'border-b-2 border-blue-500 text-blue-500 font-bold' : 'text-gray-500'}`}>
              Emisor
            </button>
            <button onClick={() => handleTabClick('exonera')} className={`px-4 py-2 ${activeTab === 'exonera' ? 'border-b-2 border-blue-500 text-blue-500 font-bold' : 'text-gray-500'}`}>
              Exonera
            </button>
            <button onClick={() => handleTabClick('prodsServs')} className={`px-4 py-2 ${activeTab === 'prodsServs' ? 'border-b-2 border-blue-500 text-blue-500 font-bold' : 'text-gray-500'}`}>
              Prods/Servs
            </button>
            <button onClick={() => handleTabClick('refers')} className={`px-4 py-2 ${activeTab === 'refers' ? 'border-b-2 border-blue-500 text-blue-500 font-bold' : 'text-gray-500'}`}>
              Refers
            </button>
            <button onClick={() => handleTabClick('finalizar')} className={`px-4 py-2 ${activeTab === 'finalizar' ? 'border-b-2 border-blue-500 text-blue-500 font-bold' : 'text-gray-500'}`}>
              Finalizar
            </button>
          </div>

          {/* Condicional de las pestañas */}
          {activeTab === 'inicio' && (
            <Inicio onChange={handleInicioChange} />
          )}
          {activeTab === 'emisor' && <Emisor onChange={handleEmisorChange} />}
          {activeTab === 'exonera' && <Exonera onChange={handleExoneraChange} />}
          {activeTab === 'prodsServs' && <ProdsServs onChange={handleProdsServsChange} />}
          {activeTab === 'refers' && <Refers onChange={handleRefersChange} />}
          {activeTab === 'finalizar' && (
            <Finalizar
              inicioData={inicioData}
              emisorData={emisorData}
              prodsServsData={prodsServsData}
              exoneraData={exoneraData}
              refersData={refersData}
              totales={totales}
              onTotalesChange={handleTotalesChange}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

// Módulo de Inicio
function Inicio({ onChange }) {
  const [formInicioData, setFormInicioData] = useState({
    condicionVenta: "contado",
    moneda: "colones",
    plazo: "",
    tipoCambio: "",
    observacion: "",
    tipoCompra: "deducible",
  });

  const handleInicioChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formInicioData, [name]: value };
    setFormInicioData(newFormData);
    onChange(newFormData); // Pasar los datos al componente padre
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">Inicio</h3>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Condición de la Venta:</label>
          <select
            name="condicionVenta"
            value={formInicioData.condicionVenta}
            onChange={handleInicioChange}
            className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
          >
            <option value="contado">Contado</option>
            <option value="credito">Crédito</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Moneda:</label>
          <select
            name="moneda"
            value={formInicioData.moneda}
            onChange={handleInicioChange}
            className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
          >
            <option value="colones">₡ Colones</option>
            <option value="dolares">$ Dólares</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Plazo:</label>
          <input
            type="number"
            name="plazo"
            value={formInicioData.plazo}
            onChange={handleInicioChange}
            className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Tipo de Cambio:</label>
          <input
            type="number"
            name="tipoCambio"
            value={formInicioData.tipoCambio}
            onChange={handleInicioChange}
            className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Observación:</label>
          <input
            type="text"
            name="observacion"
            value={formInicioData.observacion}
            onChange={handleInicioChange}
            className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Tipo de Compra:</label>
          <select
            name="tipoCompra"
            value={formInicioData.tipoCompra}
            onChange={handleInicioChange}
            className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
          >
            <option value="deducible">Compra Deducible</option>
            <option value="no_deducible">Compra No Deducible</option>
          </select>
        </div>
      </form>
    </div>
  );
}
