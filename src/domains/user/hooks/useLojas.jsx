import { useState, useEffect } from "react";
import { lojasData as initialLojasData } from "../models/lojasData";

export function useLojas() {
  const [lojas, setLojas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedLojas = localStorage.getItem("lojasData");

    if (storedLojas) {
      setLojas(JSON.parse(storedLojas));
      setLoading(false);
    } else {
      setTimeout(() => {
        setLojas(initialLojasData);
        localStorage.setItem("lojasData", JSON.stringify(initialLojasData));
        setLoading(false);
      }, 100); // Simula um delay
    }
  }, []);

  const toggleFavorite = (id) => {
    const updatedLojas = lojas.map((loja) =>
      loja.id === id ? { ...loja, isFavorited: !loja.isFavorited } : loja
    );
    setLojas(updatedLojas);
    localStorage.setItem("lojasData", JSON.stringify(updatedLojas));
  };

  return { lojas, loading, toggleFavorite };
}
