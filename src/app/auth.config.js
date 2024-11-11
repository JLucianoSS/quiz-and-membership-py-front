import { loginUser, updateUsuario, getUserById } from "@/actions";
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
        const result = await loginUser(credentials);

        if (result.success) {
          // Verificar si ya hay un usuario con sesión activa
          const userData = await getUserById(result.user.id_user);

          // Permitir múltiples sesiones si el usuario es "Administrador"
          if (userData.data.role === "Administrador") {
            return {
              id: result.user.id_user,
              name: `${result.user.nombre}`,
              email: result.user.email,
            };
          }

          // Si no hay usuario activo, activar la sesión para este usuario
          if (!userData.data.is_user_active) {
            await updateUsuario(result.user.id_user, {
              is_user_active: true
            });
            
            return {
              id: result.user.id_user,
              name: `${result.user.nombre}`,
              email: result.user.email,
            };
          } else {
            throw new Error('Ya existe una sesión activa');
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
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
  events: {
    async signOut({ token }) {
      if (token?.id) {
        await updateUsuario(token.id, {
          is_user_active: false
        });
      }
    },
  },
  session: {
    maxAge: 24 * 60 * 60,
    updateAge: 12 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};