import { FormEvent, useState } from "react";
import { createClient } from "@supabase/supabase-js";

interface MenuProps {
  handleClickActive: (a: string) => void;
}

const supabaseData = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
);

export default function Event({ handleClickActive }: MenuProps) {
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const date = formData.get("date")?.toString();
    const url = formData.get("url")?.toString();
    const phare = formData.get("phare")?.toString();
    const duration = formData.get("duration")?.toString();
    const price = formData.get("price")?.toString();

    const newErrors: string[] = [];

    // Validation des champs
    if (!name) newErrors.push("Le nom de l'évenement est obligatoire.");
    if (!description) newErrors.push("La description est obligatoire.");
    if (!date) newErrors.push("La date est obligatoire.");
    if (!phare) newErrors.push("Le phare est obligatoire.");
    if (!duration) newErrors.push("La durée est obligatoire.");
    if (!price) newErrors.push("Le prix est obligatoire.");

    setErrors(newErrors);

    if (newErrors.length === 0) {
      const isPhare = await supabaseData
        .from("Lighthouse")
        .select("id")
        .like("name", `%${phare}%`);

      if (isPhare.data && isPhare.data.length === 0) {
        const request = await supabaseData.from("Event").insert({
          name: name,
          url: url,
          date: date,
          duration: duration,
          price: price,
          description: description,
          id_lh: isPhare.data[0].id,
        });
      } else {
        newErrors.push("Le phare n'existe pas.");
        setErrors(newErrors);
      }
    }
  };

  return (
    <>
      <main className=" absolute top-0 z-40 flex  w-[100vw] h-[100vh]">
        <section className=" flex flex-col self-center gap-12 w-[75vw] h-[95vh] bg-white bg-opacity-60 rounded-3xl backdrop-blur-md mx-auto px-7 py-12 overflow-y-scroll scrollbarhidden">
          <button
            className="absolute top-5 left-5 duration-300 ease-in-out hover:scale-110"
            onClick={() => handleClickActive("calendar")}
          >
            <img
              src="/icones/arrow-back.svg"
              alt="arrow-back"
              width={24}
              height={24}
            />
          </button>
          <h1 className="font-gravitas self-center text-4xl w-full h-fit text-center">
            Ajouter un évenement
          </h1>
          <form
            onSubmit={handleSubmit}
            method="POST"
            className="flex flex-col gap-5 justify-center items-center"
          >
            <div className="flex flex-col gap-2 w-2/4">
              <label htmlFor="name" className="text-lg font-bold">
                Nom de l'événement
              </label>
              <input
                type="text"
                name="name"
                placeholder="Giveway de phares miniatures"
                className="py-2 px-6 rounded-lg text-lg outline-none focus:ring-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[--primary]"
              />
            </div>

            <div className="flex flex-col gap-2 w-2/4">
              <label htmlFor="name" className="text-lg font-bold">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Il s'agit de donner à chaque participant une figurine de phare"
                className="py-2 px-6 rounded-lg text-lg outline-none focus:ring-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[--primary]"
              />
            </div>

            <div className="flex flex-col gap-2 w-2/4">
              <label htmlFor="name" className="text-lg font-bold">
                Date de l'évenement
              </label>
              <input
                name="date"
                type="date"
                className="py-2 px-6 rounded-lg text-lg outline-none focus:ring-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[--primary]"
              />
            </div>

            <div className="flex flex-col gap-2 w-2/4">
              <label htmlFor="name" className="text-lg font-bold">
                Lien vers le site de l'évenement/billeterie
              </label>
              <input
                name="url"
                type="url"
                placeholder="https://www.givewayofphare.exemple"
                className="py-2 px-6 rounded-lg text-lg outline-none focus:ring-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[--primary]"
              />
            </div>

            <div className="flex flex-col gap-2 w-2/4">
              <label htmlFor="name" className="text-lg font-bold">
                Phare concerné par l'évenement
              </label>
              <input
                name="phare"
                type="text"
                placeholder="(Phare du) Petit minou"
                className="py-2 px-6 rounded-lg text-lg outline-none focus:ring-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[--primary]"
              />
            </div>

            <div className=" flex items-center gap-2 w-2/4">
              <div className="flex flex-col gap-2 w-2/4">
                <label htmlFor="name" className="text-lg font-bold">
                  Durée de l'évenement
                </label>
                <input
                  name="duration"
                  type="time"
                  className="py-2 px-6 rounded-lg text-lg outline-none focus:ring-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[--primary]"
                />
              </div>
              <div className="flex flex-col gap-2 w-2/4">
                <label htmlFor="name" className="text-lg font-bold">
                  Prix de l'inscription
                </label>
                <input
                  name="price"
                  type="number"
                  placeholder="0.00"
                  className="py-2 px-6 rounded-lg text-lg outline-none focus:ring-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[--primary]"
                />
              </div>
            </div>
            {errors.length > 0 && (
              <div className="text-red-600 mb-4">
                <ul>
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
            <input
              type="submit"
              value="Créer l'événement"
              className="hover:bg-[--primary] hover:text-[--background] border-2 border-[--primary] duration-300 cursor-pointer text-xl font-bold py-2 px-6 rounded-lg"
            />
          </form>
        </section>
      </main>
    </>
  );
}
