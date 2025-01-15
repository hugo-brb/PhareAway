import { useEnigme } from "@/components/model/EnigmeInterface";
import { useLighthouse } from "@/components/model/lighthouse";
import { useState } from "react";
import { UsePlayer } from "../model/player";
import SmallEnigme from "@/components/popover/SmallEnigme";
import Image from "next/image";
import Tips from "@/components/popover/Tips";

import ConfirmHint from "@/components/popover/ConfirmHint"; // Import du popup personnalisé

interface EnigmeProps {
  handleClickActive: (a: string) => void;
  id: number;
  player: UsePlayer;
}

export default function Enigme({
  handleClickActive: parentHandleClickActive,
  id,
  player,
}: EnigmeProps) {
  const enigme1 = useEnigme(id, 1); //recupere les données de la premiere enigme du phare id
  const enigme2 = useEnigme(id, 2); //recupere les données de la deuxieme enigme du phare id
  const enigme3 = useEnigme(id, 3); //recupere les données de la troisieme enigme du phare id
  const enigme4 = useEnigme(id, 4); //recupere les données de la quatrieme enigme du phare id
  const enigme5 = useEnigme(id, 5); //recupere les données de la cinquième enigme du phare id
  const lighthouse = useLighthouse(id); //recupere les données du phare id
  const [popup, setPopup] = useState("0");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleClickPopup = (a: string) => {
    setPopup(a);
  };

  const [activeButtons, setActiveButtons] = useState({
    hint: false,
  });

  const handleClickActiveButton = (button: keyof typeof activeButtons) => {
    setActiveButtons((prev) => ({
      ...prev,
      [button]: !prev[button], // Alterne l'état du bouton correspondant
    }));
  };

  const handleHintPurchase = () => {
    if (player.getBeacoins() >= 100) {
      player.setBeacoins(-100);
      handleClickActiveButton("hint");
      setShowConfirmation(false); // Fermer le popup après confirmation
    } else {
      alert("Vous n'avez pas assez de Beacoins pour acheter les indices.");
      setShowConfirmation(false);
    }
  };

  const currentHour = new Date().getHours();
  const nuit =
    (currentHour >= 18 && currentHour <= 23) ||
    (currentHour >= 0 && currentHour < 6);

  const phareEnded: number[] = player.getPhareended();

  const [tips, setTips] = useState("0");
  const handleClickTips = (a: string) => {
    setTips(a);
  };

  return (
    <>
      <main className=" absolute top-1/2 -translate-y-1/2 md:translate-y-0 md:top-0 z-40 flex w-[100vw] h-fit md:h-[100vh]">
        <section
          className={`flex flex-col items-center self-center gap-7 md:gap-12 mb-5 md:mb-0 w-[95vw] h-[75vh] md:w-[75vw] md:h-[95vh] bg-white bg-opacity-60 rounded-3xl backdrop-blur-md mx-auto px-7 pt-10 pb-12 md:pt-4 overflow-y-scroll scrollbarhidden ${
            phareEnded.includes(id) ? "ring-8 ring-green-400 bg-green-200" : ""
          }`}
        >
          <button
            className="absolute top-5 right-5 transform transition-transform duration-300 hover:rotate-90"
            onClick={() => parentHandleClickActive("home")}
          >
            <Image
              src="/icones/xmark-solid.svg"
              alt="arrow-back"
              width={24}
              height={24}
            />
          </button>

          <button
            className="absolute top-5 left-5"
            onClick={() => handleClickTips("1")}
          >
            <p>i</p>
          </button>

          <h1 className=" text-3xl font-bold">
            Enigmes : {lighthouse.getName() ?? "Phare inconnu"}{" "}
            {phareEnded.includes(id) ? "   (COMPLÉTÉ)" : ""}
          </h1>

          <button
            className={`absolute hidden md:block ${
              activeButtons.hint ? "pointer-events-none" : ""
            }`}
            style={{ top: "12vw", right: "5vw" }}
            onClick={() => {
              if (!activeButtons.hint) {
                setShowConfirmation(true); // Afficher le popup
              }
            }}
          >
            <Image
              src={
                activeButtons.hint
                  ? "/images/hintOn.png"
                  : "/images/hintOff.png"
              }
              alt="hint"
              width={300}
              height={150}
            />
          </button>

          {/* Popup de confirmation */}
          {showConfirmation && (
            <ConfirmHint
              onConfirm={handleHintPurchase} // Confirmer l'achat
              onCancel={() => setShowConfirmation(false)} // Annuler l'achat
            />
          )}

          <button
            className={`absolute md:hidden ${
              activeButtons.hint ? "pointer-events-none" : ""
            }`}
            style={{ bottom: "0vh", right: "25vw" }}
            onClick={() => handleClickActiveButton("hint")}
          >
            <Image
              src={
                activeButtons.hint
                  ? "/images/hintOn.png"
                  : "/images/hintOff.png"
              }
              alt="hint"
              width={150}
              height={150}
            />
          </button>

          <div
            className="rounded-3xl absolute top-1/2 -translate-y-1/2 left-[10%] w-[80vw] md:w-[40vw] max-w-[80vw] h-[80vw] md:h-[40vw] bg-cover bg-center"
            style={{
              backgroundImage: nuit
                ? `url("https://nereoll.github.io/imagesPhare/phares/${id}n.png")`
                : `url("https://nereoll.github.io/imagesPhare/phares/${id}.png")`,
            }}
          >
            {popup === "1" && (
              <SmallEnigme
                handleClickPopup={handleClickPopup}
                id={popup}
                player={player}
                lh={id}
                codeLock={enigme1.getanswerLock()}
                coordX={enigme1.getcoordX()}
                coordY={enigme1.getcoordY()}
                name={enigme1.getname()}
                question={enigme1.getquestion()}
                text1={enigme1.gettext1()}
                answer={enigme1.getanswer()}
                text2={enigme1.gettext2()}
              />
            )}
            {popup === "2" && (
              <SmallEnigme
                handleClickPopup={handleClickPopup}
                id={popup}
                player={player}
                lh={id}
                codeLock={enigme2.getanswerLock()}
                coordX={enigme2.getcoordX()}
                coordY={enigme2.getcoordY()}
                name={enigme2.getname()}
                question={enigme2.getquestion()}
                text1={enigme2.gettext1()}
                answer={enigme2.getanswer()}
                text2={enigme2.gettext2()}
              />
            )}
            {popup === "3" && (
              <SmallEnigme
                handleClickPopup={handleClickPopup}
                id={popup}
                player={player}
                lh={id}
                codeLock={enigme3.getanswerLock()}
                coordX={enigme3.getcoordX()}
                coordY={enigme3.getcoordY()}
                name={enigme3.getname()}
                question={enigme3.getquestion()}
                text1={enigme3.gettext1()}
                answer={enigme3.getanswer()}
                text2={enigme3.gettext2()}
              />
            )}
            {popup === "4" && (
              <SmallEnigme
                handleClickPopup={handleClickPopup}
                id={popup}
                player={player}
                lh={id}
                codeLock={enigme4.getanswerLock()}
                coordX={enigme4.getcoordX()}
                coordY={enigme4.getcoordY()}
                name={enigme4.getname()}
                question={enigme4.getquestion()}
                text1={enigme4.gettext1()}
                answer={enigme4.getanswer()}
                text2={enigme4.gettext2()}
              />
            )}
            {popup === "5" && (
              <SmallEnigme
                handleClickPopup={handleClickPopup}
                id={popup}
                player={player}
                lh={id}
                codeLock={enigme5.getanswerLock()}
                coordX={enigme5.getcoordX()}
                coordY={enigme5.getcoordY()}
                name={enigme5.getname()}
                question={enigme5.getquestion()}
                text1={enigme5.gettext1()}
                answer={enigme5.getanswer()}
                text2={enigme5.gettext2()}
              />
            )}
            {/* Grand écran (Pc...) */}
            <button
              style={{
                left: `${enigme1.getcoordX()}vw`,
                top: `${enigme1.getcoordY()}vw`,
                width: `${enigme1.getlenghtX()}vw`,
                height: `${enigme1.getlenghtY()}vw`,
              }}
              className={`absolute rounded-lg hidden md:block ${
                activeButtons.hint
                  ? "cursor-pointer ring-2 ring-green-500 transform transition-all duration-300 bg-green-500 bg-opacity-20 hover:bg-opacity-50"
                  : "cursor-default"
              }`}
              onClick={() => handleClickPopup("1")}
            ></button>
            <button
              style={{
                left: `${enigme2.getcoordX()}vw`,
                top: `${enigme2.getcoordY()}vw`,
                width: `${enigme2.getlenghtX()}vw`,
                height: `${enigme2.getlenghtY()}vw`,
              }}
              className={`absolute rounded-lg hidden md:block ${
                activeButtons.hint
                  ? "cursor-pointer ring-2 ring-green-500 transform transition-all duration-300 bg-green-500 bg-opacity-20 hover:bg-opacity-50"
                  : "cursor-default"
              }`}
              onClick={() => handleClickPopup("2")}
            ></button>
            <button
              style={{
                left: `${enigme3.getcoordX()}vw`,
                top: `${enigme3.getcoordY()}vw`,
                width: `${enigme3.getlenghtX()}vw`,
                height: `${enigme3.getlenghtY()}vw`,
              }}
              className={`absolute rounded-lg hidden md:block ${
                activeButtons.hint
                  ? "cursor-pointer ring-2 ring-green-500 transform transition-all duration-300 bg-green-500 bg-opacity-20 hover:bg-opacity-50"
                  : "cursor-default"
              }`}
              onClick={() => handleClickPopup("3")}
            ></button>
            <button
              style={{
                left: `${enigme4.getcoordX()}vw`,
                top: `${enigme4.getcoordY()}vw`,
                width: `${enigme4.getlenghtX()}vw`,
                height: `${enigme4.getlenghtY()}vw`,
              }}
              className={`absolute rounded-lg hidden md:block ${
                activeButtons.hint
                  ? "cursor-pointer ring-2 ring-green-500 transform transition-all duration-300 bg-green-500 bg-opacity-20 hover:bg-opacity-50"
                  : "cursor-default"
              }`}
              onClick={() => handleClickPopup("4")}
            ></button>
            <button
              style={{
                left: `${enigme5.getcoordX()}vw`,
                top: `${enigme5.getcoordY()}vw`,
                width: `${enigme5.getlenghtX()}vw`,
                height: `${enigme5.getlenghtY()}vw`,
              }}
              className={`absolute rounded-lg hidden md:block group ${
                activeButtons.hint
                  ? "cursor-pointer ring-2 ring-red-500 transform transition-all duration-300 bg-red-500 bg-opacity-20 hover:bg-opacity-50"
                  : "cursor-default"
              }`}
              onClick={() => handleClickPopup("5")}
            >
              <div className="flex items-center justify-center w-full h-full">
                <Image
                  className={`opacity-0 transition-opacity duration-300 ${
                    activeButtons.hint
                      ? "opacity-30 group-hover:opacity-60"
                      : ""
                  }`}
                  src="icones/lock-solid.svg"
                  alt="lock"
                  width={20}
                  height={20}
                />
              </div>
            </button>

            {/* Petits écrans (Tél...) */}
            <button
              style={{
                left: `${enigme1.getcoordX() * 2}vw`,
                top: `${enigme1.getcoordY() * 2}vw`,
                width: `${enigme1.getlenghtX() * 2}vw`,
                height: `${enigme1.getlenghtY() * 2}vw`,
              }}
              className={`absolute rounded-lg md:hidden ${
                activeButtons.hint
                  ? "cursor-pointer ring-2 ring-green-500 transform transition-all duration-300 bg-green-500 bg-opacity-20 hover:bg-opacity-50"
                  : "cursor-default"
              }`}
              onClick={() => handleClickPopup("1")}
            ></button>
            <button
              style={{
                left: `${enigme2.getcoordX() * 2}vw`,
                top: `${enigme2.getcoordY() * 2}vw`,
                width: `${enigme2.getlenghtX() * 2}vw`,
                height: `${enigme2.getlenghtY() * 2}vw`,
              }}
              className={`absolute rounded-lg md:hidden ${
                activeButtons.hint
                  ? "cursor-pointer ring-2 ring-green-500 transform transition-all duration-300 bg-green-500 bg-opacity-20 hover:bg-opacity-50"
                  : "cursor-default"
              }`}
              onClick={() => handleClickPopup("2")}
            ></button>
            <button
              style={{
                left: `${enigme3.getcoordX() * 2}vw`,
                top: `${enigme3.getcoordY() * 2}vw`,
                width: `${enigme3.getlenghtX() * 2}vw`,
                height: `${enigme3.getlenghtY() * 2}vw`,
              }}
              className={`absolute rounded-lg md:hidden ${
                activeButtons.hint
                  ? "cursor-pointer ring-2 ring-green-500 transform transition-all duration-300 bg-green-500 bg-opacity-20 hover:bg-opacity-50"
                  : "cursor-default"
              }`}
              onClick={() => handleClickPopup("3")}
            ></button>
            <button
              style={{
                left: `${enigme4.getcoordX() * 2}vw`,
                top: `${enigme4.getcoordY() * 2}vw`,
                width: `${enigme4.getlenghtX() * 2}vw`,
                height: `${enigme4.getlenghtY() * 2}vw`,
              }}
              className={`absolute rounded-lg md:hidden ${
                activeButtons.hint
                  ? "cursor-pointer ring-2 ring-green-500 transform transition-all duration-300 bg-green-500 bg-opacity-20 hover:bg-opacity-50"
                  : "cursor-default"
              }`}
              onClick={() => handleClickPopup("4")}
            ></button>
            <button
              style={{
                left: `${enigme5.getcoordX() * 2}vw`,
                top: `${enigme5.getcoordY() * 2}vw`,
                width: `${enigme5.getlenghtX() * 2}vw`,
                height: `${enigme5.getlenghtY() * 2}vw`,
              }}
              className={`absolute rounded-lg md:hidden group ${
                activeButtons.hint
                  ? "cursor-pointer ring-2 ring-red-500 transform transition-all duration-300 bg-red-500 bg-opacity-20 hover:bg-opacity-50"
                  : "cursor-default"
              }`}
              onClick={() => handleClickPopup("5")}
            >
              <div className="flex items-center justify-center w-full h-full">
                <Image
                  className={`opacity-0 transition-opacity duration-300 ${
                    activeButtons.hint
                      ? "opacity-30 group-hover:opacity-60"
                      : ""
                  }`}
                  src="icones/lock-solid.svg"
                  alt="lock"
                  width={20}
                  height={20}
                />
              </div>
            </button>
          </div>
          {/*Affichage des astuces*/}
          {tips === "1" && (
            <Tips
              handleClickTips={handleClickTips}
              title="Bienvenue sur une énigme de Phare !"
              cx={2}
              cy={2}
              text={
                "C'est ici que vous pourrez résoudre des énigmes, en apprendre plus sur le phare et surtout, gagner des beacoins."
              }
              img="/mascotte/temp.png"
              next="2"
            />
          )}
          {tips === "2" && (
            <Tips
              handleClickTips={handleClickTips}
              title="Zones cliquables"
              cx={11}
              cy={20}
              text={
                "Des zones cliquables sont présentes sur l'image, et contiennent une petite devinette en rapport avec le lieu et le phare, essayé de les trouver !"
              }
              img="/mascotte/temp.png"
              next="3"
            />
          )}
          {tips === "3" && (
            <Tips
              handleClickTips={handleClickTips}
              title="Indices"
              cx={45}
              cy={5}
              text={
                "Pour vous aidez, vous pouvez acheter des indices, qui vous reveleront les zones sur l'image, mais attention, ils coûtent 100 Beacoins, et vous les perdez si vous quittez le phare."
              }
              img="/mascotte/temp.png"
              next="4"
            />
          )}
          {tips === "4" && (
            <Tips
              handleClickTips={handleClickTips}
              title="Réponses"
              cx={48}
              cy={30}
              text={
                "Lorsque vous avez trouvé une énigme, elle apparaitra ici, et il ne vous reste qu'à répondre à la question."
              }
              img="/mascotte/temp.png"
              next="5"
            />
          )}
          {tips === "5" && (
            <Tips
              handleClickTips={handleClickTips}
              title="Fin"
              cx={20}
              cy={17}
              text="Chaque phare contient 5 énigmes, 4 d'entre elles vous donneront le code du cadenas, et la dernière vous permettra de le déverrouiller. Une fois déverrouillé, le phare sera considéré comme complété. Et vous recevrez une récompense de 50 Beacoins. Bonne chance !"
              img="/mascotte/temp.png"
              next="0"
            />
          )}
        </section>
      </main>
    </>
  );
}
