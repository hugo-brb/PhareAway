import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { registerUser } from "@/lib/userService";

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
    await registerUser(nom, prenom, pseudo, email, password);

    return NextResponse.json({ message: "success" });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
