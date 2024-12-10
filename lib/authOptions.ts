import type { NextAuthOptions } from "next-auth";
import GoogleProviders from "next-auth/providers/google";


export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProviders({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
}
