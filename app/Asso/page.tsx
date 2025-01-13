"use client";

import React, { useState, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Asso() {
  const [isSend, setIsSend] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Vérifier que le champ email est valide
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      window.alert("Veuillez entrer une adresse e-mail valide.");
      return;
    }

    try {
      const response = await fetch("/api/mailAsso", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Message envoyé !");
        setFormData({
          email: "",
        });
        window.alert("Votre message a été envoyé avec succès !");
        setIsSend(true);
      } else {
        console.error("Erreur lors de l'envoi.");
        window.alert("Une erreur est survenue lors de l'envoi du message.");
      }
    } catch (error) {
      console.error("Erreur:", error);
      window.alert("Une erreur est survenue lors de l'envoi du message.");
    }
  };
  return (
    <>
      {!isSend ? (
        <main className="land flex justify-center items-center w-[100vw] h-[100vh] max-h-[100vh]">
          <section className="flex flex-col gap-7 bg-white bg-opacity-80 rounded-lg px-20 py-12 backdrop-blur-md">
            <Link
              href="/Signup"
              className="absolute top-5 left-5 hover:scale-110 duration-300"
            >
              <Image
                src="/icones/arrow-back.svg"
                alt="arrow-back"
                width={24}
                height={24}
              />
            </Link>
            <h1 className="font-ouroboros text-4xl self-center">Association</h1>
            <p className="text-lg text-center max-w-[45vw]">
              Merci de bien vouloir nous communiquer votre adresse e-mail afin
              que nos équipes puissent vous recontacter et vérifier votre statut
              d&apos;association.
            </p>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center items-center gap-5 max-h-[90vh]"
            >
              <input
                type="email"
                name="email"
                id="email"
                className=" w-[30vw] py-2 px-6 rounded-lg text-lg outline-none focus:ring-2 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-[--primary]"
                placeholder="phareaway@asso.fr"
                onChange={(e) => setFormData({ email: e.target.value })}
              />
              <input
                type="submit"
                value="Envoyer"
                className="hover:bg-[--primary] hover:text-[--background] border-2 border-[--primary] duration-300 cursor-pointer text-xl font-bold py-2 px-6 rounded-lg"
              />
            </form>
          </section>
        </main>
      ) : (
        <main className="land flex justify-center items-center w-[100vw] h-[100vh] max-h-[100vh]">
          <section className="flex flex-col gap-7 bg-white bg-opacity-80 rounded-lg px-20 py-12 backdrop-blur-md">
            <Link
              href="/Login"
              className="absolute top-5 left-5 hover:scale-110 duration-300"
            >
              <Image
                src="/icones/arrow-back.svg"
                alt="arrow-back"
                width={24}
                height={24}
              />
            </Link>
            <h1 className="font-ouroboros text-4xl self-center">Association</h1>
            <p className="text-lg text-center max-w-[45vw]">
              Merci de bien vouloir créer un compte client en utilisant la même
              adresse e-mail. Votre compte sera converti en compte association
              une fois la vérification de votre statut finalisée.
            </p>
            <Link
              href="/Signup"
              className=" w-fit self-center hover:bg-[--primary] hover:text-[--background] border-2 border-[--primary] duration-300 cursor-pointer text-xl font-bold py-2 px-6 rounded-lg"
            >
              Créer un compte
            </Link>
          </section>
        </main>
      )}
    </>
  );
}
