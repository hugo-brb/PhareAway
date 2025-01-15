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
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
      <div className="bg-white rounded-3xl shadow-lg p-6 w-[90vw] md:w-[30vw] text-center">
        <p className="font-bold text-lg pb-9">{message}</p>
        <div className="flex justify-around gap-5">
          <button
            className="w-[15vw] hover:bg-neutral-300 hover:text-[--background] border-2 border-neutral-300 duration-300 cursor-pointer font-bold mx-auto py-2 px-2 rounded-2xl"
            onClick={onCancel} // Appelle onCancel pour fermer le popup
          >
            {isError ? "Fermer" : "Annuler"}
          </button>
          {!isError && (
            <button
              className={`w-[15vw] hover:bg-[--primary] hover:text-[--background] border-2 border-[--primary] duration-300 cursor-pointer font-bold mx-auto py-2 px-2 rounded-2xl`}
              onClick={onConfirm} // Appelle onConfirm uniquement si ce n'est pas une erreur
            >
              Confirmer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
