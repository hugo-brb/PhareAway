import React from "react";

interface CustomPopupProps {
  message: string;
  onConfirm?: () => void; // Marqué comme optionnel car inutilisé en mode erreur
  onCancel: () => void;
  isError: boolean;
}

export default function ConfirmStore({
  message,
  onConfirm,
  onCancel,
  isError,
}: CustomPopupProps) {
  return (
    <div className=" fixed md:top-1/2 md:-translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center justify-center bg-white bg-opacity-50 z-50 rounded-3xl">
      <div className="bg-white rounded-3xl shadow-lg p-6 w-[90vw] md:w-[30vw] text-center">
        <p className="font-bold text-lg pb-9">{message}</p>
        <div className="flex justify-around gap-5">
          <button
            className=" md:w-[15vw] hover:bg-neutral-300 hover:text-[--background] border-2 border-neutral-300 duration-300 cursor-pointer font-bold mx-auto py-2 px-2 rounded-2xl"
            onClick={onCancel}
          >
            {isError ? "Fermer" : "Annuler"}
          </button>
          {!isError && (
            <button
              className={`md:w-[15vw] hover:bg-[--primary] hover:text-[--background] border-2 border-[--primary] duration-300 cursor-pointer font-bold mx-auto py-2 px-2 rounded-2xl`}
              onClick={onConfirm}
            >
              Confirmer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
