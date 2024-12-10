import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createClient } from '@supabase/supabase-js';
import bcrypt from "bcrypt";

// Étendre les types NextAuth
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
    }
  }
  interface User {
    id: string;
    email: string;
    name?: string | null;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
  }
}

// Initialisation de Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.warn("Email ou mot de passe non fourni");
          return null;
        }

        try {
          // Vérifiez l'utilisateur via Supabase
          const { data, error } = await supabase
            .from('users')
            .select('email, password, nom, prenom') // Sélectionnez uniquement ce qui est nécessaire
            .eq('email', credentials.email)
            .single();

          if (error) {
            console.error("Erreur lors de la récupération de l'utilisateur:", error.message);
            return null;
          }
          if (!data) {
            console.warn("Aucun utilisateur trouvé avec cet email");
            return null;
          }

          // Vérification du mot de passe haché
          const isValidPassword = await bcrypt.compare(credentials.password, data.password);
          if (isValidPassword) {
            return {
              id: data.email, // Utilisez `email` comme clé primaire
              email: data.email,
              name: `${data.prenom} ${data.nom}`, // Combinez prénom et nom
            };
          }

          console.warn("Mot de passe incorrect");
          return null;
        } catch (err) {
          console.error("Erreur lors de l'autorisation:", err);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/Login',
    error: '/Login',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl + '/Home';
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = { id: token.id, email: token.email, name: token.name };
      return session;
    }
  },
  session: { strategy: "jwt" },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
