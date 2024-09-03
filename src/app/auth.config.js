

import { login } from "../data/usuarios";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Correo",
          type: "email",
          placeholder: "usuario@usuario.com",
        },
        password: {
          label: "Contraseña",
          type: "password",
          placeholder: "******",
        },
      },
      async authorize(credentials) {
        // Usamos la función login para verificar las credenciales
        const result = login(credentials.email, credentials.password);

        // Si el login es exitoso, devolvemos el usuario
        if (result.success) {
          return {
            id: result.user.id,
            name: `${result.user.nombre} ${result.user.apellido}`,
            email: result.user.email,
            role: result.user.role,
          };
        }

        // Si no se encuentra el usuario, devolvemos null
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      // Aquí puedes agregar lógica para verificar o registrar el usuario
      // en una base de datos real si es necesario
      // const result = login(credentials.email, credentials.password);
      // const { user } = result;
      // if (!user) {
      //   await registerUser({ user..});
      // }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};



