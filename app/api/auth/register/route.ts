import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const { nom, prenom, email, password } = await request.json();
    //validate email and password
    console.log(email, password);

    //Create complete name
    const completeName = `${prenom} ${nom}`;

    const hashedPassword = await hash(password, 10);
    // Initialize Supabase client
    const supabaseAuth = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { db: { schema: "next_auth" } }
    );
    const response = await supabaseAuth
      .from("users")
      .insert({ name: completeName, email: email, password: hashedPassword });
  } catch (e) {
    console.log(e);
  }

  return NextResponse.json({ message: "success" });
}
