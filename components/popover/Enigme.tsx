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
  const [resolvedEnigmes, setResolvedEnigmes] = useState<boolean[]>(
    Array(5).fill(false) // 5 énigmes initialisées à "non résolues"
  );

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

  const [cadenas, setCadenas] = useState(Array<string>(4).fill("▯"));

  return (
    <>
      <main className=" absolute top-1/2 -translate-y-1/2 md:translate-y-0 md:top-0 z-40 flex w-[100vw] h-fit md:h-[100vh]">
        <section
          className={`flex flex-col items-center self-center gap-7 md:gap-12 mb-5 md:mb-0 w-[95vw] h-[75vh] md:w-[75vw] md:h-[95vh] bg-white bg-opacity-60 rounded-3xl backdrop-blur-md mx-auto pl-7 pt-10 pb-12 md:pt-4 overflow-y-scroll scrollbarhidden ${
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
            className="absolute top-[82%] md:top-5 left-5 md:flex flex-col items-center"
            onClick={() => handleClickTips("1")}
          >
            <Image
              src="/mascotte/help.webp"
              alt="Aide"
              width={75}
              height={75}
            ></Image>
            <span className=" hidden md:block text-[0.7rem]">
              Besoin d&apos;aide ?
            </span>
          </button>

          <h1 className=" text-3xl font-bold hover:underline hover:text-[--primary] underline-offset-2 duration-100 group">
            <a
              href={lighthouse.getUrl()}
              target="_blank"
              className=" flex items-center"
            >
              {" "}
              Enigmes : {lighthouse.getName() ?? "Phare inconnu"}{" "}
              {phareEnded.includes(id) ? "   (COMPLÉTÉ)" : ""}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
                className=" size-7 ml-2 mt-1 group-hover:fill-[--primary]"
              >
                <path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z" />
              </svg>
            </a>
          </h1>
          <h3 className="absolute top-[4vw] right-3 text-center max-w-[400px] text-lg items-center">
            Des <strong>zones cliquables</strong> sont présentes sur{" "}
            <strong>l&apos;image</strong> et contiennent une petite devinette.{" "}
            <br />
            ton objectif est de découvrir le <strong>code du cadenas</strong> se
            situant sur la <strong>porte du phare</strong>
            <br />
            <br />
            <strong>Un bon point de départ serait le feu !</strong>
          </h3>
          <h3 className="absolute top-[16vw] right-[5vw] text-end max-w-[300px] text-lg items-center">
            Acheter un indice pour réveler les zones cliquables
          </h3>
          <button
            className={`absolute hidden md:block ${
              activeButtons.hint ? "pointer-events-none" : ""
            }`}
            style={{ top: "17vw", right: "5vw" }}
            onClick={() => {
              if (!activeButtons.hint) {
                if (player.getBeacoins() <= 100) {
                  handleClickTips("tipsF");
                } else {
                  setShowConfirmation(true); // Afficher le popup
                }
              }
            }}
          >
            <Image
              src={
                activeButtons.hint
                  ? "/images/hintOn.webp"
                  : "/images/hintOff.webp"
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
            onClick={() => {
              if (!activeButtons.hint) {
                setShowConfirmation(true); // Afficher le popup
              }
            }}
          >
            <Image
              src={
                activeButtons.hint
                  ? "/images/hintOn.webp"
                  : "/images/hintOff.webp"
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
                cadenas={cadenas}
                setCadenas={setCadenas}
                codeLock={enigme1.getanswerLock()}
                coordX={enigme1.getcoordX()}
                coordY={enigme1.getcoordY()}
                name={enigme1.getname()}
                question={enigme1.getquestion()}
                text1={enigme1.gettext1()}
                answer={enigme1.getanswer()}
                text2={enigme1.gettext2()}
                onResolve={(index) => {
                  // Mettre à jour l'état pour marquer l'énigme comme résolue
                  setResolvedEnigmes((prev) => {
                    const updated = [...prev];
                    updated[index] = true;
                    return updated;
                  });
                }}
              />
            )}
            {popup === "2" && (
              <SmallEnigme
                handleClickPopup={handleClickPopup}
                id={popup}
                player={player}
                lh={id}
                cadenas={cadenas}
                setCadenas={setCadenas}
                codeLock={enigme2.getanswerLock()}
                coordX={enigme2.getcoordX()}
                coordY={enigme2.getcoordY()}
                name={enigme2.getname()}
                question={enigme2.getquestion()}
                text1={enigme2.gettext1()}
                answer={enigme2.getanswer()}
                text2={enigme2.gettext2()}
                onResolve={(index) => {
                  // Mettre à jour l'état pour marquer l'énigme comme résolue
                  setResolvedEnigmes((prev) => {
                    const updated = [...prev];
                    updated[index] = true;
                    return updated;
                  });
                }}
              />
            )}
            {popup === "3" && (
              <SmallEnigme
                handleClickPopup={handleClickPopup}
                id={popup}
                player={player}
                lh={id}
                cadenas={cadenas}
                setCadenas={setCadenas}
                codeLock={enigme3.getanswerLock()}
                coordX={enigme3.getcoordX()}
                coordY={enigme3.getcoordY()}
                name={enigme3.getname()}
                question={enigme3.getquestion()}
                text1={enigme3.gettext1()}
                answer={enigme3.getanswer()}
                text2={enigme3.gettext2()}
                onResolve={(index) => {
                  // Mettre à jour l'état pour marquer l'énigme comme résolue
                  setResolvedEnigmes((prev) => {
                    const updated = [...prev];
                    updated[index] = true;
                    return updated;
                  });
                }}
              />
            )}
            {popup === "4" && (
              <SmallEnigme
                handleClickPopup={handleClickPopup}
                id={popup}
                player={player}
                lh={id}
                cadenas={cadenas}
                setCadenas={setCadenas}
                codeLock={enigme4.getanswerLock()}
                coordX={enigme4.getcoordX()}
                coordY={enigme4.getcoordY()}
                name={enigme4.getname()}
                question={enigme4.getquestion()}
                text1={enigme4.gettext1()}
                answer={enigme4.getanswer()}
                text2={enigme4.gettext2()}
                onResolve={(index) => {
                  // Mettre à jour l'état pour marquer l'énigme comme résolue
                  setResolvedEnigmes((prev) => {
                    const updated = [...prev];
                    updated[index] = true;
                    return updated;
                  });
                }}
              />
            )}
            {popup === "5" && (
              <SmallEnigme
                handleClickPopup={handleClickPopup}
                id={popup}
                player={player}
                lh={id}
                cadenas={cadenas}
                setCadenas={setCadenas}
                codeLock={enigme5.getanswerLock()}
                coordX={enigme5.getcoordX()}
                coordY={enigme5.getcoordY()}
                name={enigme5.getname()}
                question={enigme5.getquestion()}
                text1={enigme5.gettext1()}
                answer={enigme5.getanswer()}
                text2={enigme5.gettext2()}
                onResolve={(index) => {
                  // Mettre à jour l'état pour marquer l'énigme comme résolue*
                  handleClickTips("resolv");
                  setResolvedEnigmes((prev) => {
                    const updated = [...prev];
                    updated[index] = true;
                    return updated;
                  });
                }}
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
              className={`absolute rounded-lg hidden md:block cursor-default ${
                resolvedEnigmes[0] || activeButtons.hint
                  ? "ring-2 ring-green-500 transform transition-all duration-300 bg-green-500 bg-opacity-20 hover:bg-opacity-50"
                  : "hidden" // Masqué si non résolu
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
              className={`absolute rounded-lg hidden md:block cursor-default ${
                resolvedEnigmes[1] || activeButtons.hint
                  ? "ring-2 ring-green-500 transform transition-all duration-300 bg-green-500 bg-opacity-20 hover:bg-opacity-50"
                  : "hidden" // Masqué si non résolu
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
              className={`absolute rounded-lg hidden md:block cursor-default ${
                resolvedEnigmes[2] || activeButtons.hint
                  ? "ring-2 ring-green-500 transform transition-all duration-300 bg-green-500 bg-opacity-20 hover:bg-opacity-50"
                  : "hidden" // Masqué si non résolu
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
              className={`absolute rounded-lg hidden md:block cursor-default ${
                resolvedEnigmes[3] || activeButtons.hint
                  ? "ring-2 ring-green-500 transform transition-all duration-300 bg-green-500 bg-opacity-20 hover:bg-opacity-50"
                  : "hidden" // Masqué si non résolu
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
              className={`absolute rounded-lg hidden md:block cursor-default ${
                activeButtons.hint ||
                (resolvedEnigmes[0] &&
                  resolvedEnigmes[1] &&
                  resolvedEnigmes[2] &&
                  resolvedEnigmes[3])
                  ? " ring-2 ring-red-500 transform transition-all duration-300 bg-red-400 bg-opacity-20 hover:bg-opacity-50"
                  : "hidden" // Masqué si non résolu
              }`}
              onClick={() => handleClickPopup("5")}
            >
              <div className="flex items-center justify-center w-full h-full">
                <Image
                  className={`opacity-0 transition-opacity duration-300 ${
                    activeButtons.hint ||
                    (resolvedEnigmes[0] &&
                      resolvedEnigmes[1] &&
                      resolvedEnigmes[2] &&
                      resolvedEnigmes[3])
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
                  ? "cursor-default ring-2 ring-green-500 transform transition-all duration-300 bg-green-500 bg-opacity-20 hover:bg-opacity-50"
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
                  ? "cursor-default ring-2 ring-green-500 transform transition-all duration-300 bg-green-500 bg-opacity-20 hover:bg-opacity-50"
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
                  ? "cursor-default ring-2 ring-green-500 transform transition-all duration-300 bg-green-500 bg-opacity-20 hover:bg-opacity-50"
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
                  ? "cursor-default ring-2 ring-green-500 transform transition-all duration-300 bg-green-500 bg-opacity-20 hover:bg-opacity-50"
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
              className={`absolute rounded-lg md:hidden group cursor-default ${
                activeButtons.hint
                  ? "ring-2 ring-red-500 transform transition-all duration-300 bg-red-500 bg-opacity-20 hover:bg-opacity-50"
                  : "hidden" // Masqué si non résolu
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
              cx="50%"
              cy="50%"
              text={
                "C'est ici que tu pourras résoudre des <strong>énigmes</strong>, en apprendre plus sur le phare et surtout, gagner des <strong>Beacoins</strong>."
              }
              img="/mascotte/happy.webp"
              next="2"
            />
          )}
          {tips === "2" && (
            <Tips
              handleClickTips={handleClickTips}
              title="Zones cliquables"
              cx="40%"
              cy="50%"
              text={
                "Des <strong>zones cliquables</strong> sont présentes sur l'image et contiennent une petite <strong>devinette</strong> en rapport avec le lieu et le phare. Essayez de les trouver !"
              }
              img="/mascotte/help.webp"
              next="3"
            />
          )}
          {tips === "3" && (
            <Tips
              handleClickTips={handleClickTips}
              title="Indices"
              cx="50%"
              cy="35%"
              text={
                "Pour t'aider, tu peux acheter des <strong>indices</strong> qui te révèleront les <strong>zones</strong> sur l'image, mais attention, ils coûtent 100 Beacoins et tu les <strong>perdras</strong> si tu quittes le phare."
              }
              img="/mascotte/fuwa.webp"
              next="4"
            />
          )}
          {tips === "4" && (
            <Tips
              handleClickTips={handleClickTips}
              title="Réponses"
              cx="48vw"
              cy="30vw"
              text={
                "Lorsque tu as trouvé une <strong>énigme</strong>, elle apparaitra ici, et il ne te reste qu'à répondre à la question."
              }
              img="/mascotte/uwu.webp"
              next="5"
            />
          )}
          {tips === "5" && (
            <Tips
              handleClickTips={handleClickTips}
              title="Fin"
              cx="50%"
              cy="50%"
              text="Chaque phare contient <strong>5</strong> énigmes, <strong>4</strong> d'entre elles te donneront le code du cadenas, et la dernière te permettras de le <strong>déverrouiller</strong>. Une fois déverrouillé, le phare sera considéré comme <strong>complété</strong>. Et tu recevras une récompense de <strong>50 Beacoins</strong>. Bonne chance !"
              img="/mascotte/happy.webp"
              next="0"
            />
          )}
          {tips === "tipsF" && (
            <Tips
              handleClickTips={handleClickTips}
              title="Pas assez de Beacoins"
              cx="50%"
              cy="50%"
              text="Désolé, mais tu n'as pas assez de <strong>Beacoins</strong> pour acheter les indices."
              img="/mascotte/mad.webp"
              next="0"
            />
          )}
          {tips === "resolv" && (
            <Tips
              handleClickTips={handleClickTips}
              title="Bravo !"
              cx="50%"
              cy="50%"
              text="Tu as resolu toutes les enigmes de ce phare, tu as gagné 50 Beacoins !"
              img="/mascotte/yay.webp"
              next="0"
            />
          )}
        </section>
      </main>
    </>
  );
}
