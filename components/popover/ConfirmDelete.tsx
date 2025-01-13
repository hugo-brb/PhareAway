import type { UsePlayer } from "@/components/model/player";

interface MenuProps {
  handleClickActive: (a: string) => void;
  player: UsePlayer;
}

export default function ComfirmDelete({
  handleClickActive,
  player,
}: MenuProps) {
  return (
    <section
      style={{ left: `20wv`, top: `19vw` }}
      className="absolute w-[40vw] h-[15.5vw] bg-white rounded-3xl px-7 py-7 z-20 border border-neutral-400"
    >
      <h1 className="font-bold text-xl">
        Êtes-vous sûr de vouloir supprimer le compte ?
      </h1>
      <h1 className="opacity-55 pt-5 font-bold">
        La suppression de votre compte entraînera la perte définitive de vos
        données et informations.
      </h1>

      <div className="flex flex-row gap-5 pt-5">
        <button
          onClick={() => handleClickActive("cancel")}
          className="w-[15vw] hover:bg-[--primary] hover:text-[--background] border-2 border-[--primary] duration-300 cursor-pointer font-bold mx-auto py-2 px-2 rounded-2xl"
        >
          Annuler
        </button>
        <button
          onClick={() => {
            player.deletePlayer();
            handleClickActive("confirm");
          }}
          className="w-[15vw] hover:bg-red-600 hover:text-[--background] border-2 border-red-600 duration-300 cursor-pointer text-xl italic mx-auto py-2 px-2 rounded-2xl"
        >
          Confirmer
        </button>
      </div>
    </section>
  );
}
