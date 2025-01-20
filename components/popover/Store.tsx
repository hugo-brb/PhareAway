import Image from "next/image";
import { useEffect, useState } from "react";
import { UsePlayer } from "@/components/model/player";
import { createClient } from "@supabase/supabase-js";
import OneBeacoin from "@/components/OneBeacoin";
import OneExtention from "@/components/OneExtention";

const supabaseData = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
);

//Initialisation des paramêtre de la fonction Coin
interface MenuProps {
  handleClickActive: (a: string) => void;
  player: UsePlayer;
}

export default function Coin({ handleClickActive, player }: MenuProps) {
  interface Extention {
    id: number;
  }
  //Initialisation de la variable extentions contenant toutes les id des extentions
  const [extentions, setExtentions] = useState<Extention[]>([]);

  useEffect(() => {
    const fetchExtentions = async () => {
      //Récuprération des id des extentions
      const { data, error } = await supabaseData.from("Extension").select("id");

      if (error) {
        console.error("Erreur lors de la récupération des extentions:", error);
      } else {
        //Stockage des id des extentions dans la variable extentions
        setExtentions(data);
      }
      console.log(" info ", data);
    };

    fetchExtentions();
  }, []);

  interface Beacoin {
    id: number;
  }
  //Initialisation de la variable beacoins contenant toutes les id des beacoins
  const [beacoins, setBeacoins] = useState<Beacoin[]>([]);

  useEffect(() => {
    const fetchBeacoins = async () => {
      //Récuprération des id des beacoins
      const { data, error } = await supabaseData.from("Beacoin").select("id");

      if (error) {
        console.error("Erreur lors de la récupération des beacoins:", error);
      } else {
        //Stockage des id des beacoins dans la variable beacoins
        setBeacoins(data);
      }
      console.log(" info ", data);
    };

    fetchBeacoins();
  }, []);

  return (
    <>
      <main className=" absolute top-0 z-40 flex w-[100vw] h-[100vh]">
        <section className=" flex flex-col self-center mb-5 md:mb-0 gap-12 w-[95vw] h-[75vh] md:w-[75vw] md:h-[95vh] bg-white bg-opacity-60 rounded-3xl backdrop-blur-md mx-auto px-7 py-12 overflow-y-scroll scrollbarhidden">
          <button
            className="absolute top-5 right-5 transform transition-transform duration-300 hover:rotate-90"
            onClick={() => handleClickActive("home")}
          >
            <Image
              src="/icones/xmark-solid.svg"
              alt="arrow-back"
              width={24}
              height={24}
            />
          </button>
          <h1 className="font-ouroboros self-center text-4xl md:text-7xl">
            PharAchat
          </h1>
          <div className=" flex flex-col">
            <h2 className=" text-[--primary] text-lg px-5 py-2">Beacoins</h2>
            <div className=" flex flex-col ring-2 ring-[--primary] rounded-xl md:w-[70vw] py-5 overflow-x-scroll scrollbarhidden">
              <div className=" flex ml-2 md:ml-7 justify-around">
                {/*Affichage de tout les Offres de Beacoin*/}
                {beacoins.map((beacoin) => (
                  <OneBeacoin
                    key={beacoin.id}
                    id_beacoin={beacoin.id}
                    player={player}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className=" flex flex-col">
            <h2 className=" text-[--primary] text-lg px-5 py-2">Extensions</h2>
            <div className=" flex flex-col ring-2 ring-[--primary] rounded-xl md:w-[70vw] py-5 overflow-x-scroll scrollbarhidden">
              <div className="flex flex-col md:flex-row flex-wrap mx-4 md:mx-0 md:ml-7 justify-center md:gap-24">
                {/* Affichage des extensions disponibles ou message si vide */}
                {player.getDlcUnlocked().every((dlc) => dlc === 1) ? (
                  <p className="text-center self-center mt-4">
                    Toutes les extensions ont été débloquées. <br />
                    Merci pour votre confiance et à bientôt pour de nouvelles
                    aventures !
                  </p>
                ) : (
                  (console.log(extentions),
                  extentions.map((extention) => (
                    <OneExtention
                      key={extention.id}
                      id_extention={extention.id}
                      player={player}
                    />
                  )))
                )}
              </div>
            </div>
          </div>
          <p className=" opacity-70">
            *30% des bénéfices engendrés par la boutique seront reversés à des
            associations de protection des phares.
          </p>
        </section>
      </main>
    </>
  );
}
