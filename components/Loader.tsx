import React from "react";
import Image from "next/image";

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white w-[100vw] h-[100vh] z-[1000]">
      <div className="loader"></div>{" "}
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      <p className="text-gray-500 mt-4">Chargement en cours... DU PRELOARDER</p>
    </div>
  );
};

export default Loader;
