import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import executeQuery from "@/lib/MySQLConnect";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { username, password } = credentials;
        const query = `SELECT * FROM datacenter.user_member m WHERE m.D_CANCEL IS NULL 
          AND m.ADUserLogin = '${username}' AND m.USER_PASS = '${password}'`;
        const user = await executeQuery(query, []);

        if (user) {
          return {
            USER_ID: user[0].USER_ID,
            HR_ID: user[0].HR_ID,
            POSITION_ID: user[0].EMPLOYEE_POSITION_ID,
            USER_PREFIX: user[0].USER_PREFIX,
            USER_NAME: user[0].USER_F_NAME,
            USER_SURNAME: user[0].USER_L_NAME,
            AD_USER: user[0].ADUserLogin,
            PASSCODE: "1234",
          };
        } else {
          throw new Error("Invalid email or password");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.user = user;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: "/(auth)/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
