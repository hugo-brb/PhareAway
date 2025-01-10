import Image from "next/image";

interface MenuProps {
  handleClickActive: (a: string) => void;
}
export default function About({ handleClickActive }: MenuProps) {
  return (
    <main className="absolute top-0 z-40 flex w-[100vw] h-[100vh]">
      <section className="flex flex-col self-center gap-7 w-[75vw] h-[95vh] bg-white bg-opacity-60 rounded-3xl backdrop-blur-md mx-auto px-7 py-12 overflow-y-scroll scrollbarhidden">
        <button
          className={`absolute top-5 left-5 transform`}
          onClick={() => handleClickActive("account")}
        >
          <Image
            src="/icones/arrow-back.svg"
            alt="arrow-back"
            width={24}
            height={24}
          />
        </button>

        <div className="flex flex-col items-center">
          <Image
            src="/images/soupex.png"
            alt="arrow-back"
            width={150}
            height={150}
          />
          <h2 className="text-xl px-16 pt-8">
            Soupex est une entreprise qui Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Quae voluptate recusandae reiciendis? Aspernatur
            ab non dolores voluptatem, labore deleniti facilis hic veniam
            molestiae repellat! Fugit fuga nulla repellendus cupiditate? Omnis!
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta
            maiores excepturi quidem mollitia ipsum eum a necessitatibus
            exercitationem, aliquid iste officiis beatae labore quisquam
            distinctio, itaque enim quasi earum saepe.
          </h2>

          <div className="pt-14 self-start pl-16">
            <h2>© phareaway.fun 2025. Tous droits réservés. </h2>
            <h2> 32 rue Marcel Paul 38000 Grenoble</h2>
            <h2>0627355061</h2>
          </div>

          <div className="absolute bottom-12 flex flex-row gap-20">
            <button
              className="w-[28vw] hover:bg-[--primary] hover:text-[--background] border-2 border-[--primary] duration-300 cursor-pointer font-bold mx-auto py-2 px-2 rounded-2xl"
              onClick={() => handleClickActive("contact")}
            >
              Nous Contacter
            </button>
            <button
              className="w-[28vw] hover:bg-[--primary] hover:text-[--background] border-2 border-[--primary] duration-300 cursor-pointer font-bold mx-auto py-2 px-2 rounded-2xl"
              onClick={() => handleClickActive("cgu")}
            >
              Voir nos Conditions générales d’utilisation
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
