interface MenuProps {
  handleClickActive: (a: string) => void;
}

export default function Pictures({ handleClickActive }: MenuProps) {
  return (
    <>
      <main className=" absolute top-0 z-40 flex w-[100vw] h-[100vh]">
        <section className=" flex flex-col items-center self-center gap-12 w-fit h-fit max-h-[95vh] bg-white bg-opacity-60 rounded-3xl backdrop-blur-md mx-auto px-7 py-12 overflow-y-scroll scrollbarhidden">
          <button
            className="absolute top-5 left-5"
            onClick={() => handleClickActive("home")}
          >
            <img
              src="/icones/arrow-back.svg"
              alt="arrow-back"
              width={24}
              height={24}
            />
          </button>
          <h1 className=" font-gravitas self-center text-center text-5xl">
            Importer une image
          </h1>
          <div>
            <label
              className="w-fit h-fit flex flex-col gap-5 cursor-pointer justify-center items-center border-2 border-dashed p-6 rounded-xl drop-shadow-2xl "
              htmlFor="pict"
            >
              <div className="flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                  className=" size-20"
                >
                  <path d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256 0l0 128 128 0L256 0zM64 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm152 32c5.3 0 10.2 2.6 13.2 6.9l88 128c3.4 4.9 3.7 11.3 1 16.5s-8.2 8.6-14.2 8.6l-88 0-40 0-48 0-48 0c-5.8 0-11.1-3.1-13.9-8.1s-2.8-11.2 .2-16.1l48-80c2.9-4.8 8.1-7.8 13.7-7.8s10.8 2.9 13.7 7.8l12.8 21.4 48.3-70.2c3-4.3 7.9-6.9 13.2-6.9z" />
                </svg>
              </div>
              <div className="flex justify-center items-center">
                <span className=" font-normal">
                  Cliquer pour importer une image
                </span>
              </div>
              <input
                type="file"
                id="pict"
                accept="image/*"
                className="hidden"
              />
            </label>
          </div>
        </section>
      </main>
    </>
  );
}
