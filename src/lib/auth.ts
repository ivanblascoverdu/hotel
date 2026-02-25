import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { compare } from 'bcryptjs';
import { prisma } from '@/lib/db';
import type { NextAuthOptions } from 'next-auth';

declare module 'next-auth' {
    interface User {
        role?: string;
    }
    interface Session {
        user: {
            id: string;
            email: string;
            name?: string | null;
            image?: string | null;
            role: string;
        };
    }
}

declare module 'next-auth' {
    interface JWT {
        id: string;
        role: string;
    }
}

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as any,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Email y contraseña son obligatorios');
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email as string },
                });

                if (!user) {
                    throw new Error('No existe una cuenta con ese email');
                }

                if (!user.passwordHash) {
                    throw new Error('Esta cuenta usa inicio de sesión con Google');
                }

                const isValid = await compare(credentials.password as string, user.passwordHash);
                if (!isValid) {
                    throw new Error('Contraseña incorrecta');
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                };
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user, account }) {
            if (user) {
                token.id = user.id as string;
                token.role = (user as any).role as string || 'USER';
            }
            // For OAuth users, fetch role from DB if not set
            if (account?.provider === 'google' && !token.role) {
                const dbUser = await prisma.user.findUnique({
                    where: { email: token.email as string },
                });
                if (dbUser) {
                    token.id = dbUser.id;
                    token.role = dbUser.role;
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
            }
            return session;
        },
    },
    pages: {
        signIn: '/account',
    },
    secret: process.env.NEXTAUTH_SECRET,
};
