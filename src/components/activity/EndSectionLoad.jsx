import "../../index.css";


export function EndSectionLoad({ image }) {
  return (
     <div className='relative flex items-center justify-center h-screen'>
      <img className='w-full h-full object-cover' src={image} alt='background' />
     <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
        <div className='text-center max-w-4xl p-6 text-white'>
          <h1 className='text-5xl font-sans font-bold mb-6'>Sobre nosotros</h1>
          <p className='mt-5 font-sans text-xl leading-relaxed'>
            Somos una empresa especializada en soluciones de facturación electrónica, comprometida con la innovación y la eficiencia en la gestión de documentos fiscales. Nuestro sistema facilita a las empresas la emisión, recepción y almacenamiento de facturas electrónicas de manera segura y conforme a las normativas legales. Ofrecemos una plataforma intuitiva, diseñada para optimizar procesos contables, reducir errores y garantizar la transparencia en todas tus transacciones comerciales. Con un enfoque en la satisfacción del cliente, brindamos soporte técnico de alta calidad y actualizaciones continuas para adaptarnos a las necesidades cambiantes del mercado.
          </p>
        </div>
      </div>
    </div>
  );
}
