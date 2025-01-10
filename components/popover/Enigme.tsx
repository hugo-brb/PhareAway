import { useEnigme } from "@/components/model/EnigmeInterface";
import { useState } from 'react';
import Image from 'next/image';
import SmallEnigme from "@/components/popover/JohnPork";


interface EnigmeProps {
    handleClickActive: (a: string) => void;
    id: number;
  }
  export default function Enigme({ handleClickActive,id }: EnigmeProps) {

    const enigme1 = useEnigme(id, 1);//recupere les données de la premiere enigme du phare id
    const enigme2 = useEnigme(id, 2);//recupere les données de la deuxieme enigme du phare id
    const enigme3 = useEnigme(id, 3);//recupere les données de la troisieme enigme du phare i
    const enigme4 = useEnigme(id, 4);//recupere les données de la quatrieme enigme du phare id

    const [popup, setPopup] = useState("0");
    
    const handleClickPopup = (a: string) => {
        setPopup(a);
      };



    return (
      <>


        <main className=" absolute top-0 z-40 flex w-[100vw] h-[100vh]">
          <section className=" flex flex-col items-center self-center gap-12 w-[75vw] h-[95vh] bg-white bg-opacity-60 rounded-3xl backdrop-blur-md mx-auto px-7 py-12 overflow-y-scroll scrollbarhidden">
            <button
              className="absolute top-5 left-5 transform transition-transform duration-300 hover:-rotate-90"
              onClick={() => handleClickActive("home")}
            >
              <Image
                src="/icones/xmark-solid.svg"
                alt="arrow-back"
                width={24}
                height={24}
              />
            </button>
            
            <div className="rounded-3xl absolute top-1/2 -translate-y-1/2 left-[10%] w-[40vw] h-[40vw] bg-cover bg-center" style={{ backgroundImage: `url("https://nereoll.github.io/imagesPhare/phares/${id}.png")` }}>

            {popup === "1" && (
        <SmallEnigme 
            handleClickPopup={handleClickPopup}
            codeLock= {enigme1.getanswerLock()}
            coordX={enigme1.getcoordX()}
            coordY={enigme1.getcoordY()}
            name= {enigme1.getname()}
            question= {enigme1.getquestion()}
            text1= {enigme1.gettext1()}
            answer={enigme1.getanswer()}
            text2= {enigme1.gettext2()}
        />
      )}
        {popup === "2" && (
        <SmallEnigme 
            handleClickPopup={handleClickPopup}
            codeLock= {enigme2.getanswerLock()}
            coordX={enigme2.getcoordX()}
            coordY={enigme2.getcoordY()}
            name= {enigme2.getname()}
            question= {enigme2.getquestion()}
            text1= {enigme2.gettext1()}
            answer={enigme2.getanswer()}
            text2= {enigme2.gettext2()}
        />
        )}
        {popup === "3" && (
        <SmallEnigme 
            handleClickPopup={handleClickPopup}
            codeLock= {enigme3.getanswerLock()}
            coordX={enigme3.getcoordX()}
            coordY={enigme3.getcoordY()}
            name= {enigme3.getname()}
            question= {enigme3.getquestion()}
            text1= {enigme3.gettext1()}
            answer={enigme3.getanswer()}
            text2= {enigme3.gettext2()}
        />
        )}
        {popup === "4" && (
        <SmallEnigme 
            handleClickPopup={handleClickPopup}
            codeLock= {enigme4.getanswerLock()}
            coordX={enigme4.getcoordX()}
            coordY={enigme4.getcoordY()}
            name= {enigme4.getname()}
            question= {enigme4.getquestion()}
            text1= {enigme4.gettext1()}
            answer={enigme4.getanswer()}
            text2= {enigme4.gettext2()}
        />
        )}
            <button style={{left: `${enigme1.getcoordX()}vw`, top:`${enigme1.getcoordY()}vw`, width : `${enigme1.getlenghtX()}vw`, height : `${enigme1.getlenghtY()}vw`}} 
                    className={`absolute rounded-lg`}
                    onClick={() => handleClickPopup("1")}>
            </button>
            <button style={{left: `${enigme2.getcoordX()}vw`, top:`${enigme2.getcoordY()}vw`, width : `${enigme2.getlenghtX()}vw`, height : `${enigme2.getlenghtY()}vw`}} 
                    className={`absolute rounded-lg`}
                    onClick={() => handleClickPopup("2")}>
            </button>
            <button style={{left: `${enigme3.getcoordX()}vw`, top:`${enigme3.getcoordY()}vw`, width : `${enigme3.getlenghtX()}vw`, height : `${enigme3.getlenghtY()}vw`}} 
                    className={`absolute rounded-lg`}
                    onClick={() => handleClickPopup("3")}>
            </button>
            <button style={{left: `${enigme4.getcoordX()}vw`, top:`${enigme4.getcoordY()}vw`, width : `${enigme4.getlenghtX()}vw`, height : `${enigme4.getlenghtY()}vw`}} 
                    className={`absolute rounded-lg`}
                    onClick={() => handleClickPopup("4")}>
            </button>
            </div>
          </section>
        </main>
        
      </>
    );
  }
  