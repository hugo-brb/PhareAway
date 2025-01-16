interface MenuProps {
  active: string;
  handleClickActive: (a: string) => void;
}

export default function Menu({ active, handleClickActive }: MenuProps) {
  return (
    <>
      <aside className="flex md:flex-col w-full h-fit md:w-fit gap-2 justify-between bg-white bg-opacity-60 rounded-t-3xl md:rounded-3xl backdrop-blur-md px-3 py-4 md:px-6 md:py-5 absolute bottom-0 md:left-7 md:top-[20%] md:bottom-28 z-50">
        <div
          className="flex flex-col justify-center items-center gap-4"
          onClick={() => handleClickActive("calendar")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className={` ${
              active === "calendar" || active === "addEvent"
                ? "fill-[--accent]"
                : "fill-[--primary] hover:fill-[--accent]"
            } duration-300 size-12 cursor-pointer`}
          >
            <path d="M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48L0 160l0-48C0 85.5 21.5 64 48 64l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zm64 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 400l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z" />
          </svg>
          <p className="hidden md:flex justify-center text-xs">Évènements</p>
        </div>
        <hr className=" hidden md:block" />
        <div
          className="flex flex-col justify-center items-center gap-4"
          onClick={() => handleClickActive("coin")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className={` ${
              active === "coin"
                ? "fill-[--accent]"
                : "fill-[--primary] hover:fill-[--accent]"
            } duration-300 size-12 cursor-pointer`}
          >
            <path d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64l0 48-128 0 0-48zm-48 48l-64 0c-26.5 0-48 21.5-48 48L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-208c0-26.5-21.5-48-48-48l-64 0 0-48C336 50.1 285.9 0 224 0S112 50.1 112 112l0 48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z" />
          </svg>
          <p className="hidden md:flex justify-center text-xs">PharAchat</p>
        </div>
        <hr className=" hidden md:block" />
        <div
          className="flex flex-col justify-center items-center gap-4"
          onClick={() => handleClickActive("home")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            className={` ${
              active === "home"
                ? "fill-[--accent] "
                : "fill-[--primary] hover:fill-[--accent]"
            } duration-300 size-12 cursor-pointer`}
          >
            <path d="M384 476.1L192 421.2l0-385.3L384 90.8l0 385.3zm32-1.2l0-386.5L543.1 37.5c15.8-6.3 32.9 5.3 32.9 22.3l0 334.8c0 9.8-6 18.6-15.1 22.3L416 474.8zM15.1 95.1L160 37.2l0 386.5L32.9 474.5C17.1 480.8 0 469.2 0 452.2L0 117.4c0-9.8 6-18.6 15.1-22.3z" />
          </svg>
          <p className="hidden md:flex justify-center text-xs">Carte</p>
        </div>
        <hr className=" hidden md:block" />
        {/*=================================*/}
        <div
          className="flex flex-col justify-center items-center gap-4"
          onClick={() => handleClickActive("picture")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
            className={` ${
              active === "picture"
                ? "fill-[--accent]"
                : "fill-[--primary] hover:fill-[--accent]"
            } duration-300 size-12 cursor-pointer`}
          >
            <path d="M160 32c-35.3 0-64 28.7-64 64l0 224c0 35.3 28.7 64 64 64l352 0c35.3 0 64-28.7 64-64l0-224c0-35.3-28.7-64-64-64L160 32zM396 138.7l96 144c4.9 7.4 5.4 16.8 1.2 24.6S480.9 320 472 320l-144 0-48 0-80 0c-9.2 0-17.6-5.3-21.6-13.6s-2.9-18.2 2.9-25.4l64-80c4.6-5.7 11.4-9 18.7-9s14.2 3.3 18.7 9l17.3 21.6 56-84C360.5 132 368 128 376 128s15.5 4 20 10.7zM192 128a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM48 120c0-13.3-10.7-24-24-24S0 106.7 0 120L0 344c0 75.1 60.9 136 136 136l320 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-320 0c-48.6 0-88-39.4-88-88l0-224z" />
          </svg>
          <p className="hidden md:flex justify-center text-xs">Images</p>
        </div>
        <hr className=" hidden md:block" />
        <div
          className="flex flex-col justify-center items-center gap-4"
          onClick={() => handleClickActive("account")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className={` ${
              ["account", "cgu", "about", "contact"].includes(active)
                ? "fill-[--accent]"
                : "fill-[--primary] hover:fill-[--accent]"
            } duration-300 size-12 cursor-pointer`}
          >
            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
          </svg>
          <p className="hidden md:flex justify-center text-xs">Compte</p>
        </div>
      </aside>
    </>
  );
}
