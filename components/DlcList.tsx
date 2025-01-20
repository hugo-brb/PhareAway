import { UsePlayer } from "@/components/model/player";
import Image from "next/image";
import Link from "next/link";

interface DlcListProps {
  player: UsePlayer;
  onCenterChange: (center: [number, number]) => void;
  onZoomChange: (zoom: number) => void;
  onBoundsChange: (bounds: [[number, number], [number, number]]) => void;
  handleClickActive: (a: string) => void;
}
//map extension : [clé][nom,coordX,coordY,[[Southwest coordinates],[Northeast coordinates]],zoom]
const mapExtention: {
  [key: number]: [
    string,
    number,
    number,
    [[number, number], [number, number]],
    number
  ];
} = {
  0: [
    "Metropole",
    2.451967398919588,
    47.06938852063802,
    [
      [-14.637792105651805, 34.50915037983],
      [13.253221239308171, 54.05642397818343],
    ],
    5.6,
  ],
  1: [
    "Antilles",
    -61.30745453266859,
    15.486884303345935,
    [
      [-63.12086548328959, 14.230760006919878],
      [-58.86942425461147, 16.667878090878762],
    ],
    8.6,
  ],
  2: [
    "Guyane",
    -52.68573297642384,
    4.645257364913272,
    [
      [-54.113885703426575, 2.614224603239319],
      [-49.924880009263546, 6.013093760262933],
    ],
    8.33,
  ],
  3: [
    "Reunion",
    55.52317231258425,
    -21.11796945948837,
    [
      [54.313572256770016, -21.87076614161982],
      [56.27344783098964, -20.531809244925288],
    ],
    9.5,
  ],
};

export default function DlcList({
  player,
  onCenterChange,
  onZoomChange,
  onBoundsChange,
  handleClickActive,
}: DlcListProps) {
  return (
    <>
      <aside className="flex text-center md:flex-col w-fit h-fit md:w-[170px] gap-2 justify-between bg-white bg-opacity-60 rounded-3xl backdrop-blur-md px-2 py-2 md:px-6 md:py-5 absolute right-1/2 bottom-24 translate-x-1/2 md:translate-x-0 md:right-2 md:bottom-28 z-50">
        <div className=" flex md:flex-col gap-5 md:gap-3 items-center justify-around">
          <h1 className=" hidden md:block">Zones géographiques : </h1>
          {player.getDlcUnlocked().map((dlc, index) =>
            dlc === 1 && mapExtention[index] ? (
              <button
                key={index}
                onClick={() => {
                  onZoomChange(mapExtention[index][4]);
                  onCenterChange([
                    mapExtention[index][1],
                    mapExtention[index][2],
                  ]);
                  onBoundsChange([
                    [
                      mapExtention[index][3][0][0],
                      mapExtention[index][3][0][1],
                    ],
                    [
                      mapExtention[index][3][1][0],
                      mapExtention[index][3][1][1],
                    ],
                  ]);
                }}
                className="flex self-center items-center gap-1"
              >
                <Image
                  src={`https://nereoll.github.io/imagesPhare/extensions/${mapExtention[index][0]}.png`}
                  alt="Image dlc"
                  width={30}
                  height={30}
                ></Image>
                <p className=" hidden md:block">{mapExtention[index][0]}</p>
              </button>
            ) : null
          )}
          <button
            className=" w-full md:w-full text-lg md:text-l font-bold rounded-3xl border-2 hover:bg-[--primary] border-[--primary] duration-300 ease-in-out hover:text-white"
            onClick={() => handleClickActive("coin")}
          >
            +
          </button>
        </div>
      </aside>
    </>
  );
}
