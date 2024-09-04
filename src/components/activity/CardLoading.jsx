import "../../index.css";


export function CardLoadingPage({ image00, image01, image02, image03 }) {
  return (
    <div className='bg-blue-100  flex flex-col justify-center items-center h-screen'>
      <h1 className='text-7xl font-bold mb-16 text-blue-950'>Soluciones</h1>
      <div className='flex space-x-12'>
        <div className='bg-white shadow-md p-4 rounded-md text-center'>
          <img src={image00} alt="Card 1" className='h-32 w-32 object-cover mx-auto mb-4' />
          <h3 className='text-lg font-semibold'>Rapidez</h3>
          <p className='text-gray-600'>Para registrar ventas</p>
        </div>
        <div className='bg-white shadow-md p-4 rounded-md text-center'>
          <img src={image01} alt="Card 2" className='h-32 w-32 object-cover mx-auto mb-4' />
          <h3 className='text-lg font-semibold'>Eficiencia</h3>
          <p className='text-gray-600'>Al manejar tus cuentas</p>
        </div>
        <div className='bg-white shadow-md p-4 rounded-md text-center'>
          <img src={image02} alt="Card 3" className='h-32 w-32 object-cover mx-auto mb-4' />
          <h3 className='text-lg font-semibold'>Organiza</h3>
          <p className='text-gray-600'>Tus productos</p>
        </div>
        <div className='bg-white shadow-md p-4 rounded-md text-center'>
          <img src={image03} alt="Card 4" className='h-32 w-32 object-cover mx-auto mb-4' />
          <h3 className='text-lg font-semibold'>Distintos usuarios</h3>
          <p className='text-gray-600'>Para vender y administrar</p>
        </div>
      </div>
    </div>
  );
}
