import type { NextAuthOptions } from "next-auth";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import GoogleProviders from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { Adapter } from "next-auth/adapters";
import * as argon2 from "argon2";
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

        if (response.error) {
          console.error("Error fetching user from Supabase:", response.error);
          throw new Error("Invalid credentials");
        }

        const user = response.data?.[0];

        if (!credentials?.password || !user?.password) {
          throw new Error("Invalid credentials");
        }

        const passwordCorrect = await argon2.verify(
          user.password,
          credentials.password
        );

        if (passwordCorrect) {
          const lastLogin = new Date();
          await supabaseAuth
            .from("users")
            .update({ datelastconnect: lastLogin })
            .eq("id", user.id);
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        }
        return null;
      },
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL ?? "",
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
  }) as Adapter,
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Redirige l'utilisateur vers /Home après la connexion
      if (url.startsWith(baseUrl)) {
        return `${baseUrl}/Home`;
      }
      return baseUrl;
    },
  },
};
