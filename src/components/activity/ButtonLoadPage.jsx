import "../../index.css";
import { useNavigate } from "react-router-dom";

export function ButtonLoadingPage() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Registro");
  };

  return (
    <div className="mt-5">
      <button
        className="text-2xl bg-blue-950 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg"
        onClick={handleClick}
      >
        Empezar
      </button>
    </div>
  );
}
