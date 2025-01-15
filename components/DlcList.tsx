import { UsePlayer } from "@/components/model/player";
import Image from "next/image";

interface DlcListProps {
    player: UsePlayer;
    onCenterChange: (center: [number, number]) => void
    onBoundsChange: (bounds: [[number, number],[number,number]])=>void
  }
    //map extension : [clé][nom,coordX,coordY,[[Southwest coordinates],[Northeast coordinates]]]
    const mapExtention: { [key: number]: [string, number, number,[[number, number],[number,number]]] } = {1:["Corse",9.02405903963976,42.16359439971431,[[-5.127287501115138,41.77913251512358],[10.429352882451159,51.69268051974335]]],2:["Guadeloupe",-61.577007207411725,16.246965622581968,[[-61.95578838889018,14.46119739625245],[-60.47036547887585,16.713124325221894]]],3:["Guyane",-52.68573297642384,4.645257364913272,[[ -54.61039631211972,2.138987213650004],[-51.495772337020114,5.9192100034690895]]],4:["Martinique",-61.03232818368298,14.669904664444111,[[-61.95578838889018,14.46119739625245],[-60.47036547887585,16.713124325221894]]],5:["Reunion",55.52317231258425,-21.11796945948837,[[ 55.11667817826789,-21.412319909903132],[55.92279999192905,-20.84292815265113]]]};

  export default function DlcList({player,onCenterChange,onBoundsChange }: DlcListProps) {
    return (
      <>
        <aside className="flex md:flex-col w-full h-fit md:w-fit gap-2 justify-between bg-white bg-opacity-60 rounded-t-3xl md:rounded-3xl backdrop-blur-md px-3 py-4 md:px-6 md:py-5 absolute bottom-0 md:right-7 md:bot-[20%] md:bottom-28 z-50">
        <div className=" flex flex-col gap-3 items-center justify-around">
          {player.getDlcUnlocked().map((dlc, index) =>
            dlc === 1 && mapExtention[index] ? (
              <button
                key={index}
                onClick={() => {
                    onCenterChange([mapExtention[index][1], mapExtention[index][2]]);
                    onBoundsChange([[mapExtention[index][3][0][0],mapExtention[index][3][0][1]],[mapExtention[index][3][1][0],mapExtention[index][3][1][1]]])
                  }}

              className="flex self-center"
              >
                <Image
                    src={`https://nereoll.github.io/imagesPhare/extensions/${mapExtention[index][0]}.png`}
                    alt="Image dlc"
                    width={30}
                    height={30}
                >
                </Image>
                {mapExtention[index][0]}
              </button>
            ) : null
          )}

              </div>
        </aside>
      </>
    );
  }
  