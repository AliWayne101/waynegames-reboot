import NextAuth from 'next-auth/next';
import GithubProvider from 'next-auth/providers/github';

export default NextAuth({
    secret: process.env.NEXT_PUBLIC_JWT_SECRET,
    providers: [
        GithubProvider({
            clientId: process.env.NEXT_PUBLIC_GITCLIENT!,
            clientSecret: process.env.NEXT_PUBLIC_GITSECRET!,
        }),
        
    ],
})