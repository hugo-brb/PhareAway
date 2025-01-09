import { FormEvent, useState } from "react";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";

interface MenuProps {
  handleClickActive: (a: string) => void;
}

const supabaseData = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
);

// Fonction utilitaire pour convertir HH:mm en minutes
const convertTimeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  if (minutes <= 30) {
    return hours;
  } else {
    return hours + 1;
  }
};

export default function Event({ handleClickActive }: MenuProps) {
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const newErrors: string[] = [];

    try {
      const formData = new FormData(e.currentTarget);

      const name = formData.get("name")?.toString().trim();
      const description = formData.get("description")?.toString().trim();
      const date = formData.get("date")?.toString();
      const url = formData.get("url")?.toString().trim();
      const phare = formData.get("phare")?.toString().trim();
      const duration = formData.get("duration")?.toString();
      const price = formData.get("price")?.toString();

      // Log des données avant validation
      console.log("Données du formulaire:", {
        name,
        description,
        date,
        url,
        phare,
        duration,
        price,
      });

      // Validation des champs
      if (!name) newErrors.push("Le nom de l'évenement est obligatoire.");
      if (!description) newErrors.push("La description est obligatoire.");
      if (!date) newErrors.push("La date est obligatoire.");
      if (!phare) newErrors.push("Le phare est obligatoire.");
      if (!duration) newErrors.push("La durée est obligatoire.");
      if (!price) newErrors.push("Le prix est obligatoire.");

      if (newErrors.length > 0) {
        setErrors(newErrors);
        return;
      }

      // Recherche du phare
      const { data: lighthouse, error: lighthouseError } = await supabaseData
        .from("Lighthouse")
        .select("id")
        .ilike("name", `%${phare}%`)
        .single();

      console.log("Résultat recherche phare:", { lighthouse, lighthouseError });

      if (lighthouseError) {
        newErrors.push(
          `Erreur lors de la recherche du phare: ${lighthouseError.message}`
        );
        setErrors(newErrors);
        return;
      }

      if (!lighthouse?.id) {
        newErrors.push("Le phare n'existe pas.");
        setErrors(newErrors);
        return;
      }

      // Conversion de la durée en minutes
      const durationInMinutes = convertTimeToMinutes(duration || "00:00");

      // Préparation des données pour l'insertion
      const eventData = {
        name,
        url: url || null,
        date,
        duration: durationInMinutes,
        price: parseFloat(price || "0"),
        description,
        id_lh: lighthouse.id,
      };

      console.log("Données à insérer:", eventData);

      // Insertion de l'événement
      const { data: insertData, error: insertError } = await supabaseData
        .from("Event")
        .insert([eventData])
        .select()
        .single();

      console.log("Résultat insertion:", { insertData, insertError });

      if (insertError) {
        console.error("Détails de l'erreur d'insertion:", {
          code: insertError.code,
          message: insertError.message,
          details: insertError.details,
          hint: insertError.hint,
        });
        newErrors.push(
          `Erreur lors de la création de l'événement: ${insertError.message}`
        );
        setErrors(newErrors);
        return;
      }

      // Succès
      handleClickActive("calendar");
    } catch (error) {
      console.error("Erreur complète:", error);
      if (error instanceof Error) {
        newErrors.push(`Une erreur est survenue: ${error.message}`);
      } else {
        newErrors.push("Une erreur inattendue s'est produite.");
      }
      setErrors(newErrors);
    } finally {
      setIsSubmitting(false);
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
            <Image
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
            className="flex flex-col gap-5 justify-center items-center"
          >
            <div className="flex flex-col gap-2 w-2/4">
              <label htmlFor="name" className="text-lg font-bold">
                Nom de l&apos;événement
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
                Date de l&apos;évenement
              </label>
              <input
                name="date"
                type="date"
                className="py-2 px-6 rounded-lg text-lg outline-none focus:ring-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[--primary]"
              />
            </div>

            <div className="flex flex-col gap-2 w-2/4">
              <label htmlFor="name" className="text-lg font-bold">
                Lien vers le site de l&apos;évenement/billeterie
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
                Phare concerné par l&apos;évenement
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
                  Durée de l&apos;évenement
                </label>
                <input
                  name="duration"
                  type="time"
                  className="py-2 px-6 rounded-lg text-lg outline-none focus:ring-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[--primary]"
                />
              </div>
              <div className="flex flex-col gap-2 w-2/4">
                <label htmlFor="name" className="text-lg font-bold">
                  Prix de l&apos;inscription
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
              <div className="text-red-600">
                <ul>
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
            <input
              type="submit"
              value={
                isSubmitting ? "Création en cours..." : "Créer l'événement"
              }
              disabled={isSubmitting}
              className="hover:bg-[--primary] hover:text-[--background] border-2 border-[--primary] duration-300 cursor-pointer text-xl font-bold py-2 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </form>
        </section>
      </main>
    </>
  );
}
