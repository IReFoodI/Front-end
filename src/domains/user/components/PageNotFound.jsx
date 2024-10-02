import { Link } from "react-router-dom";
import imagem from "@/ui/assets/page404.png";

export function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <img src={imagem} alt="404 Not Found" className="w-2/3 mb-6" />
      <h2 className="text-inherit mb-4">Página não encontrada</h2>

      <Link 
        to="/" 
        className="text-primary underline text-lg hover:text-orange-600"
      >
        Voltar para home
      </Link>
    </div>
  );
}
