import Image from "next/image";

interface MenuProps {
  handleClickActive: (a: string) => void;
}
export default function About({ handleClickActive }: MenuProps) {
  return (
    <main className="absolute top-0 z-40 flex w-[100vw] h-[100vh]">
      <section className="flex flex-col self-center gap-7 mb-5 md:mb-0 w-[95vw] h-[75vh] md:w-[75vw] md:h-[95vh] bg-white bg-opacity-60 rounded-3xl backdrop-blur-md mx-auto px-7 py-12 overflow-y-scroll scrollbarhidden">
        <button
          className={`absolute top-5 left-5 transform transition-all hover:left-4`}
          onClick={() => handleClickActive("account")}
        >
          <Image
            src="/icones/arrow-back.svg"
            alt="arrow-back"
            width={24}
            height={24}
          />
        </button>
        <button
          className="absolute top-5 right-5 transform transition-transform duration-300 hover:rotate-90"
          onClick={() => handleClickActive("home")}
        >
          <Image
            src="/icones/xmark-solid.svg"
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
          <h2 className="text-xl md:px-16 pt-4 md:pt-8">
            Chez Soupex Software, nous croyons fermement que le patrimoine doit
            être une richesse partagée par tous. À travers notre projet dédié
            aux phares du patrimoine national français, nous visons à rendre ces
            monuments emblématiques accessibles à un large public. Grâce à des
            outils numériques innovants, tels que des applications interactives
            et des expériences immersives, nous offrons à chacun la possibilité
            de découvrir l&apos;histoire fascinante des phares. Que vous soyez
            un passionné d&apos;histoire, un amateur de beaux paysages, ou
            simplement curieux, nous mettons à votre disposition des ressources
            pour explorer ces joyaux culturels, où que vous soyez.
          </h2>
          <h2 className="text-xl md:px-16 pt-8">
            Les phares, témoins intemporels de l&apos;ingéniosité et de
            l&apos;histoire maritime française, sont un patrimoine précieux qui
            mérite d&apos;être préservé. Soupex Software s&apos;engage à
            soutenir la conservation de ces monuments en collaborant avec des
            experts en restauration, des institutions patrimoniales et des
            associations locales. Nos outils numériques contribuent également à
            sensibiliser le public à l&apos;importance de leur protection, en
            mettant en lumière leurs spécificités architecturales et leur rôle
            dans l&apos;histoire. Ensemble, nous pouvons protéger cet héritage
            pour les générations futures tout en célébrant l&apos;ingéniosité de
            nos ancêtres.
          </h2>
          <h2 className="text-xl md:px-16 pt-8">
            Visiter un phare, c&apos;est bien plus qu&apos;une simple sortie ;
            c&apos;est une aventure qui rassemble toutes les générations. Avec
            Soupex Software, nous transformons chaque visite en une expérience
            ludique et enrichissante pour toute la famille. Nos applications
            incluent des jeux éducatifs, des parcours interactifs et des
            anecdotes captivantes pour divertir petits et grands. Imaginez une
            promenade en bord de mer, suivie d&apos;une exploration des étages
            d&apos;un phare, où chaque membre de la famille peut apprendre et
            s&apos;amuser ensemble. Ces moments de partage autour de ces lieux
            chargés d&apos;histoire créent des souvenirs inoubliables.
          </h2>

          <div className="pt-14 self-start md:pl-16">
            <h2>© phareaway.fun 2025. Tous droits réservés. </h2>
            <h2> 2 Place Doyen Gosse, 38000 Grenoble</h2>
            <h2>04.76.28.45.09</h2>
          </div>
        </div>
        <div className="flex flex-row gap-10 ">
          <button
            className="md:w-[28vw] hover:bg-[--primary] hover:text-[--background] border-2 border-[--primary] duration-300 cursor-pointer font-bold mx-auto py-4 px-4 md:py-2 md:px-2 rounded-2xl"
            onClick={() => handleClickActive("contact")}
          >
            Nous Contacter
          </button>
        </div>
      </section>
    </main>
  );
}
