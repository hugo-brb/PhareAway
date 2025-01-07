interface MenuProps {
    handleClickActive: (a: string) => void;
  }
  
  export default function Enigme({ handleClickActive }: MenuProps) {
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
            

          </section>
        </main>
      </>
    );
  }
  