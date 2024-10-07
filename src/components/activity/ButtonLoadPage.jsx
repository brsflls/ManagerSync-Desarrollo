import "../../index.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export function ButtonLoadingPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Registro");
  };

  return (
    <div className="mt-5">

      <motion.button className="text-2xl bg-blue-950 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg" 
        onClick={handleClick} whileTap={{ scale: 0.85 }}>
          ¡Empieza ahora!
        </motion.button>
    </div>

  );
}
