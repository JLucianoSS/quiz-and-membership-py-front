
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
        // Aquí puedes hacer la consulta a un backend externo Ejemplo:
        // const user = await loginUser({
        //     email: credentials.email,
        //     password: credentials.password,
        //   });

        // Por ahora, se utiliza un usuario hardcodeado
        const user = {
          id: "1",
          name: "John Doe",
          email: "johndoe@example.com",
        };

        if (
          credentials.email === "test@test.com" &&
          credentials.password === "test123"
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      // Aquí verificas si el usuario ya existe en tu base de datos: Ejemplo
      // const user = await loginUser({ providerId: account.providerAccountId });
      const user = {
        id: "1",
        name: "John Doe",
        email: "johndoe@example.com",
      };

      // Si el usuario no existe, lo registras
      if (!user) {
        // await registerUser({
        //   name: profile.name,
        //   email: profile.email,
        //   provider: account.provider,
        //   providerId: account.providerAccountId,
        //   image: profile.picture,
        // });
      }

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
