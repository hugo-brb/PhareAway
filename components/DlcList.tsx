import { UsePlayer } from "@/components/model/player";
import Image from "next/image";

interface DlcListProps {
  player: UsePlayer;
  onCenterChange: (center: [number, number]) => void;
  onBoundsChange: (bounds: [[number, number], [number, number]]) => void;
}
//map extension : [clé][nom,coordX,coordY,[[Southwest coordinates],[Northeast coordinates]]]
const mapExtention: {
  [key: number]: [string, number, number, [[number, number], [number, number]]];
} = {
  0: [
    "Metropole",
    -1.6282904,
    49.6299822,
    [
      [-5.127287501115138, 41.77913251512358],
      [10.429352882451159, 51.69268051974335],
    ],
  ],
  1: [
    "Antilles",
    -61.577007207411725,
    16.246965622581968,
    [
      [-61.95578838889018, 14.46119739625245],
      [-60.47036547887585, 16.713124325221894],
    ],
  ],
  2: [
    "Guyane",
    -52.68573297642384,
    4.645257364913272,
    [
      [-54.61039631211972, 2.138987213650004],
      [-51.495772337020114, 5.9192100034690895],
    ],
  ],
  3: [
    "Reunion",
    55.52317231258425,
    -21.11796945948837,
    [
      [55.11667817826789, -21.412319909903132],
      [55.92279999192905, -20.84292815265113],
    ],
  ],
};

export default function DlcList({
  player,
  onCenterChange,
  onBoundsChange,
}: DlcListProps) {
  return (
    <>
      <aside className="flex text-center md:flex-col w-fit h-fit md:w-[170px] gap-2 justify-between bg-white bg-opacity-60 rounded-3xl backdrop-blur-md px-2 py-2 md:px-6 md:py-5 absolute right-1/2 bottom-24 translate-x-1/2 md:translate-x-0 md:right-2 md:bottom-28 z-50">
        <div className=" flex md:flex-col gap-5 md:gap-3 items-center justify-around">
          <h1 className=" hidden md:block">Zones géographique : </h1>
          {player.getDlcUnlocked().map((dlc, index) =>
            dlc === 1 && mapExtention[index] ? (
              <button
                key={index}
                onClick={() => {
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
        </div>
      </aside>
    </>
  );
}
