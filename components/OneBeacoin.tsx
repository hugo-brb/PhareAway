import React from "react";
import Image from "next/image";
import { useBeacoin } from "./model/Beacoin";
import Link from "next/link";
import { UsePlayer } from "./model/player";

interface OnBeacoinProp {
  id_beacoin: number;
  player: UsePlayer;
}

const OneEvent: React.FC<OnBeacoinProp> = ({ id_beacoin, player }) => {
  // Création d'une instance de la classe beacoin
  const beacoin = useBeacoin(id_beacoin);

  // Récupération de l'image associée à l'offre de beacoin
  const image = beacoin.useGetImage();

  //Admin add becoins
  const handleClick = (beacoins: number) => {
    if (beacoins === 200) {
      player.setBeacoins(player.getBeacoins() + 200);
    } else if (beacoins === 500) {
      player.setBeacoins(player.getBeacoins() + 600);
    } else if (beacoins === 2500) {
      player.setBeacoins(player.getBeacoins() + 1750);
    } else {
      player.setBeacoins(player.getBeacoins() + 3500);
    }
  };

  // Si l'offre de beacoin n'a pas encore chargé, afficher un message de chargement
  if (!beacoin) {
    return <p>Chargement des...</p>;
  }

  return (
    <>
      {player.getIsAdmin() ? (
        <div
          onClick={() => handleClick(beacoin.getNumber())}
          className="flex flex-col justify-center items-center gap-3 px-7 py-5 hover:ring-2 hover:ring-[--primary] rounded-xl duration-100 cursor-pointer"
        >
          {/* Affichage de l'image de l'offre de beacoin si elle existe sinon afficher un placeholder */}
          {image.getUrl() !== "" ? (
            <Image
              className="self-center rounded-lg"
              src={image.getUrl()}
              width={100}
              height={100}
              alt={beacoin.getName()}
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
          <div className="flex flex-col justify-center items-center">
            <p>{beacoin.getName()}</p>
            <p className="px-2 rounded-lg text-yellow-500 font-bold">
              + {beacoin.getBonus()} bonus
            </p>
            <div>
              <p className="text-black opacity-50">{beacoin.getPrice()}0 €</p>
            </div>
          </div>
        </div>
      ) : (
        <Link
          href={{
            pathname: "/Payment",
            query: {
              id: beacoin.getId(), // ID du beacoin
              price: beacoin.getPrice(), // Prix en euros
            },
          }}
          className="flex flex-col justify-center items-center gap-3 px-7 py-5 hover:ring-2 hover:ring-[--primary] rounded-xl duration-100 cursor-pointer"
        >
          {/* Affichage de l'image de l'offre de beacoin si elle existe sinon afficher un placeholder */}
          {image.getUrl() !== "" ? (
            <Image
              className="self-center rounded-lg"
              src={image.getUrl()}
              width={100}
              height={100}
              alt={beacoin.getName()}
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
          <div className="flex flex-col justify-center items-center">
            <p>{beacoin.getName()}</p>
            <p className="px-2 rounded-lg text-yellow-500 font-bold">
              + {beacoin.getBonus()} bonus
            </p>
            <div>
              <p className="text-black opacity-50">{beacoin.getPrice()}0 €</p>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default OneEvent;
