import { useEnigme, UseEnigme } from "@/components/model/EnigmeInterface";

interface EnigmeProps {
    handleClickActive: (a: string) => void;
    id: number;
  }
  export default function Enigme({ handleClickActive,id }: EnigmeProps) {

    const enigme1 = useEnigme(id, 1);//recupere les données de la premiere enigme du phare id
    const enigme2 = useEnigme(id, 2);//recupere les données de la deucieme enigme du phare id
    const enigme3 = useEnigme(id, 3);//recupere les données de la troisieme enigme du phare id
    const enigme4 = useEnigme(id, 4);//recupere les données de la quatrieme enigme du phare id

    console.log("enigme1",enigme1.getcoordX(),enigme1.getcoordY(),enigme1.getlenghtX(),enigme1.getlenghtY());
    return (
      <>
        <main className=" absolute top-0 z-40 flex w-[100vw] h-[100vh]">
          <section className=" flex flex-col items-center self-center gap-12 w-[75vw] h-[95vh] bg-white bg-opacity-60 rounded-3xl backdrop-blur-md mx-auto px-7 py-12 overflow-y-scroll scrollbarhidden">
            <button
              className="absolute top-5 left-5 transform transition-transform duration-300 hover:-rotate-90"
              onClick={() => handleClickActive("home")}
            >
              <img
                src="/icones/xmark-solid.svg"
                alt="arrow-back"
                width={24}
                height={24}
              />
            </button>
            <div className="rounded-3xl absolute top-1/2 -translate-y-1/2 left-[10%] w-[40vw] h-[40vw] bg-cover bg-center" style={{ backgroundImage: `url("https://nereoll.github.io/imagesPhare/phares/${id}.png")` }}>
            <button style={{left: `${enigme1.getcoordX()}vw`, top:`${enigme1.getcoordY()}vw`, width : `${enigme1.getlenghtX()}vw`, height : `${enigme1.getlenghtY()}vw`}} className={`absolute border-red-700 border-2 rounded-lg`}  onClick={() => handleClickActive("enigme")}>
            </button>
            <button style={{left: `${enigme2.getcoordX()}vw`, top:`${enigme2.getcoordY()}vw`, width : `${enigme2.getlenghtX()}vw`, height : `${enigme2.getlenghtY()}vw`}} className={`absolute border-red-700 border-2 rounded-lg`}  onClick={() => handleClickActive("enigme")}>
            </button>
            <button style={{left: `${enigme3.getcoordX()}vw`, top:`${enigme3.getcoordY()}vw`, width : `${enigme3.getlenghtX()}vw`, height : `${enigme3.getlenghtY()}vw`}} className={`absolute border-red-700 border-2 rounded-lg`}  onClick={() => handleClickActive("enigme")}>
            </button>
            <button style={{left: `${enigme4.getcoordX()}vw`, top:`${enigme4.getcoordY()}vw`, width : `${enigme4.getlenghtX()}vw`, height : `${enigme4.getlenghtY()}vw`}} className={`absolute border-red-700 border-2 rounded-lg`}  onClick={() => handleClickActive("enigme")}>
            </button>
            </div>
          </section>
        </main>
      </>
    );
  }
  