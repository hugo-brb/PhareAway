import Image from "next/image";

interface MenuProps {
  handleClickActive: (a: string) => void;
}
export default function CGU({ handleClickActive }: MenuProps) {
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
        <div className="flex flex-col items-center gap-8 px-16">
          <h1 className="text-3xl font-extrabold">
            Conditions générales d&apos;utilisation
          </h1>
          <h2>En vigueur au 24/01/2025</h2>
          <h2>
            Les présentes conditions générales d&apos;utilisation (dites « CGU
            ») ont pour objet l&apos;encadrement juridique des modalités de mise
            à disposition du site et des services par SoupexSoftware et de
            définir les conditions d&apos;accès et d&apos;utilisation des
            services par « l&apos;Utilisateur ».
          </h2>
          <h2 className="self-start">
            Les présentes CGU sont accessibles sur le site à la rubrique «CGU».
          </h2>
          <h2>
            Toute inscription ou utilisation du site implique l&apos;acceptation
            sans aucune réserve ni restriction des présentes CGU par
            l&apos;utilisateur. Lors de l&apos;inscription sur le site via le
            Formulaire d&apos;inscription, chaque utilisateur accepte
            expressément les présentes CGU en cochant la case précédant le texte
            suivant : « Je reconnais avoir lu et compris les CGU et je les
            accepte ». En cas de non-acceptation des CGU stipulées dans le
            présent contrat, l&apos;Utilisateur se doit de renoncer à
            l&apos;accès des services proposés par le site. phareaway.fun se
            réserve le droit de modifier unilatéralement et à tout moment le
            contenu des présentes CGU.
          </h2>
          <h1 className="text-2xl font-extrabold self-start">
            Article 1 : Les mentions légales
          </h1>
          <h2>
            L&apos;édition et la direction de la publication du site
            phareaway.fun est assurée par Hugo BARBIERI, domicilié 32 rue Marcel
            Paul. Numéro de téléphone est 0627355061 Adresse e-mail
            hugobarbieri38@gmail.com.
          </h2>
          <h2>
            L&apos;hébergeur du site phareaway.fun est la société OVH, dont le
            siège social est situé au 2, rue Kellermann, 59100 Roubaix, avec le
            numéro de téléphone : 1007.
          </h2>
          <h1 className="text-2xl font-extrabold self-start">
            ARTICLE 2 : Accès au site
          </h1>
          <h2>
            Le site phareaway.fun permet à l&apos;Utilisateur un accès gratuit
            aux services suivants : Le site internet propose les services
            suivants : Création d&apos;évenements Achat intégrés Verification
            d&apos;images Jeux éducatifs / énigmes Le site est accessible
            gratuitement en tout lieu à tout Utilisateur ayant un accès à
            Internet. Tous les frais supportés par l&apos;Utilisateur pour
            accéder au service (matériel informatique, logiciels, connexion
            Internet, etc.) sont à sa charge.
          </h2>
          <h2>
            L&apos;Utilisateur non membre n&apos;a pas accès aux services
            réservés. Pour cela, il doit s&apos;inscrire en remplissant le
            formulaire. En acceptant de s&apos;inscrire aux services réservés,
            l&apos;Utilisateur membre s&apos;engage à fournir des informations
            sincères et exactes concernant son état civil et ses coordonnées,
            notamment son adresse email. Pour accéder aux services,
            l&apos;Utilisateur doit ensuite s&apos;identifier à l&apos;aide de
            son identifiant et de son mot de passe qui lui seront communiqués
            après son inscription. Tout Utilisateur membre régulièrement inscrit
            pourra également solliciter sa désinscription en se rendant à la
            page dédiée sur son espace personnel. Celle-ci sera effective dans
            un délai raisonnable. Tout événement dû à un cas de force majeure
            ayant pour conséquence un dysfonctionnement du site ou serveur et
            sous réserve de toute interruption ou modification en cas de
            maintenance, n&apos;engage pas la responsabilité de phareaway.fun.
            Dans ces cas, l&apos;Utilisateur accepte ainsi ne pas tenir rigueur
            à l&apos;éditeur de toute interruption ou suspension de service,
            même sans préavis. L&apos;Utilisateur a la possibilité de contacter
            le site par messagerie électronique à l&apos;adresse email de
            l&apos;éditeur communiqué à l&apos;ARTICLE 1.{" "}
          </h2>
          <h1 className="text-2xl font-extrabold self-start">
            ARTICLE 3 : Collecte des données
          </h1>
          <h2>
            Le site assure à l&apos;Utilisateur une collecte et un traitement
            d&apos;informations personnelles dans le respect de la vie privée
            conformément à la loi n°78-17 du 6 janvier 1978 relative à
            l&apos;informatique, aux fichiers et aux libertés.
          </h2>
          <h2>
            En vertu de la loi Informatique et Libertés, en date du 6 janvier
            1978, l&apos;Utilisateur dispose d&apos;un droit d&apos;accès, de
            rectification, de suppression et d&apos;opposition de ses données
            personnelles. L&apos;Utilisateur exerce ce droit :
          </h2>
          <li className="self-start">
            par mail à l&apos;adresse email infos.phareaway.fun
          </li>
          <li className="self-start">via son espace personnel ;</li>
          <h1 className="text-2xl font-extrabold self-start">
            ARTICLE 4 : Propriété intellectuelle
          </h1>
          <h2>
            Les marques, logos, signes ainsi que tous les contenus du site
            (textes, images, son…) font l&apos;objet d&apos;une protection par
            le Code de la propriété intellectuelle et plus particulièrement par
            le droit d&apos;auteur.
          </h2>
          <h2>
            L&apos;Utilisateur doit solliciter l&apos;autorisation préalable du
            site pour toute reproduction, publication, copie des différents
            contenus. Il s&apos;engage à une utilisation des contenus du site
            dans un cadre strictement privé, toute utilisation à des fins
            commerciales et publicitaires est strictement interdite.
          </h2>
          <h2>
            Toute représentation totale ou partielle de ce site par quelque
            procédé que ce soit, sans l&apos;autorisation expresse de
            l&apos;exploitant du site Internet constituerait une contrefaçon
            sanctionnée par l&apos;article L 335-2 et suivants du Code de la
            propriété intellectuelle.
          </h2>
          <h2>
            Il est rappelé conformément à l&apos;article L122-5 du Code de
            propriété intellectuelle que l&apos;Utilisateur qui reproduit, copie
            ou publie le contenu protégé doit citer l&apos;auteur et sa source.
          </h2>
          <h1 className="text-2xl font-extrabold self-start">
            ARTICLE 5 : Responsabilité
          </h1>
          <h2>
            Les sources des informations diffusées sur le site phareaway.fun
            sont réputées fiables mais le site ne garantit pas qu&apos;il soit
            exempt de défauts, d&apos;erreurs ou d&apos;omissions.
          </h2>
          <h2>
            Les informations communiquées sont présentées à titre indicatif et
            général sans valeur contractuelle. Malgré des mises à jour
            régulières, le site phareaway.fun ne peut être tenu responsable de
            la modification des dispositions administratives et juridiques
            survenant après la publication. De même, le site ne peut être tenue
            responsable de l&apos;utilisation et de l&apos;interprétation de
            l&apos;information contenue dans ce site. L&apos;Utilisateur
            s&apos;assure de garder son mot de passe secret. Toute divulgation
            du mot de passe, quelle que soit sa forme, est interdite. Il assume
            les risques liés à l&apos;utilisation de son identifiant et mot de
            passe. Le site décline toute responsabilité. Le site phareaway.fun
            ne peut être tenu pour responsable d&apos;éventuels virus qui
            pourraient infecter l&apos;ordinateur ou tout matériel informatique
            de l&apos;Internaute, suite à une utilisation, à l&apos;accès, ou au
            téléchargement provenant de ce site.
          </h2>
          <h2>
            La responsabilité du site ne peut être engagée en cas de force
            majeure ou du fait imprévisible et insurmontable d&apos;un tiers.
          </h2>
          <h1 className="text-2xl font-extrabold self-start">
            ARTICLE 6 : Liens hypertextes
          </h1>
          <h2>
            Des liens hypertextes peuvent être présents sur le site.
            L&apos;Utilisateur est informé qu&apos;en cliquant sur ces liens, il
            sortira du site phareaway.fun. Ce dernier n&apos;a pas de contrôle
            sur les pages web sur lesquelles aboutissent ces liens et ne
            saurait, en aucun cas, être responsable de leur contenu.
          </h2>
          <h1 className="text-2xl font-extrabold self-start">
            ARTICLE 7 : Cookies{" "}
          </h1>
          <h2>
            L&apos;Utilisateur est informé que lors de ses visites sur le site,
            un cookie peut s&apos;installer automatiquement sur son logiciel de
            navigation.
          </h2>
          <h2>
            Les cookies sont de petits fichiers stockés temporairement sur le
            disque dur de l&apos;ordinateur de l&apos;Utilisateur par votre
            navigateur et qui sont nécessaires à l&apos;utilisation du site
            phareaway.fun. Les cookies ne contiennent pas d&apos;information
            personnelle et ne peuvent pas être utilisés pour identifier
            quelqu&apos;un. Un cookie contient un identifiant unique, généré
            aléatoirement et donc anonyme. Certains cookies expirent à la fin de
            la visite de l&apos;Utilisateur, d&apos;autres restent.
          </h2>
          <h2 className="self-start">
            L&apos;information contenue dans les cookies est utilisée pour
            améliorer le site phareaway.fun.
          </h2>
          <h2>
            En naviguant sur le site, L&apos;Utilisateur les accepte.
            L&apos;Utilisateur pourra désactiver ces cookies par
            l&apos;intermédiaire des paramètres figurant au sein de son logiciel
            de navigation.
          </h2>
          <h1 className="text-2xl font-extrabold self-start">
            ARTICLE 8 : Publication par l&apos;Utilisateur
          </h1>
          <h2 className="self-start">
            Le site permet aux membres de publier les contenus suivants :
            Article.
          </h2>
          <h2>
            Dans ses publications, le membre s&apos;engage à respecter les
            règles de la Netiquette (règles de bonne conduite de
            l&apos;internet) et les règles de droit en vigueur.
          </h2>
          <h2>
            Le site peut exercer une modération sur les publications et se
            réserve le droit de refuser leur mise en ligne, sans avoir à
            s&apos;en justifier auprès du membre.
          </h2>
          <h2>
            Le membre reste titulaire de l&apos;intégralité de ses droits de
            propriété intellectuelle. Mais en publiant une publication sur le
            site, il cède à la société éditrice le droit non exclusif et gratuit
            de représenter, reproduire, adapter, modifier, diffuser et
            distribuer sa publication, directement ou par un tiers autorisé,
            dans le monde entier, sur tout support (numérique ou physique), pour
            la durée de la propriété intellectuelle. Le Membre cède notamment le
            droit d&apos;utiliser sa publication sur internet et sur les réseaux
            de téléphonie mobile.
          </h2>
          <h2>
            La société éditrice s&apos;engage à faire figurer le nom du membre à
            proximité de chaque utilisation de sa publication.
          </h2>
          <h2>
            Tout contenu mis en ligne par l&apos;Utilisateur est de sa seule
            responsabilité. L&apos;Utilisateur s&apos;engage à ne pas mettre en
            ligne de contenus pouvant porter atteinte aux intérêts de tierces
            personnes. Tout recours en justice engagé par un tiers lésé contre
            le site sera pris en charge par l&apos;Utilisateur.
          </h2>
          <h2>
            Le contenu de l&apos;Utilisateur peut être à tout moment et pour
            n&apos;importe quelle raison supprimé ou modifié par le site, sans
            préavis.
          </h2>

          <h1 className="text-2xl font-extrabold self-start">
            ARTICLE 9 : Droit applicable et juridiction compétente
          </h1>

          <h2>
            La législation française s&apos;applique au présent contrat. En cas
            d&apos;absence de résolution amiable d&apos;un litige né entre les
            parties, les tribunaux français seront seuls compétents pour en
            connaître. Pour toute question relative à l&apos;application des
            présentes CGU, vous pouvez joindre l&apos;éditeur aux coordonnées
            inscrites à l&apos;ARTICLE 1.
          </h2>
        </div>
      </section>
    </main>
  );
}
