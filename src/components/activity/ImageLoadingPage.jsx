import "../../index.css";

import { ButtonLoadingPage } from './ButtonLoadPage.jsx';


export function LoadingPageImage({ image }) {
  return (
    <div className='relative flex items-center justify-center h-screen'>
      <img className='w-full h-full object-cover' src={image} alt='background' />
      <div className='absolute inset-0 flex items-center justify-center'>
      <div className='text-center'>
      <h1 className='text-7xl font-sans font-bold'>Agil. Facil. Moderno.</h1>
      <h2 className='mt-5 font-sans text-3xl flex '>Administra tus facturas y controla tus ganancias</h2>
      <ButtonLoadingPage/>
    </div>
      </div>
    </div>
  );
};
