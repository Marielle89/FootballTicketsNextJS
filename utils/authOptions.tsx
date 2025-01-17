import connectDB from "../config/database";
import User from "../models/User";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            // authorization: {
            //     params: {
            //         scope: "openid email profile",
            //     },
            // },
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],
    debug: true,
    callbacks: {
        //Invoked on successful signin
        async signIn({ profile }) {
            await connectDB();
            const userExists = await User.findOne({ email: profile.email });
            if (!userExists) {
                const userName = profile.name.slice(0, 20);

                await User.create({
                    email: profile.email,
                    userName,
                    image: profile.picture
                })
            }

            return true;
        },
        // Modifies the session object
        async session({ session }) {
            //1. Get user from DB
            const user = await User.findOne({ email: session.user.email });
            //2. Assign the user id to the session
            session.user.id = user._id.toString();
            //3. return the session
            return session;
        }
    }
};
