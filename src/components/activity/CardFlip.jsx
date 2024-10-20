import { useState } from "react";
import { motion } from "framer-motion";


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
    <div className="flex items-center justify-center h-auto cursor-pointer" id="contacto">
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
            className="flip-card-front w-[100%] h-[100%]  border-[0px] text-white rounded-lg p-4"
            
        >
            
            <div>
                <h1 className="text-4xl font-sans font-bold mb-6 b rounded-lg">Sobre nosotros</h1>
                <p className="mt-5 font-sans text-2xl leading-relaxed text-justify rounded-lg">
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
            <h1 className="text-3xl font-sans font-bold mb-6 rounded-lg">Contacto</h1>
            <p className="mt-5 font-sans text-2xl  rounded-lg leading-10"> 
                managersync1@gmail.com <br />
                (+506) 1111 - 111 <br />
                Esparza, Puntarenas
</p>
        </div>
        
        </motion.div>
    </div>
    </div>
);
};
