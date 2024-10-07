import "../../index.css";
import { motion } from "framer-motion";
import { fadeln } from "../variants";

export function CardLoadingPage({ image00, image01, image02, image03 }) {
  return (
    
    
    
    <div className='bg-slate-300  flex flex-col justify-center items-center h-screen' id="servicios">

      <div><h1 className='text-7xl font-bold mb-16 text-blue-950 justofy-center items-center'>Nuestros servicios</h1>
      <motion.div 
    variants={fadeln("up",0.2)}
    initial= "hidden"
    whileInView={"show"}
    viewport={{once:false, amount:0.7}}
      
      className='flex space-x-12'>
        <motion.div 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}

          className='bg-white shadow-md p-4 rounded-md text-center'>
          <img src={image00} alt="Card 1" className='h-32 w-32 object-cover mx-auto mb-4' />
          <h3 className='text-lg font-semibold'>Rapidez</h3>
          <p className='text-gray-600'>para registrar ventas</p>
        </motion.div>

        <motion.div 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className='bg-white shadow-md p-4 rounded-md text-center'>
          <img src={image01} alt="Card 2" className='h-32 w-32 object-cover mx-auto mb-4' />
          <h3 className='text-lg font-semibold'>Eficiencia</h3>
          <p className='text-gray-600'>al manejar tus cuentas</p>
        </motion.div>

        <motion.div 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}

        className='bg-white shadow-md p-4 rounded-md text-center'>
          <img src={image02} alt="Card 3" className='h-32 w-32 object-cover mx-auto mb-4' />
          <h3 className='text-lg font-semibold'>Organiza</h3>
          <p className='text-gray-600'>Tus productos</p>
        </motion.div>

        <motion.div 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        
        className='bg-white shadow-md p-4 rounded-md text-center'>
          <img src={image03} alt="Card 4" className='h-32 w-32 object-cover mx-auto mb-4' />
          <h3 className='text-lg font-semibold'>Distintos usuarios</h3>
          <p className='text-gray-600'>Para vender y administrar</p>
        </motion.div>
      
    </motion.div>
    </div>
    </div>
  );
}
