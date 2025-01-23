import { NextResponse } from "next/server";
import * as argon2 from "argon2";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { supabaseAdmin } from "@/lib/SupabaseClient";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  // Vérifier si l'utilisateur n'est pas déjà connecté
  if (session) {
    return NextResponse.json(
      { error: "Vous êtes déjà connecté" },
      { status: 400 }
    );
  }

  try {
    const { nom, prenom, pseudo, email, password } = await request.json();

    const completeName = `${prenom} ${nom}`;
    const hashedPassword = await argon2.hash(password);
    const pseudoFinale =
      pseudo ||
      `${prenom.charAt(0).toLowerCase()}${nom.slice(0, 6).toLowerCase()}`;
    const dateCreation = new Date();

    const { error } = await supabaseAdmin.from("users").insert({
      name: completeName,
      email: email,
      password: hashedPassword,
      pseudo: pseudoFinale,
      isOAuth: false,
      datecreation: dateCreation,
    });

    if (error) {
      console.error("Erreur Supabase:", error.message);
      throw new Error(error.message);
    }

    return NextResponse.json({ message: "success" });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Erreur interne";
    console.error("Erreur lors de l'inscription:", error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
