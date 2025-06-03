import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as DiscordStrategy } from "passport-discord";
import dotenv from "dotenv";
import prisma from "../prisma/client.js";
import AuthService from "../App/Services/AuthService.js";

dotenv.config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/api/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails?.[0]?.value;
                if (!email) return done(new Error("No email found in Google profile"), null);

                let user = await prisma.user.findUnique({ where: { email } });

                if (!user) {
                    user = await prisma.user.create({
                        data: {
                            name: profile.displayName,
                            email,
                            password: "google_oauth",
                        },
                    });
                }

                const token = AuthService.generateToken(user.id);
                done(null, { user, token });
            } catch (error) {
                done(error, null);
            }
        }
    )
);

passport.use(
    new DiscordStrategy(
        {
            clientID: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET,
            callbackURL: "/api/auth/discord/callback",
            scope: ["identify", "email"],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.email;
                if (!email) return done(new Error("No email found in Discord profile"), null);

                let user = await prisma.user.findUnique({ where: { email } });

                if (!user) {
                    user = await prisma.user.create({
                        data: {
                            name: profile.username,
                            email,
                            password: "discord_oauth",
                        },
                    });
                }

                const token = AuthService.generateToken(user.id);
                done(null, { user, token });
            } catch (error) {
                done(error, null);
            }
        }
    )
);

export default passport;
