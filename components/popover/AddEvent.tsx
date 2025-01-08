interface MenuProps {
  handleClickActive: (a: string) => void;
}

export default function Event({ handleClickActive }: MenuProps) {
  return (
    <>
      <main className=" absolute top-0 z-40 flex  w-[100vw] h-[100vh]">
        <section className=" flex flex-col self-center gap-12 w-[75vw] h-[95vh] bg-white bg-opacity-60 rounded-3xl backdrop-blur-md mx-auto px-7 py-12 overflow-y-scroll scrollbarhidden">
          <button
            className="absolute top-5 left-5 duration-300 ease-in-out hover:scale-110"
            onClick={() => handleClickActive("calendar")}
          >
            <img
              src="/icones/arrow-back.svg"
              alt="arrow-back"
              width={24}
              height={24}
            />
          </button>
          <h1>Ajouter un évenement</h1>
          <form method="POST">
            <input type="text" />
          </form>
        </section>
      </main>
    </>
  );
}
