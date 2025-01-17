import React from "react";

interface CustomPopupProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmHint({ onConfirm, onCancel }: CustomPopupProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
      <div className="bg-white rounded-3xl shadow-lg p-6 w-[90vw] md:w-[30vw] text-center">
        <h1 className="font-bold text-lg pb-9">
          Êtes-vous sûr de vouloir acheter un indice pour 100 Beacoins ?
        </h1>
        <div className="flex justify-around gap-5">
          <button
            className=" md:w-[15vw] hover:bg-[--primary] hover:text-[--background] border-2 border-[--primary] duration-300 cursor-pointer font-bold mx-auto py-2 px-2 rounded-2xl"
            onClick={onCancel}
          >
            Annuler
          </button>
          <button
            className=" md:w-[15vw] hover:bg-[#fdbc00] hover:text-[--background] border-2 border-[#fdbc00] duration-300 cursor-pointer font-bold mx-auto py-2 px-2 rounded-2xl"
            onClick={onConfirm}
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
}
