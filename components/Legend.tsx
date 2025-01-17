import Image from "next/image";

export default function Legend() {
  return (
    <>
      <div className=" hidden md:flex justify-center items-center w-[25vw] gap-2 bg-white bg-opacity-60 rounded-xl backdrop-blur-md pr-4 py-2 absolute top-4 left-1/2 -translate-x-1/2 z-50 cursor-pointer hover:drop-shadow-2xl duration-300">
        <div className=" flex items-center w-full">
          <Image
            src="/icones/lightHouseIconEnigme.svg"
            alt="Icone de phare"
            width={45}
            height={45}
          />
          <p className=" text-sm md:text-base">Phare jouable</p>
        </div>
        <div className=" flex items-center w-full">
          <Image
            src="/icones/lightHouseIcon.svg"
            alt="Icone de phare"
            width={45}
            height={45}
          />
          <p className=" text-sm md:text-base w-full">Phare non jouable</p>
        </div>
      </div>
    </>
  );
}
