import { delay } from 'framer-motion';
import { useState, useEffect } from 'react';

export function CabysModal({ isOpen, onClose, cabysData, onCabysSelect }) {
  const [itemsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [animate, setAnimate] = useState(false); // Estado para la animación

  const filteredData = cabysData.filter(item => {
    const categoryMatch = selectedCategory
      ? Object.keys(item).some(key =>
          key.startsWith('codigo_cabys_categoria_') && item[key] === selectedCategory
        )
      : true;

    const searchMatch = searchTerm
      ? Object.values(item).some(value =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      : true;

    return categoryMatch && searchMatch;
  });

  const paginatedData = filteredData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const handleNextPage = () => {
    if ((currentPage + 1) * itemsPerPage < filteredData.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    setCurrentPage(0); 
  }, [selectedCategory, searchTerm]);

  useEffect(() => {
    if (isOpen) {;
      setAnimate(true);
    } else {
      setTimeout(() => setAnimate(false), 200);
    }
  }, [isOpen]);

  if (!animate) return null; 

  return (
    <div className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
      <div
        className={`bg-white p-6 rounded-lg shadow-lg lg:w-3/4 lg:max-h-full w-80 transition-all duration-300 transform ${
          isOpen ? 'opacity-100' : 'opacity-0 -translate-y-20'}`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Seleccionar Producto CABYS</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 font-bold text-xl">
            &times; 
          </button>
        </div>

        <div className="flex lg:flex-row flex-col justify-between">
          <div className="mb-7">
            <input
              type="text"
              placeholder="Buscar productos"
              className="lg:min-w-96 w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="mb-7">
            <select
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-600"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Todas las Categorías</option>
              {Array.from({ length: 9 }, (_, i) => (
                <option key={i} value={String(i)}>
                  Categoría {i}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 overflow-y-auto h-96">
          {paginatedData.map((item, index) => (
            <div key={index} className="border border-gray-300 p-4 rounded-lg">
              {Array.from({ length: 9 }, (_, i) => {
                const categoriaIndex = i + 1;
                const codigoCabys = item[`codigo_cabys_categoria_${categoriaIndex}`];
                const descripcionCabys = item[`descripcion_categoria_${categoriaIndex}`];

                return (
                  <div key={categoriaIndex}>
                    {codigoCabys && (
                      <p>
                        <strong>Código Categoría {categoriaIndex}:</strong> {codigoCabys}
                        <button
                          onClick={() => onCabysSelect(item, categoriaIndex)}
                          className="text-cyan-600 hover:underline lg:ml-2 my-2"
                        >
                          Seleccionar
                        </button>
                      </p>
                    )}
                    {descripcionCabys && (
                      <p><strong>Descripción:</strong> {descripcionCabys}</p>
                    )}
                    {item.impuesto && (
                      <p className="mb-5"><strong>Impuesto:</strong> {item.impuesto}%</p>
                    )}
                    {item.nota_explicativa && (
                      <p><strong>Nota Explicativa:</strong> {item.nota_explicativa}</p>
                    )}
                    {item.nota_no_explicativa && (
                      <p className="mb-5"><strong>Nota No Explicativa:</strong> {item.nota_no_explicativa}</p>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className="text-sm text-center font-medium mt-1 px-6 py-1 rounded-xl bg-gray-50 text-gray-600 hover:bg-slate-200 hover:text-sky-800 transition duration-200"
          >
            Ver Menos
          </button>
          <button
            onClick={handleNextPage}
            disabled={(currentPage + 1) * itemsPerPage >= filteredData.length}
            className="text-sm text-center font-medium mt-1 px-6 py-1 rounded-xl bg-gray-50 text-gray-600 hover:bg-slate-200 hover:text-sky-800 transition duration-200"
          >
            Ver Más
          </button>
        </div>
      </div>
    </div>
  );
}
