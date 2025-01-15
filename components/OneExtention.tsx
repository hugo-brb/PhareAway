import React, { useState } from "react";
import Image from "next/image";
import { useExtention } from "./model/extention";
import { UsePlayer } from "./model/player";
import ConfirmStore from "@/components/popover/ConfirmStore"; // Importez le popup de confirmation

interface OnExtentionProp {
  id_extention: number;
  player: UsePlayer;
}

const OneEvent: React.FC<OnExtentionProp> = ({ id_extention, player }) => {
  const extention = useExtention(id_extention); // Création de l'extension via `useExtention`
  const image = extention.useGetImage(); // Récupère l'image de l'extension
  const [showConfirmation, setShowConfirmation] = useState(false); // État pour afficher le popup de confirmation
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // État pour afficher un message d'erreur

  // Vérifie si l'extension est déjà débloquée
  const isUnlocked = player.getDlcUnlocked()[id_extention] === 1;

  const handlePurchaseClick = () => {
    if (player.getBeacoins() < extention.getPrice()) {
      setErrorMessage(
        "Vous n'avez pas assez de Beacoins pour acheter cette extension."
      );
      return;
    }
    setShowConfirmation(true); // Affiche le popup de confirmation
  };

  const confirmPurchase = () => {
    const dlc = player.getDlcUnlocked();
    player.setBeacoins(-extention.getPrice()); // Déduit le prix de l'extension
    dlc[id_extention] = 1; // Marque l'extension comme débloquée
    player.setDlcUnlocked(dlc); // Met à jour les extensions débloquées
    setShowConfirmation(false); // Ferme le popup
    alert(
      `Vous avez débloqué l'extension : ${extention.getName()}, retournez sur la carte pour y accéder.`
    );
  };

  const cancelPurchase = () => {
    setShowConfirmation(false); // Ferme le popup
  };

  if (!extention) {
    return <p>Chargement de l&apos;extension...</p>; // Affichage pendant le chargement
  }

  return (
    <>
      {/* Affichage de l'extension si elle n'est pas déjà débloquée */}
      {!isUnlocked && (
        <div
          className="flex flex-col justify-center items-center gap-3 px-7 py-5 hover:ring-2 hover:ring-[--primary] rounded-xl duration-100 cursor-pointer"
          onClick={handlePurchaseClick} // Gestion du clic pour afficher le popup
        >
          {/* Affichage de l'image de l'extension */}
          {image.getUrl() !== "" ? (
            <Image
              className="self-center rounded-lg"
              src={image.getUrl()}
              width={100}
              height={100}
              alt={extention.getName()}
            />
          ) : (
            <Image
              className="self-center rounded-lg"
              src="/icones/logoBaniere.png"
              alt="Default logo"
              width={100}
              height={100}
            />
          )}
          {/* Informations sur l'extension */}
          <div className="flex flex-col justify-center items-center">
            <p>{extention.getName()} </p>
            <p className="opacity-50">{extention.getPrice()} Beacoins</p>
          </div>
        </div>
      )}

      {/* Popup de confirmation avec le composant ConfirmStore */}
      {showConfirmation && (
        <ConfirmStore
          message={`Êtes-vous sûr de vouloir acheter cette extension pour ${extention.getPrice()} Beacoins ?`}
          onConfirm={confirmPurchase} // Confirme l'achat
          onCancel={cancelPurchase} // Annule l'achat
          isError={false} // pas une erreur
        />
      )}

      {/* Message d'erreur */}
      {errorMessage && (
        <ConfirmStore
          message={errorMessage} // Affiche le message d'erreur
          onCancel={() => setErrorMessage(null)} // Ferme le popup
          isError={true} // Spécifie que c'est une erreur
        />
      )}
    </>
  );
};

export default OneEvent;
