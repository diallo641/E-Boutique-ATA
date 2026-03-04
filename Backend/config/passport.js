// config/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const compteModel = require('../models/compte');
const clientModel = require('../models/client');
const roleModel = require('../models/role');
const bcrypt = require('bcrypt');
const crypto = require('crypto'); // pour générer un mot de passe aléatoire

passport.serializeUser((user, done) => {
    done(null, user.ID_compte); // On stocke l'ID du compte dans la session
});

passport.deserializeUser(async (id, done) => {
    try {
        const compte = await compteModel.getCompteByID(id);
        done(null, compte);
    } catch (err) {
        done(err, null);
    }
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,       // À récupérer depuis Google Cloud
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL  // ex: http://localhost:3000/api/auth/google/callback
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Chercher si l'utilisateur existe déjà par email
        const email = profile.emails[0].value;
        let compte = await compteModel.getCompteByEmail(email);

        if (!compte) {
            // Générer un mot de passe aléatoire
            const randomPassword = crypto.randomBytes(16).toString('hex');
            const hashedPassword = await bcrypt.hash(randomPassword, 10);

            // Récupérer le rôle 'client'
            const roleClient = await roleModel.getRoleByName('client');
            if (!roleClient) {
                return done(new Error("Rôle client introuvable"), null);
            }

            // Créer le compte
            compte = await compteModel.createCompte(email, hashedPassword, roleClient.ID_role);

            // Créer le profil client
            await clientModel.createClient(profile.displayName || "Nom inconnu", "Adresse inconnue", "Téléphone inconnu", compte.ID_compte);
        }

        return done(null, compte);
    } catch (err) {
        return done(err, null);
    }
}));

module.exports = passport;