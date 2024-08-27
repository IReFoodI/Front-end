import React from "react";
import { useLojas } from "../hooks/useLojas";
import { LojasGrid } from "./LojasGrid";
import { BannerPromo } from "./BannerPromo";
import PageLayout from "./PageLayout";

export function Home() {
  const { lojas, loading, toggleFavorite } = useLojas();

  return (
    <PageLayout headerText="Home">
      <div className="hidden lg:left-0 lg:top-0 lg:z-10 lg:block lg:h-[300px] lg:w-full my-10">
        <BannerPromo title="Confira nossas ofertas especiais!" />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <LojasGrid lojas={lojas} toggleFavorite={toggleFavorite} showBanner={true}/>
      )}
    </PageLayout>
  );
}
