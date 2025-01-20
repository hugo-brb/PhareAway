import Image from "next/image";

export default function Legend() {
  return (
    <>
      <div className=" hidden md:flex justify-center items-center w-[16vw] gap-2 bg-white bg-opacity-60 rounded-xl backdrop-blur-md py-2 absolute top-3 right-[15vw] z-50">
        <div className=" flex items-center w-full">
          <Image
            src="/icones/lightHouseIconEnigme.svg"
            alt="Icone de phare"
            width={25}
            height={25}
          />
          <p className=" text-sm">Jouable</p>
        </div>
        <div className=" flex items-center w-full">
          <Image
            src="/icones/lightHouseIcon.svg"
            alt="Icone de phare"
            width={25}
            height={25}
          />
          <p className=" text-sm w-fit pr-2">Non jouable</p>
        </div>
      </div>
    </>
  );
}
