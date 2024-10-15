import { useState } from "react";
import { motion } from "framer-motion";
import { fadeln } from "../variants";

export function CardFlip() {

    const [isFlipped, setIsFlipped] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

function handleFlip() {
    if (!isAnimating) {
        setIsFlipped(!isFlipped);
        setIsAnimating(true);
    }
}

return (
    <motion.div className="flex items-center justify-center h-auto cursor-pointer" id="contacto"
                variants={fadeln("up",0.2)}
                initial= "hidden"
                whileInView={"show"}
                viewport={{once:false, amount:0.7}}
                
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}>

                
        <div
            className="flip-card w-[900px] h-[460px] rounded-md"
            onClick={handleFlip}
        >
        <motion.div
            className="flip-card-inner w-[100%] h-[100%]"
            initial={false}
            animate={{ rotateY: isFlipped ? 180 : 360 }}
            transition={{ duration: 0.6, animationDirection: "normal" }}
            onAnimationComplete={() => setIsAnimating(false)}
        >

            
            
        <div
            className="justify-center items-center
            grid-cols-2
            flip-card-front w-[100%] h-[100%]  border-[0px] text-white rounded-lg p-4"
            
        >
            
            <div className="justify-center items-center">
                <h1 className="text-6xl font-sans font-bold mb-7 pb-5 rounded-lg justify-center text-center " >Sobre nosotros</h1>
                <p className="mt-5 font-sans font-semibold text-2xl leading-relaxed text-center rounded-lg">
                Somos una empresa especializada en soluciones de facturación electrónica, 
                comprometida con la innovación y la eficiencia en la gestión de documentos fiscales. 
                Nuestro sistema facilita a las empresas la emisión, recepción y almacenamiento de facturas electrónicas de manera segura 
                y conforme a las normativas legales. Ofrecemos una plataforma intuitiva, diseñada para optimizar procesos contables, 
                reducir errores y garantizar la transparencia en todas tus transacciones comerciales. 
                Con un enfoque en la satisfacción del cliente, brindamos soporte técnico de alta calidad y actualizaciones continuas 
                para adaptarnos a las necesidades cambiantes del mercado.
                </p>
            </div> 
            <div class="absolute inset-0 w-full h-full "></div>
        </div>


        <div
            className="flip-card-back w-[100%] h-[100%] border-[0px] text-white rounded-lg p-4"
            
        >
            <h1 className="text-6xl font-sans font-bold mb-7 pb-5 rounded-lg justify-center text-center ">Contacto</h1>
            <p className="mt-5 font-sans font-semibold text-2xl leading-relaxed text-center  rounded-lg"> 
                managersync1@gmail.com <br/><br/>
                (+506) 1111 - 1111 <br/><br/>
                Esparza, Puntarenas
</p>
        </div>
        
        </motion.div>
    </div>
    </motion.div>
);
};
