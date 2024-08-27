import React from "react";
import { useLojas } from "../hooks/useLojas";
import { LojasGrid } from "./LojasGrid";
import PageLayout from "./PageLayout";

export function Favoritos() {
  const { lojas, loading, toggleFavorite } = useLojas();
  const lojasFavoritas = lojas.filter((loja) => loja.isFavorited);

  return (
    <PageLayout headerText="Favoritos">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <LojasGrid lojas={lojasFavoritas} toggleFavorite={toggleFavorite} showBanner={false}/>
      )}
    </PageLayout>
  );
}
