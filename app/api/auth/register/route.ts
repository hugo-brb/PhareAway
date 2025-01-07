import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const { nom, prenom, pseudo, email, password } = await request.json();

    //Create complete name
    const completeName = `${prenom} ${nom}`;

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create pseudo
    let pseudoFinale = "";
    if (pseudo === "") {
      const firstChar = prenom.charAt(0).toLowerCase();
      const lastName = nom;
      const sizeNom = lastName.length;

      if (sizeNom <= 6) {
        pseudoFinale = firstChar + lastName.toLowerCase();
      } else {
        pseudoFinale = firstChar + lastName.slice(0, 6).toLowerCase();
      }
    } else {
      pseudoFinale = pseudo;
    }

    // Initialize Supabase client
    const supabaseAuth = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { db: { schema: "next_auth" } }
    );

    const response = await supabaseAuth.from("users").insert({
      name: completeName,
      email: email,
      password: hashedPassword,
      pseudo: pseudoFinale,
      isOAuth: false,
    });
  } catch (e) {
    console.log(e);
  }

  return NextResponse.json({ message: "success" });
}
