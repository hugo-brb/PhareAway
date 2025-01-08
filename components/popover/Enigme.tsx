interface EnigmeProps {
  handleClickActive: (a: string) => void;
  id: number;
}

export default function Enigme({ handleClickActive, id }: EnigmeProps) {
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
          <div
            className="rounded-3xl absolute top-1/2 -translate-y-1/2 left-[10%] w-[40vw] h-[40vw] bg-cover bg-center"
            style={{
              backgroundImage: `url("https://nereoll.github.io/imagesPhare/phares/${id}.png")`,
            }}
          >
            <button
              className="absolute left-[23.5vw] top-[17vw] w-[8vw] h-[13vw] hover:border-red-700 border-2 rounded-lg"
              onClick={() => handleClickActive("enigme")}
            ></button>
            <button
              className="absolute left-[15vw] top-[11.5vw] w-[8vw] h-[18vw] hover:border-red-700 border-2 rounded-lg"
              onClick={() => handleClickActive("enigme")}
            ></button>
            <button
              className="absolute left-[17.2vw] top-[4.5vw] w-[3.5vw] h-[3.5vw] hover:border-red-700 border-2 rounded-lg"
              onClick={() => handleClickActive("enigme")}
            ></button>
            <button
              className="absolute left-[1vw] top-[36vw] w-[19vw] h-[4vw] hover:border-red-700 border-2 rounded-lg"
              onClick={() => handleClickActive("enigme")}
            ></button>
            <button
              className="absolute left-[13vw] top-[30.5vw] w-[1.5vw] h-[3vw] hover:border-red-700 border-2 rounded-lg"
              onClick={() => handleClickActive("enigme")}
            ></button>
          </div>
        </section>
      </main>
    </>
  );
}
