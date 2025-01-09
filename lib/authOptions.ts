import type { NextAuthOptions } from "next-auth";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import GoogleProviders from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { Adapter } from "next-auth/adapters";
import { compare } from "bcrypt";
import { createClient } from "@supabase/supabase-js";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProviders({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const supabaseAuth = createClient(
          process.env.SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!,
          { db: { schema: "next_auth" } }
        );

        const response = await supabaseAuth
          .from("users")
          .select("id, password, name, email")
          .eq("email", credentials?.email);

        console.log("Supabase response:", response);

        if (response.error) {
          console.error("Error fetching user from Supabase:", response.error);
          throw new Error("Invalid credentials");
        }

        const user = response.data?.[0];
        console.log("Fetched user:", user);

        if (!credentials?.password || !user?.password) {
          console.error("Missing or invalid password");
          throw new Error("Invalid credentials");
        }

        const passwordCorrect = await compare(
          credentials.password,
          user.password
        );
        console.log("Password match:", passwordCorrect);

        if (passwordCorrect) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        }

        console.error("Authentication failed: Password mismatch");
        return null;
      },
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL ?? "",
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
  }) as Adapter,
};
