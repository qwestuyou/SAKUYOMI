import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as DiscordStrategy } from "passport-discord";
import prisma from "../prisma/client.js";
import dotenv from "dotenv";
import generateToken from "../utils/generateToken.js";

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
        const email = profile.emails[0].value;
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

        const token = generateToken(user.id);
        done(null, { user, token });
      } catch (err) {
        done(err, null);
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
  
          const token = generateToken(user.id);
          done(null, { user, token });
        } catch (err) {
          done(err, null);
        }
      }
    )
  );

export default passport;
