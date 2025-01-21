import * as argon2 from "argon2";
import { supabaseAdmin } from "./SupabaseClient";

export async function registerUser(
  nom: string,
  prenom: string,
  pseudo: string,
  email: string,
  password: string
) {
  try {
    const completeName = `${prenom} ${nom}`;
    const hashedPassword = await argon2.hash(password);
    const pseudoFinale =
      pseudo ||
      `${prenom.charAt(0).toLowerCase()}${nom.slice(0, 6).toLowerCase()}`;
    const dateCreation = new Date();

    const { error } = await supabaseAdmin.from("users").insert({
      name: completeName,
      email,
      password: hashedPassword,
      pseudo: pseudoFinale,
      isOAuth: false,
      datecreation: dateCreation,
    });

    if (error) {
      console.error("Erreur Supabase:", error.message);
      throw new Error(error.message);
    }

    return { success: true };
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    throw new Error("Erreur interne");
  }
}
